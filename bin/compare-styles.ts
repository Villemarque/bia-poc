#!/usr/bin/env tsx
//
// compare-styles — per-element computed-style comparator for two static sites.
//
// Renders two local sites (old vs new) in a Chrome DevTools Protocol browser and
// compares the *computed CSS* of every element, at several viewport widths.
// This is more reliable than pixel diffing for catching a migration/refactor
// regressions: it is environment-independent and reports exactly which element
// and which CSS property diverged (instead of diffuse antialiasing noise).
//
// Elements are matched by a graded tree alignment (tag + id + non-scoped classes
// + href), because component frameworks (e.g. Svelte) insert wrapper elements and
// scoped class hashes — a naive DOM-path or class-signature match misaligns.
// Pseudo-elements (::before/::after) and sub-pixel rects are compared too.
//
// Usage:
//   tsx bin/compare-styles.ts <oldDir> <newDir> [options]
//
// Options:
//   --port <n>        Chrome debug port to connect to        (default 9222)
//   --origin <url>    base URL used for request interception (default http://localhost:8000)
//   --widths <list>   comma-separated viewport widths        (default 1440,1024,800,360)
//   --report <n>      max differing elements to print        (default 40)
//   --json <file>     also write the raw diff as JSON
//   --fail            exit non-zero if any element differs
//
// Requires a Chrome/Chromium reachable on the debug port, e.g.:
//   google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-profile &
// (the page is served to Chrome via request interception, so no web server is needed)

import puppeteer, { Browser } from "puppeteer";
import fs from "fs";
import path from "path";

// Properties compared per element. Layout, box model, typography, colour, effects.
const PROPS = [
  "display", "position", "top", "right", "bottom", "left", "width", "height",
  "min-width", "min-height", "max-width", "max-height",
  "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding-top", "padding-right", "padding-bottom", "padding-left",
  "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
  "border-top-style", "border-top-color", "border-bottom-color", "border-radius",
  "box-sizing", "overflow", "overflow-x", "overflow-y", "float", "clear",
  "flex-direction", "flex-wrap", "justify-content", "align-items", "align-self",
  "flex-grow", "flex-shrink", "flex-basis", "gap", "order",
  "grid-template-columns", "grid-column", "grid-template-rows",
  "z-index", "opacity", "transform", "transform-origin", "visibility", "pointer-events",
  "backface-visibility", "will-change",
  "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing",
  "font-kerning", "font-feature-settings", "font-variation-settings",
  "-webkit-font-smoothing", "-moz-osx-font-smoothing", "text-rendering", "text-size-adjust",
  "-webkit-text-size-adjust", "image-rendering",
  "text-align", "text-decoration-line", "text-transform", "white-space", "text-indent",
  "color", "background-color", "background-image", "background-position", "background-size",
  "background-repeat", "background-clip", "background-attachment", "background-blend-mode",
  "list-style-type", "vertical-align", "box-shadow", "text-shadow", "filter", "mix-blend-mode",
  "object-fit", "cursor", "content",
];
const PSEUDO_PROPS = [
  "content", "display", "width", "height", "color", "background-color", "background-image",
  "font-family", "font-size", "position", "margin-left", "margin-right", "top", "left",
  "transform", "opacity",
];
// Non-visual / layout-transparent elements are skipped so the trees align.
const SKIP_TAGS = new Set(["script", "style", "link", "meta", "title", "noscript", "template", "base"]);

const MIME: Record<string, string> = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
};

type El = {
  i: number; parent: number; tag: string; id: string; classes: string[];
  href: string; label: string; props: Record<string, string>;
};

const desc = (e: El) =>
  e.tag + (e.id ? "#" + e.id : "") + (e.classes.length ? "." + e.classes.join(".") : "");

