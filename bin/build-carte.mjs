// Generates the business card SVGs from the charte-graphique style.
//
// Layout (v13): the card/bleed area is 88 × 58 mm; the *content* is confined to
// a centred 85 × 55 mm safe area, while the background (colour + edge bands)
// runs to the full 88 × 58 mm. The combined preview draws a dashed border around
// the 85 × 55 content area for debugging; the print exports do not.
//
// Outputs:
//   assets/carte-visite-v13.svg        combined preview (with the debug border)
//   print/carte-visite-recto.svg       print face, 88 × 58 mm
//   print/carte-visite-verso.svg       print face, 88 × 58 mm
//
// Version history:
// v1 = v0 with the coral line layout taken from carte-contact-bia-recto-verso.svg
// v2 = v1 recto title → contact card "small" treatment (700, 0.125em)
// v3 = v2 with "« Triple A »" appended to the verso heading
// v4 = v3 with the alias in a lighter grey (#989ba0)
// v5 = v4 verso description → the two weekly schedules
// v6 = v5 with "Inscription : " before the URL in the recto CTA pill
// v7 = v6 with the CTA pill shrunk to hug the text
// v8 = v7 with a QR code to the website, bottom-right on the verso
// v9 = v8 resized to 88 × 58 mm, recto title "Cours de préparation au BIA à distance"
// v10 = v9 recto title back to one line
// v11 = v10 with more vertical spacing on the recto
// v12 = v11 recto title → "Préparation au BIA à distance"
// v13 = v12 with the 88×58 card split into: bg → full card, content → centred
//   85×55; preview gains a debug border; recto/verso exports → print/
//
//   node bin/build-carte.mjs
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// Turn a logo file into an SVG <symbol> (sanitising Inkscape/editor cruft).
function symbol(id, file, fill) {
  const s = read(file);
  const vb = /viewBox="([^"]+)"/.exec(s)[1];
  let inner = s
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<sodipodi:namedview[\s\S]*?\/>/g, "")
    .replace(/\s(?:sodipodi|inkscape):[a-zA-Z-]+="[^"]*"/g, "")
    .replace(/\sid="[^"]*"/g, "")
    .trim();
  if (fill) inner = inner.replace(/fill:#000000/g, `fill:${fill}`);
  return `<symbol id="${id}" viewBox="${vb}">${inner}</symbol>`;
}

const defs = [
  symbol("assoc-d", "static/images/logo.svg"),
  symbol("assoc-w", "static/images/logo-white.svg"),
  symbol("bia-d", "assets/bia.svg"),
  symbol("bia-w", "assets/bia.svg", "#ffffff"),
].join("\n    ");

const STYLE = `    @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;0,900&amp;display=swap");`;

// card / safe-area geometry
const CARD_W = 88, CARD_H = 58; // full card (bleed) size
const SAFE_W = 85, SAFE_H = 55; // content area, centred
const OFF_X = (CARD_W - SAFE_W) / 2; // 1.5
const OFF_Y = (CARD_H - SAFE_H) / 2; // 1.5

// QR code to the website (vector), bottom-right of the content area (85×55 space)
const qr = (
  await QRCode.toString("https://asso-triple-a.org/", {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#000a33", light: "#00000000" },
  })
).replace("<svg ", '<svg x="66" y="37" width="15" height="15" ');

// ---- background (runs to the full 88×58 card edges) ------------------------
const rectoBg = `    <rect width="88" height="58" fill="#000a33"/>
    <!-- bande verticale gauche (fond, jusqu'au bord) -->
    <rect width="1.2" height="58" fill="#e97770"/>`;

const versoBg = `    <rect width="88" height="58" fill="#ffffff"/>
    <!-- bandeau supérieur (fond, jusqu'au bord) -->
    <rect width="88" height="0.98" fill="#e97770"/>`;

// ---- content (centred 85×55 coordinate space) ------------------------------
const rectoContent = `    <!-- filet horizontal centré -->
    <line x1="24.2" y1="40.5" x2="60.8" y2="40.5" stroke="#e97770" stroke-width="0.49"/>

    <use xlink:href="#assoc-w" x="6" y="7" width="16" height="13.55"/>
    <use xlink:href="#bia-w" x="59" y="9" width="20" height="7.55"/>

    <text x="42.5" y="30.5" text-anchor="middle" font-size="3.5" font-weight="700"
          fill="#ffffff" letter-spacing="0.44">PRÉPARATION AU BIA À DISTANCE</text>
    <text x="42.5" y="36.5" text-anchor="middle" font-size="2.6" font-weight="700"
          fill="#f98780" letter-spacing="0.7">GRATUIT, POUR TOUS</text>

    <a xlink:href="https://asso-triple-a.org/" href="https://asso-triple-a.org/" target="_blank">
      <title>Site de l'association</title>
      <rect x="21" y="45" width="43" height="5.4" rx="0.6" fill="none" stroke="#ffe484" stroke-width="0.35"/>
      <text x="42.5" y="48.7" text-anchor="middle" font-size="2.7" font-weight="700"
            fill="#ffe484" letter-spacing="0.15">Inscription : asso-triple-a.org</text>
    </a>`;

