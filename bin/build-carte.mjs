// Generates assets/carte-visite-v1.svg — a non-personal business card (recto +
// verso, 85×55 mm each) in the charte-graphique style: the website header look
// (navy + coral accent + uppercase tracked titles), both logos, and a link to
// the site.
//
// v1 = v0 with the coral line layout taken from carte-contact-bia-recto-verso.svg:
//   recto: left vertical band + centred horizontal rule
//   verso: top band + short rule under the heading
// (positions adapted to v0's layout)
//
//   node bin/build-carte.mjs
import fs from "node:fs";
import path from "node:path";

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

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="196mm" height="80mm" viewBox="0 0 196 80"
     font-family="'Source Sans Pro', system-ui, sans-serif">
  <title>Carte de visite — Aérien Ambassadeurs Avenir (Triple A)</title>
  <desc>Recto et verso, 85 × 55 mm, sans encre de coupe. Reprend l'identité de l'en-tête du site (marine, accent corail, titres majuscules interlettrés).</desc>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;0,900&amp;display=swap");
  </style>
  <defs>
    ${defs}
  </defs>

  <!-- ===================== RECTO (en-tête) ===================== -->
  <g transform="translate(6,6)">
    <rect width="85" height="55" fill="#000a33"/>
    <!-- bande verticale gauche + filet horizontal centré (repris de la carte de contact) -->
    <rect width="1.16" height="55" fill="#e97770"/>
    <line x1="24.2" y1="37.8" x2="60.8" y2="37.8" stroke="#e97770" stroke-width="0.49"/>

    <use xlink:href="#assoc-w" x="6" y="6.5" width="16" height="13.55"/>
    <use xlink:href="#bia-w" x="59" y="8.5" width="20" height="7.55"/>

    <text x="42.5" y="29" text-anchor="middle" font-size="3.8" font-weight="900"
          fill="#ffffff" letter-spacing="0.5">COURS DU BIA À DISTANCE</text>
    <text x="42.5" y="34.5" text-anchor="middle" font-size="2.6" font-weight="700"
          fill="#f98780" letter-spacing="0.7">GRATUIT, POUR TOUS</text>

    <a xlink:href="https://asso-triple-a.org/" href="https://asso-triple-a.org/" target="_blank">
      <title>Site de l'association</title>
      <rect x="27.5" y="41.5" width="30" height="5.4" rx="0.6" fill="none" stroke="#ffe484" stroke-width="0.35"/>
      <text x="42.5" y="45.2" text-anchor="middle" font-size="3" font-weight="700"
            fill="#ffe484" letter-spacing="0.2">asso-triple-a.org</text>
    </a>
  </g>
  <text x="6" y="73" font-size="2.6" fill="#989ba0">Recto — 85 × 55 mm</text>

  <!-- ===================== VERSO (information) ===================== -->
  <g transform="translate(105,6)">
    <rect width="85" height="55" fill="#ffffff" stroke="#e3e3e3" stroke-width="0.3"/>
    <!-- bandeau supérieur (repris de la carte de contact) -->
    <rect width="85" height="0.98" fill="#e97770"/>

    <use xlink:href="#assoc-d" x="8" y="6.5" width="14" height="11.86"/>
    <use xlink:href="#bia-d" x="59" y="9" width="20" height="7.55"/>

    <text x="8" y="26" font-size="3.9" font-weight="700" fill="#484d55">Aérien Ambassadeurs Avenir</text>
    <text x="8" y="30.5" font-size="2.5" fill="#6e737a">Association « Triple A » — Préparation au BIA</text>
    <text x="8" y="34.5" font-size="2.5" fill="#6e737a">Cours à distance, gratuits et ouverts à tous.</text>
    <text x="8" y="38.5" font-size="2.5" fill="#6e737a">Brevet d’Initiation Aéronautique.</text>

    <!-- filet court sous le titre (repris de la carte de contact) -->
    <rect x="8" y="28.2" width="7.34" height="0.49" fill="#e97770"/>

    <a xlink:href="https://asso-triple-a.org/" href="https://asso-triple-a.org/" target="_blank">
      <title>Site de l'association</title>
      <text x="8" y="47.5" font-size="2.9" font-weight="700" fill="#e97770">asso-triple-a.org</text>
    </a>
    <text x="8" y="51.6" font-size="2.3" fill="#6e737a">contact@asso-triple-a.org</text>
  </g>
  <text x="105" y="73" font-size="2.6" fill="#989ba0">Verso — 85 × 55 mm</text>
</svg>
`;

const out = path.join(root, "assets/carte-visite-v1.svg");
fs.writeFileSync(out, svg);
console.log(`wrote ${path.relative(root, out)} (${(Buffer.byteLength(svg) / 1024).toFixed(0)} KB)`);
