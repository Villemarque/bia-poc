// Generates charte-graphique.html — a single, self-contained style guide
// (fonts embedded as base64, logos inlined) for producing work that matches the
// BIA / Aérien Ambassadeurs Avenir design.
//
//   node bin/build-charte.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// ---- fonts: inline the woff2 subsets as base64 data URIs --------------------
let fontCss = read("static/fonts/source-sans-pro.css").replace(
  /url\("\/fonts\/([^"]+)"\)/g,
  (_, name) =>
    `url("data:font/woff2;base64,${fs
      .readFileSync(path.join(root, "static/fonts", name))
      .toString("base64")}")`,
);

// ---- logos: inline the SVG markup -------------------------------------------
const svg = (p) =>
  read(p)
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sid="[^"]*"/g, "") // avoid duplicate ids when inlining several svgs
    .trim();
const logo = svg("static/images/logo.svg"); // for light backgrounds
const logoWhite = svg("static/images/logo-white.svg"); // for dark backgrounds

// ---- palette ----------------------------------------------------------------
const colors = [
  ["Accent", "--color-accent", "#e97770", "Emphase, CTA, titres de section"],
  ["Accent survol", "--color-accent-hover", "#f98780", "État survol des CTA"],
  ["Accent actif", "--color-accent-active", "#d96760", "État pressé des CTA"],
  ["Encre", "--color-ink", "#6e737a", "Texte de corps"],
  ["Encre atténuée", "--color-ink-muted", "#73777c", "Texte secondaire (fond clair)"],
  ["Encre estompée", "--color-ink-faint", "#989ba0", "Texte discret (fond sombre)"],
  ["Titres", "--color-heading", "#484d55", "Titres de contenu"],
  ["Liens", "--color-link", "#717479", "Liens dans le corps"],
  ["Marine (barre)", "--color-nav", "#000a33", "Barre de navigation"],
  ["Jaune (CTA nav)", "--nav-yellow", "#ffe484", "Bouton d'inscription (nav)"],
  ["Icône (pastille)", "--color-icon-circle", "#2f333b", "Fond des pastilles d'icône"],
  ["Pied de page", "--color-footer", "#282b34", "Fond du pied de page"],
  ["Surface claire", "--surface-light", "#fafafa", "Haut du dégradé « Le BIA »"],
  ["Surface foncée", "--surface-dark", "#cecece", "Bas du dégradé « Le BIA »"],
  ["Titre clair", "--title-highlight", "#071037", "Titre sur fond dégradé"],
];

const swatch = ([name, varName, hex, use]) => {
  const dark = parseInt(hex.slice(1), 16);
  const lum = (0.2126 * ((dark >> 16) & 255) + 0.7152 * ((dark >> 8) & 255) + 0.0722 * (dark & 255)) / 255;
  const text = lum > 0.55 ? "#484d55" : "#fff";
  return `<figure class="sw">
    <div class="sw-chip" style="background:${hex};color:${text}">Aa</div>
    <figcaption>
      <strong>${name}</strong>
      <code>${hex}</code>
      <span class="sw-var">${varName}</span>
      <span class="sw-use">${use}</span>
    </figcaption>
  </figure>`;
};

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Charte graphique — BIA · Aérien Ambassadeurs Avenir (Triple A)</title>
<style>
${fontCss}
:root {
  --color-accent: #e97770;
  --color-accent-hover: #f98780;
  --color-accent-active: #d96760;
  --color-ink: #6e737a;
  --color-ink-muted: #73777c;
  --color-ink-faint: #989ba0;
  --color-heading: #484d55;
  --color-link: #717479;
  --color-nav: #000a33;
  --color-nav-accent: #ffe484;
  --color-icon-circle: #2f333b;
  --color-footer: #282b34;
  --transition: 0.25s ease-in-out;
  --font: "Source Sans Pro", system-ui, sans-serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 4.5rem; }
body {
  margin: 0;
  font-family: var(--font);
  color: var(--color-ink);
  background: #fff;
  font-size: 16px;
  line-height: 1.6;
}
h1, h2, h3, h4 { color: var(--color-heading); line-height: 1.25; }
a { color: var(--color-link); }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85em; }