const versoContent = `    <use xlink:href="#assoc-d" x="8" y="6.5" width="14" height="11.86"/>
    <use xlink:href="#bia-d" x="59" y="9" width="20" height="7.55"/>

    <text x="8" y="26" font-size="3.9" font-weight="700" fill="#484d55">Aérien Ambassadeurs Avenir <tspan fill="#989ba0" font-size="3.4">« Triple A »</tspan></text>
    <!-- créneaux hebdomadaires -->
    <text x="8" y="32" font-size="2.8" fill="#6e737a"><tspan font-weight="700" fill="#484d55">Mercredi</tspan> : 17h30 – 19h30</text>
    <text x="8" y="37" font-size="2.8" fill="#6e737a"><tspan font-weight="700" fill="#484d55">Samedi</tspan> : 10h – 12h</text>

    <!-- filet court -->
    <rect x="8" y="42" width="12" height="0.5" fill="#e97770"/>

    <a xlink:href="https://asso-triple-a.org/" href="https://asso-triple-a.org/" target="_blank">
      <title>Site de l'association</title>
      <text x="8" y="47.5" font-size="2.9" font-weight="700" fill="#e97770">asso-triple-a.org</text>
    </a>
    <text x="8" y="51.6" font-size="2.3" fill="#6e737a">contact@asso-triple-a.org</text>

    <!-- QR code vers le site -->
    ${qr}`;

// dashed marker around the 85×55 content area (preview only)
const DEBUG = `    <!-- repère de contrôle : zone de contenu 85 × 55 mm -->
    <rect x="1.5" y="1.5" width="85" height="55" fill="none" stroke="#ff00ff"
          stroke-width="0.2" stroke-dasharray="1.6 0.8"/>`;

// ---- combined preview (recto + verso side by side, with the debug border) --
const preview = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="202mm" height="82mm" viewBox="0 0 202 82"
     font-family="'Source Sans Pro', system-ui, sans-serif">
  <title>Carte de visite — aperçu — Aérien Ambassadeurs Avenir (Triple A)</title>
  <desc>Aperçu recto + verso. Carte 88 × 58 mm ; contenu dans 85 × 55 mm centré (trait magenta).</desc>
  <style>
${STYLE}
  </style>
  <defs>
    ${defs}
  </defs>

  <!-- ===================== RECTO ===================== -->
  <g transform="translate(6,6)">
${rectoBg}
    <g transform="translate(1.5,1.5)">
${rectoContent}
    </g>
${DEBUG}
  </g>
  <text x="6" y="73" font-size="2.6" fill="#989ba0">Recto — carte 88 × 58, contenu 85 × 55</text>

  <!-- ===================== VERSO ===================== -->
  <g transform="translate(108,6)">
${versoBg}
    <g transform="translate(1.5,1.5)">
${versoContent}
    </g>
${DEBUG}
  </g>
  <text x="108" y="73" font-size="2.6" fill="#989ba0">Verso — carte 88 × 58, contenu 85 × 55</text>
</svg>
`;

// ---- single print faces (88 × 58 mm, no debug border) ----------------------
const face = (label, bg, content) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="88mm" height="58mm" viewBox="0 0 88 58"
     font-family="'Source Sans Pro', system-ui, sans-serif">
  <title>Carte de visite — ${label} — Aérien Ambassadeurs Avenir (Triple A)</title>
  <desc>${label} — carte 88 × 58 mm ; contenu dans une zone centrée 85 × 55 mm.</desc>
  <style>
${STYLE}
  </style>
  <defs>
    ${defs}
  </defs>
${bg}
  <g transform="translate(1.5,1.5)">
${content}
  </g>
</svg>
`;

const outputs = {
  "assets/carte-visite-v13.svg": preview,
  "print/carte-visite-recto.svg": face("Recto", rectoBg, rectoContent),
  "print/carte-visite-verso.svg": face("Verso", versoBg, versoContent),
};

for (const [rel, content] of Object.entries(outputs)) {
  const out = path.join(root, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
  console.log(`wrote ${rel} (${(Buffer.byteLength(content) / 1024).toFixed(0)} KB)`);
}