function parseArgs(argv: string[]) {
  const out: any = { oldDir: argv[0], newDir: argv[1], port: 9222, origin: "http://localhost:8000", widths: "1440,1024,800,360", report: 40, json: null, fail: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--port") out.port = parseInt(argv[++i], 10);
    else if (a === "--origin") out.origin = argv[++i];
    else if (a === "--widths") out.widths = argv[++i];
    else if (a === "--report") out.report = parseInt(argv[++i], 10);
    else if (a === "--json") out.json = argv[++i];
    else if (a === "--fail") out.fail = true;
    else throw new Error(`unknown option: ${a}`);
  }
  if (!out.oldDir || !out.newDir) {
    console.error("usage: tsx bin/compare-styles.ts <oldDir> <newDir> [--port n] [--origin url] [--widths a,b,c] [--report n] [--json file] [--fail]");
    process.exit(2);
  }
  return out;
}

async function dump(browser: Browser, rootDir: string, origin: string, width: number): Promise<El[]> {
  const root = path.resolve(rootDir);
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    try {
      const u = new URL(req.url());
      let rel = decodeURIComponent(u.pathname);
      if (rel.endsWith("/")) rel += "index.html";
      const file = path.join(root, rel);
      if (file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        req.respond({ status: 200, contentType: MIME[path.extname(file).toLowerCase()] || "application/octet-stream", body: fs.readFileSync(file) });
      } else {
        // external (e.g. Google Fonts): let the browser fetch it, so both sites
        // are measured with the same fonts loaded.
        req.continue();
      }
    } catch {
      req.abort();
    }
  });
  await page.setViewport({ width, height: 7000 });
  // tsx/esbuild injects a `__name` helper into functions sent to evaluate(); define
  // a no-op in the page so the serialized function can resolve it.
  await page.evaluateOnNewDocument("globalThis.__name = globalThis.__name || function (fn) { return fn; };");
  await page.goto(origin + "/", { waitUntil: "load", timeout: 30000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));

  const data = await page.evaluate((cfg: { PROPS: string[]; PSEUDO_PROPS: string[]; SKIP_TAGS: string[] }) => {
    const norm = (v: any) => (v == null ? "" : String(v).replace(/\s+/g, " ").trim());
    const skip = new Set(cfg.SKIP_TAGS);
    const out: any[] = [];
    const walk = (el: Element, parent: number) => {
      const tag = el.tagName.toLowerCase();
      if (skip.has(tag) || el.id === "svelte-announcer") return;
      const cs0 = getComputedStyle(el);
      if (cs0.display === "contents") {
        for (const c of el.children) walk(c, parent);
        return;
      }
      const classes = (el.getAttribute("class") || "")
        .split(/\s+/).filter((c) => c && !/^svelte-/.test(c)).sort();
      const idx = out.length;
      const props: Record<string, string> = {};
      for (const pr of cfg.PROPS) props[pr] = norm(cs0.getPropertyValue(pr));
      const r = el.getBoundingClientRect();
      props["rect.x"] = r.x.toFixed(2);
      props["rect.y"] = (r.y + window.scrollY).toFixed(2);
      props["rect.w"] = r.width.toFixed(2);
      props["rect.h"] = r.height.toFixed(2);
      for (const pe of ["::before", "::after"]) {
        const cs = getComputedStyle(el, pe);
        for (const pr of cfg.PSEUDO_PROPS) {
          const v = norm(cs.getPropertyValue(pr));
          if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px")
            props[pe + "." + pr] = v;
        }
      }
      out.push({ i: idx, parent, tag, id: el.id || "", classes, href: el.getAttribute("href") || "", label: norm(el.textContent).slice(0, 40), props });
      for (const c of el.children) walk(c, idx);
    };
    walk(document.documentElement, -1);
    return out;
  }, { PROPS, PSEUDO_PROPS, SKIP_TAGS: [...SKIP_TAGS] });

  await page.close();
  return data as El[];
}

