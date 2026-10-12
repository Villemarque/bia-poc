// Generates the business card SVGs from the charte-graphique style.
//
// Outputs (all based on v12):
//   assets/carte-visite-v12.svg    combined preview (recto + verso side by side)
//   assets/carte-visite-recto.svg  print face, exactly 88 × 58 mm (trim, no bleed)
//   assets/carte-visite-verso.svg  print face, exactly 88 × 58 mm (trim, no bleed)
//
// Version history:
// v1 = v0 with the coral line layout taken from carte-contact-bia-recto-verso.svg
//   (recto: left band + centred rule; verso: top band + short rule at y=42)
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

// QR code to the website (vector), placed bottom-right on the verso
const qr = (
  await QRCode.toString("https://asso-triple-a.org/", {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#000a33", light: "#00000000" },
  })
).replace("<svg ", '<svg x="69" y="37" width="15" height="15" ');

// ---- card faces (coordinate space 88 × 58 mm, origin at top-left) ----------
const rectoBody = `    <!-- bande verticale gauche + filet horizontal centré -->
    <rect width="1.2" height="58" fill="#e97770"/>
    <line x1="25.7" y1="40.5" x2="62.3" y2="40.5" stroke="#e97770" stroke-width="0.49"/>

    <use xlink:href="#assoc-w" x="6" y="7" width="16" height="13.55"/>
    <use xlink:href="#bia-w" x="62" y="9" width="20" height="7.55"/>

    <text x="44" y="30.5" text-anchor="middle" font-size="3.5" font-weight="700"
          fill="#ffffff" letter-spacing="0.44">PRÉPARATION AU BIA À DISTANCE</text>
    <text x="44" y="36.5" text-anchor="middle" font-size="2.6" font-weight="700"
          fill="#f98780" letter-spacing="0.7">GRATUIT, POUR TOUS</text>

    <a xlink:href="https://asso-triple-a.org/" href="https://asso-triple-a.org/" target="_blank">
      <title>Site de l'association</title>
      <rect x="22.5" y="45" width="43" height="5.4" rx="0.6" fill="none" stroke="#ffe484" stroke-width="0.35"/>
      <text x="44" y="48.7" text-anchor="middle" font-size="2.7" font-weight="700"
            fill="#ffe484" letter-spacing="0.15">Inscription : asso-triple-a.org</text>
    </a>`;

const versoBody = `    <!-- bandeau supérieur -->
    <rect width="88" height="0.98" fill="#e97770"/>

    <use xlink:href="#assoc-d" x="8" y="6.5" width="14" height="11.86"/>
    <use xlink:href="#bia-d" x="62" y="9" width="20" height="7.55"/>

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

// ---- combined preview (recto + verso side by side) -------------------------
const combined = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="202mm" height="82mm" viewBox="0 0 202 82"
     font-family="'Source Sans Pro', system-ui, sans-serif">
  <title>Carte de visite — Aérien Ambassadeurs Avenir (Triple A)</title>
  <desc>Aperçu recto + verso, 88 × 58 mm chacun, sans encre de coupe.</desc>
  <style>
${STYLE}
  </style>
  <defs>
    ${defs}
  </defs>

  <!-- ===================== RECTO ===================== -->
  <g transform="translate(6,6)">
    <rect width="88" height="58" fill="#000a33"/>
${rectoBody}
  </g>
  <text x="6" y="73" font-size="2.6" fill="#989ba0">Recto — 88 × 58 mm</text>

  <!-- ===================== VERSO ===================== -->
  <g transform="translate(108,6)">
    <rect width="88" height="58" fill="#ffffff" stroke="#e3e3e3" stroke-width="0.3"/>
${versoBody}
  </g>
  <text x="108" y="73" font-size="2.6" fill="#989ba0">Verso — 88 × 58 mm</text>
</svg>
`;

// ---- single print faces (exact trim size, no bleed, no preview border) -----
const face = (label, bg, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="88mm" height="58mm" viewBox="0 0 88 58"
     font-family="'Source Sans Pro', system-ui, sans-serif">
  <title>Carte de visite — ${label} — Aérien Ambassadeurs Avenir (Triple A)</title>
  <desc>${label} — 88 × 58 mm (format de coupe, sans fond perdu).</desc>
  <style>
${STYLE}
  </style>
  <defs>
    ${defs}
  </defs>
  ${bg}
${body}
</svg>
`;

const outputs = {
  "assets/carte-visite-v12.svg": combined,
  "assets/carte-visite-recto.svg": face("Recto", '<rect width="88" height="58" fill="#000a33"/>', rectoBody),
  "assets/carte-visite-verso.svg": face("Verso", '<rect width="88" height="58" fill="#ffffff"/>', versoBody),
};

for (const [rel, content] of Object.entries(outputs)) {
  fs.writeFileSync(path.join(root, rel), content);
  console.log(`wrote ${rel} (${(Buffer.byteLength(content) / 1024).toFixed(0)} KB)`);
}