/* doc chrome */
.bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 1rem;
  background: var(--color-nav); color: #fff;
  padding: 0.6rem 1.25rem;
}
.bar .bar-logo { display: inline-flex; align-items: center; }
.bar .bar-logo svg { height: 2.2rem; width: auto; display: block; }
.bar .bar-title { font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.8rem; }
.bar nav { margin-left: auto; display: flex; gap: 1rem; flex-wrap: wrap; }
.bar nav a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.85rem; }
.bar nav a:hover { color: #fff; }
.wrap { max-width: 70rem; margin: 0 auto; padding: 0 1.25rem 6rem; }
section { padding: 3.5rem 0 1rem; border-top: 1px solid #eee; }
section:first-of-type { border-top: 0; }
h2.sec { font-size: 1.6rem; letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 0.25rem; }
h2.sec span { display: block; font-size: 0.8rem; font-weight: 400; letter-spacing: 0.02em; text-transform: none; color: var(--color-ink-muted); }
h3 { margin: 1.75rem 0 0.5rem; font-size: 1.1rem; letter-spacing: 0.04em; }
p.lead { font-size: 1.05rem; max-width: 48rem; }
small.note { color: var(--color-ink-muted); }

/* hero */
.hero { padding: 3rem 1.25rem 2rem; background: linear-gradient(to top, #cecece, #fafafa); }
.hero-inner { max-width: 70rem; margin: 0 auto; }
.hero h1 { font-size: 2rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 900; margin: 0 0 0.5rem; }
.hero p { text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-ink-muted); margin: 0; }

/* logos */
.logo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
.logo-card { border: 1px solid #eee; border-radius: 0.35em; padding: 2rem; display: flex; align-items: center; justify-content: center; }
.logo-card.on-dark { background: var(--color-nav); }
.logo-card svg { width: 100%; max-width: 220px; height: auto; display: block; }
.logo-badge { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; border-radius: 2.5em; background: var(--color-icon-circle); color: #fff; }

/* swatches */
.sw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1rem; margin: 1rem 0; }
.sw { margin: 0; border: 1px solid #eee; border-radius: 0.35em; overflow: hidden; }
.sw-chip { height: 84px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; letter-spacing: 0.05em; }
.sw figcaption { padding: 0.6rem 0.75rem; display: flex; flex-direction: column; gap: 0.1rem; font-size: 0.82rem; }
.sw figcaption strong { color: var(--color-heading); }
.sw figcaption code { color: var(--color-ink-muted); }
.sw-var { color: var(--color-accent); }
.sw-use { color: var(--color-ink-muted); }

/* tables */
table { border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: 0.9rem; }
th, td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #eee; }
th { color: var(--color-heading); font-weight: 700; }

/* specimens */
.spec { border-bottom: 1px solid #f0f0f0; padding: 0.75rem 0; }
.w900 { font-weight: 900; } .w700 { font-weight: 700; } .ital { font-style: italic; }
.track-wide { letter-spacing: 0.25em; text-transform: uppercase; }
.track-mid { letter-spacing: 0.075em; }
.track-hero { letter-spacing: 0.2em; text-transform: uppercase; }

/* component demos */
.demo { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; }
.demo-tab {
  position: relative; display: block; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.25em; font-size: 1.2em; color: #071037; background: var(--surface-light, #fafafa);
  padding: 0.5em 1em; line-height: 3.25em; height: 3.25em; text-align: center;
}
.demo-button {
  display: inline-block; text-align: center; text-transform: uppercase; font-weight: 700;
  letter-spacing: 0.25em; text-decoration: none; border-radius: 0.35em; border: 0; cursor: pointer;
  padding: 0 2.25em; font-size: 1em; min-width: 14em; height: 4em; line-height: 4em;
  color: #fff; background: var(--color-accent); transition: all var(--transition);
}
.demo-button:hover { background: var(--color-accent-hover); }
.demo-button:active { background: var(--color-accent-active); }
.demo-feature { position: relative; padding-left: 3.5em; }
.demo-feature h4 { margin: 0 0 0.25em; color: var(--color-accent); font-weight: 700; letter-spacing: 0.05em; }
.demo-feature .badge {
  position: absolute; left: 0; top: -0.2em; width: 2.5em; height: 2.5em; line-height: 2.5em;
  text-align: center; border-radius: 2.5em; background: var(--color-icon-circle); color: #fff;
}
.demo-link { color: var(--color-link); text-decoration: underline; }
.demo-link:hover { text-decoration: none; }
.demo-nav { background: var(--color-nav); padding: 0.5rem 1rem; display: flex; gap: 1.2rem; align-items: center; border-radius: 0.35em; }
.demo-nav a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 16px; }
.demo-nav a:hover, .demo-nav a.active { color: #fff; }
.demo-nav .cta { margin-left: auto; color: var(--color-nav-accent); border: 1px solid var(--color-nav-accent); border-radius: 0.25rem; padding: 0.375rem 0.75rem; text-decoration: none; }

/* tokens block */
pre.token { background: #282b34; color: #e6e6e6; padding: 1rem; border-radius: 0.35em; overflow-x: auto; font-size: 0.82rem; }

/* rules */
.rules { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.rules ul { margin: 0.5rem 0; padding-left: 1.1rem; }
.rules .do { border-left: 4px solid var(--color-accent); }
.rules .dont { border-left: 4px solid var(--color-ink-faint); }
.rules h3 { margin-top: 0; }
@media (max-width: 620px) { .rules { grid-template-columns: 1fr; } }
footer.doc { background: var(--color-footer); color: rgba(255,255,255,0.7); padding: 2rem 1.25rem; text-align: center; font-size: 0.85rem; }
</style>
</head>
<body>

<header class="bar">
  <span class="bar-logo">${logoWhite}</span>
  <span class="bar-title">Charte graphique</span>
  <nav>
    <a href="#logo">Logo</a>
    <a href="#couleurs">Couleurs</a>
    <a href="#typographie">Typographie</a>
    <a href="#espacement">Espacement</a>
    <a href="#composants">Composants</a>
    <a href="#icones">Icônes</a>
    <a href="#regles">Règles</a>
    <a href="#tokens">Tokens</a>
  </nav>
</header>

<div class="hero">
  <div class="hero-inner">
    <h1>BIA — Aérien Ambassadeurs Avenir</h1>
    <p>Charte graphique · Triple A</p>
  </div>
</div>

<div class="wrap">

  <section id="intro">
    <h2 class="sec">Introduction<span>Identité visuelle</span></h2>
    <p class="lead">Cette charte regroupe la typographie, les couleurs, les rythmes et les composants
    du site du BIA par l’association Aérien Ambassadeurs Avenir (dite « Triple A », ou « Triple A »).
    Elle est autonome : les polices sont incluses et les logos sont vectoriels, afin de produire des
    supports externes cohérents (affiches, réseaux sociaux, courriers, présentations).</p>
    <p class="lead">Style : sobre et aéré, aplats sans ombre, titres en majuscules fortement
    interlettrées, accent corail, alternance de sections claires / dégradé / corail / marine.</p>
  </section>

  <section id="logo">
    <h2 class="sec">Logo<span>Logotype</span></h2>
    <div class="logo-grid">
      <div class="logo-card">${logo}</div>
      <div class="logo-card on-dark">${logoWhite}</div>
    </div>
    <h3>Règles d’usage</h3>
    <ul>
      <li>Version foncée (<code>logo.svg</code>) sur fonds clairs ; version blanche (<code>logo-white.svg</code>) sur fonds sombres ou photographiques.</li>
      <li>Respecter une marge de sécurité équivalente à la hauteur du « T » du monogramme sur tout le pourtour.</li>
      <li>Ne pas déformer, incliner, ombrer, ni recolorer le logo ; ne pas le poser sur un fond peu contrasté.</li>
      <li>Taille minimale à l’écran : 2,2 rem de hauteur ; sur le site, <code>object-fit: contain</code>.</li>
    </ul>
  </section>

  <section id="couleurs">
    <h2 class="sec">Couleurs<span>Palette</span></h2>
    <p class="lead">Trois familles : le corail (accent), les gris (texte) et les fonds (marine, gris pierre).
    Les variables CSS entre parenthèses sont celles définies dans <code>:root</code>.</p>
    <div class="sw-grid">
      ${colors.map(swatch).join("\n      ")}
    </div>
    <h3>Combinaisons</h3>
    <table>
      <tr><th>Fond</th><th>Texte recommandé</th><th>Usage</th></tr>
      <tr><td>Blanc / gris clair</td><td>Encre <code>#6e737a</code>, titres <code>#484d55</code></td><td>Contenu courant</td></tr>
      <tr><td>Corail <code>#e97770</code></td><td>Blanc <code>#ffffff</code></td><td>Bandeaux, pastilles, titres de section</td></tr>
      <tr><td>Marine <code>#000a33</code></td><td>Blanc (75–100 %)</td><td>Barre de navigation</td></tr>
      <tr><td>Pierre <code>#282b34</code></td><td>Blanc 50 %</td><td>Pied de page</td></tr>
    </table>
    <small class="note">Accessibilité : le corail <code>#e97770</code> avec du texte blanc, et le corail en
    texte sur fond blanc, sont sous le seuil AA 4,5:1 — réserver le corail aux grandes tailles ou aux aplats,
    et utiliser l’encre pour le petit texte.</small>
  </section>

  <section id="typographie">
    <h2 class="sec">Typographie<span>Source Sans Pro</span></h2>
    <p class="lead">Famille <strong>Source Sans Pro</strong> (Google Fonts / auto-hébergée), graisses
    400, 400 italique, 700 et 900. Pile de secours : <code>system-ui, sans-serif</code>.</p>

    <div class="spec w900" style="font-size:1.6rem">900 · Noir — Titres héro</div>
    <div class="spec w700" style="font-size:1.3rem">700 · Gras — Titres, boutons, libellés</div>
    <div class="spec" style="font-size:1.05rem">400 · Normal — Texte courant</div>
    <div class="spec ital" style="font-size:1.05rem">400 italique — Citations, emphase</div>
    <div class="spec track-hero w900" style="font-size:1.2rem">Majuscules · interlettrage 0,2em — surtitre</div>
    <div class="spec track-wide w700" style="font-size:1.1rem">Majuscules · interlettrage 0,25em — onglet / bouton</div>
    <div class="spec track-mid" style="font-size:1.05rem">Interlettrage 0,075em — sous-titres style1</div>

    <h3>Échelle & interlignes</h3>
    <table>
      <tr><th>Élément</th><th>Taille</th><th>Interlettrage</th><th>Interligne</th></tr>
      <tr><td>Titre héro (h1)</td><td>2em · 900 · majuscules</td><td>0,25em</td><td>1,25em</td></tr>
      <tr><td>Onglet de section</td><td>1,2em · 700 · majuscules</td><td>0,25em</td><td>3,25em</td></tr>
      <tr><td>Titre de contenu (h2/h3)</td><td>1,15–2em · 700</td><td>0,05–0,075em</td><td>1,25–1,5em</td></tr>
      <tr><td>Corps</td><td>14pt → 12pt → 11pt → 10,5pt</td><td>0,025em → 0,015em → 0</td><td>1,75em → 1,5em</td></tr>
      <tr><td>Pied de page / crédits</td><td>0,9em</td><td>—</td><td>—</td></tr>
    </table>
    <small class="note">Points de rupture : ≤1679,29px (12pt) · ≤1279,29px (11pt) · ≤979,29px · ≤735,29px (10,5pt).</small>
  </section>

  <section id="espacement">
    <h2 class="sec">Espacement & grille<span>Rythme</span></h2>
    <table>
      <tr><th>Token</th><th>Valeur</th><th>Note</th></tr>
      <tr><td>Padding de section</td><td><code>6em 0 9em</code></td><td>≤1279px : <code>4em 0 7em</code> · ≤735px : <code>3em 0 6em</code></td></tr>
      <tr><td>Conteneur</td><td><code>calc(100% - 40px)</code>, max <code>70em</code></td><td>≥979,3px : <code>calc(100% - 100px)</code></td></tr>
      <tr><td>Gouttière de grille</td><td><code>50px</code></td><td>35px (≤1279) · 30px (≤735) ; via marges négatives</td></tr>
      <tr><td>Colonnes</td><td><code>col-4</code> 33,33 % · <code>col-6</code> 50 % · <code>col-12</code> 100 %</td><td>Pleine largeur en mobile</td></tr>
      <tr><td>Onglet de section</td><td>25em × 3,25em, décalé de −3,25em</td><td>≤735px : 18em × 2,5em</td></tr>
      <tr><td>Bord d’image</td><td><code>10px solid #fff</code></td><td>Photos de thèmes</td></tr>
      <tr><td>Transition</td><td><code>0,25s ease-in-out</code></td><td>Liens, boutons</td></tr>
    </table>
  </section>

  <section id="composants">
    <h2 class="sec">Composants<span>Éléments d’interface</span></h2>

    <h3>Onglet de section</h3>
    <div class="demo"><span class="demo-tab">Le BIA</span></div>

    <h3>Bouton d’action (CTA)</h3>
    <div class="demo">
      <a class="demo-button" href="#composants">Inscriptions 2026-27</a>
    </div>

    <h3>Élément de liste à icône</h3>
    <div class="demo">
      <div class="demo-feature">
        <span class="badge">✈</span>
        <h4>Créneau du mercredi</h4>
        <p style="margin:0">De 17h30 à 19h30</p>
      </div>
    </div>

    <h3>Barre de navigation</h3>
    <div class="demo" style="display:block">
      <div class="demo-nav">
        <a href="#composants" class="active">Accueil</a>
        <a href="#composants">Le BIA</a>
        <a href="#composants">Les cours</a>
        <a href="#composants" class="cta">Inscriptions 2026-27</a>
      </div>
    </div>

    <h3>Lien</h3>
    <p>Texte courant avec <a class="demo-link" href="#composants">un lien souligné</a> qui perd son soulignement au survol.</p>
  </section>

  <section id="icones">
    <h2 class="sec">Icônes<span>Font Awesome 5</span></h2>
    <p class="lead">Icônes solides de <strong>Font Awesome 5 Free</strong> (graisse 900), posées sur une
    pastille ronde <code>--color-icon-circle</code>. Icônes utilisées sur le site :</p>
    <table>
      <tr><th>Icône</th><th>Classe</th><th>Usage</th></tr>
      <tr><td style="font-size:1.3em">✈</td><td><code>fa-solid fa-plane</code></td><td>Créneaux de cours</td></tr>
      <tr><td style="font-size:1.3em">✉</td><td><code>fa-solid fa-envelope</code></td><td>Contact e-mail (pied de page)</td></tr>
      <tr><td style="font-size:1.3em">💬</td><td><code>fa-solid fa-comment</code></td><td>Réseaux sociaux (pied de page)</td></tr>
    </table>
    <small class="note">Le site charge <code>/fontawesome-all.min.css</code> et les webfonts associées depuis <code>static/webfonts/</code>.</small>
  </section>

  <section id="regles">
    <h2 class="sec">Règles<span>À faire / à éviter</span></h2>
    <div class="rules">
      <div class="do">
        <h3>À faire</h3>
        <ul>
          <li>Corail pour l’emphase ; encre pour le corps de texte.</li>
          <li>Titres et boutons en majuscules avec interlettrage (0,2–0,25em).</li>
          <li>Aplats sans ombre ; alterner les fonds de section.</li>
          <li>Respiration généreuse (padding de section en <code>em</code>).</li>
          <li>Photos avec bord blanc de 10px.</li>
        </ul>
      </div>
      <div class="dont">
        <h3>À éviter</h3>
        <ul>
          <li>Introduire de nouvelles couleurs hors palette.</li>
          <li>Ombres portées, cartes arrondies, dégradés superflus.</li>
          <li>Changer la police ou mélanger plusieurs familles.</li>
          <li>Corps de texte en majuscules ou surligné.</li>
          <li>Corail pour du petit texte sur fond clair (contraste insuffisant).</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="tokens">
    <h2 class="sec">Tokens<span>Variables CSS</span></h2>
    <p class="lead">Source de vérité des couleurs (fichier <code>src/routes/+layout.svelte</code>) :</p>
    <pre class="token">:root {
  --color-accent: #e97770;
  --color-accent-hover: #f98780;
  --color-accent-active: #d96760;
  --color-ink: #6e737a;
  --color-ink-muted: #73777c;
  --color-ink-faint: #989ba0;
  --color-heading: #484d55;
  --color-link: #717479;
  --color-nav: #000a33;
  --color-icon-circle: #2f333b;
  --color-footer: #282b34;
  --transition: 0.25s ease-in-out;
}</pre>
    <p><small class="note">Polices : Source Sans Pro (400, 400i, 700, 900), subsets latin + latin-ext,
    incluses dans ce fichier en base64. Logos : <code>static/images/logo.svg</code> et
    <code>logo-white.svg</code>, reproduits ci-dessus en vectoriel.</small></p>
  </section>

</div>

<footer class="doc">
  Charte graphique — BIA · Aérien Ambassadeurs Avenir (Triple A) ·
  contact@asso-triple-a.org · asso-triple-a.org
</footer>

</body>
</html>
`;

const out = path.join(root, "charte-graphique.html");
fs.writeFileSync(out, html);
console.log(`wrote ${path.relative(root, out)} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