function align(oldArr: El[], newArr: El[]) {
  const kids = (arr: El[]) => {
    const m = new Map<number, El[]>();
    for (const e of arr) {
      if (!m.has(e.parent)) m.set(e.parent, []);
      m.get(e.parent)!.push(e);
    }
    return m;
  };
  const oldKids = kids(oldArr);
  const newKids = kids(newArr);
  const classScore = (a: El, b: El) => {
    const bs = new Set(b.classes);
    const inter = a.classes.filter((c) => bs.has(c)).length;
    const union = new Set([...a.classes, ...b.classes]).size;
    return union ? inter / union : 1;
  };
  const score = (a: El, b: El) => {
    if (a.tag !== b.tag) return -1;
    let s = 1 + (a.id === b.id ? 4 : -2);
    s += classScore(a, b) * 4;
    if (a.href || b.href) s += a.href === b.href ? 3 : -3;
    return s;
  };
  const pairs: [El, El][] = [];
  const unmatchedOld: El[] = [];
  const unmatchedNew: El[] = [];
  const match = (a: El, b: El) => {
    pairs.push([a, b]);
    const bKids = newKids.get(b.i) || [];
    const used = new Set<number>();
    for (const ak of oldKids.get(a.i) || []) {
      let best: El | null = null;
      let bestScore = 0;
      for (const bk of bKids) {
        if (used.has(bk.i)) continue;
        const s = score(ak, bk);
        if (s > bestScore) { best = bk; bestScore = s; }
      }
      if (best) { used.add(best!.i); match(ak, best!); }
      else unmatchedOld.push(ak);
    }
    for (const bk of bKids) if (!used.has(bk.i)) unmatchedNew.push(bk);
  };
  match(oldArr[0], newArr[0]);
  return { pairs, unmatchedOld, unmatchedNew };
}

async function main() {
  const opt = parseArgs(process.argv.slice(2));
  const widths: [string, number][] = opt.widths.split(",").map((w: string) => {
    const n = parseInt(w, 10);
    const names: Record<number, string> = { 1440: "xlarge", 1024: "large", 800: "medium", 360: "small" };
    return [names[n] || String(n), n];
  });

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${opt.port}` });
  let anyDiff = false;
  const jsonOut: any = {};

  for (const [name, width] of widths) {
    const oldArr = await dump(browser, opt.oldDir, opt.origin, width);
    const newArr = await dump(browser, opt.newDir, opt.origin, width);
    const { pairs, unmatchedOld, unmatchedNew } = align(oldArr, newArr);

    const propCount = new Map<string, number>();
    const reports: any[] = [];
    for (const [o, n] of pairs) {
      const diffs: any[] = [];
      for (const p of Object.keys(o.props)) {
        if (o.props[p] !== n.props[p]) {
          diffs.push({ prop: p, old: o.props[p], new: n.props[p] });
          propCount.set(p, (propCount.get(p) || 0) + 1);
        }
      }
      if (diffs.length) reports.push({ el: desc(o), label: o.label, diffs });
    }
    reports.sort((a, b) => b.diffs.length - a.diffs.length);
    if (reports.length || unmatchedOld.length || unmatchedNew.length) anyDiff = true;

    console.log("#".repeat(70));
    console.log(`# width=${width} (${name})`);
    console.log("#".repeat(70));
    console.log(`elements: old=${oldArr.length} new=${newArr.length} matched=${pairs.length} unmatched(old=${unmatchedOld.length}, new=${unmatchedNew.length})`);
    if (unmatchedOld.length) console.log(`  unmatched old: ${unmatchedOld.map(desc).slice(0, 20).join(", ")}`);
    if (unmatchedNew.length) console.log(`  unmatched new: ${unmatchedNew.map(desc).slice(0, 20).join(", ")}`);
    console.log(`elements with differing props: ${reports.length}`);
    if (propCount.size) {
      console.log("properties by #elements differing:");
      for (const [p, c] of [...propCount.entries()].sort((a, b) => b[1] - a[1]))
        console.log(`  ${String(c).padStart(4)}  ${p}`);
    }
    for (const r of reports.slice(0, opt.report)) {
      console.log(`\n[${r.el}] "${r.label}"`);
      for (const d of r.diffs) console.log(`    ${d.prop}: ${JSON.stringify(d.old)} -> ${JSON.stringify(d.new)}`);
    }
    jsonOut[name] = { width, reports, unmatchedOld: unmatchedOld.map(desc), unmatchedNew: unmatchedNew.map(desc) };
  }

  await browser.disconnect();

  if (opt.json) {
    fs.writeFileSync(opt.json, JSON.stringify(jsonOut, null, 2));
    console.log(`\nwrote ${opt.json}`);
  }
  if (opt.fail && anyDiff) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
