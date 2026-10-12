# Design improvements (style-preserving)

A catalogue of potential improvements to the BIA one-pager that **do not change
the global look and feel**. Every item is tagged with its visual impact:

| tag | meaning |
| --- | --- |
| **Invisible** | no change to rendered output in the default state |
| **Subtle** | only shows in a new state (focus, hover, active, reduced-motion, scroll) |
| **Text-only** | copy changes; layout/typography untouched |
| **None** | refactor/plumbing with byte-identical output |

Anything that would alter the visual language (palette, typeface, layout,
template feel) is listed under [Non-goals](#non-goals) instead.

## The style we are preserving

So "keep the style" is well defined, here is the current design language:

- **Type**: Source Sans Pro (Google Fonts), base `14pt` → `12pt`/`11pt`/`10.5pt`
  at the 1679/1279/735 breakpoints; headings `700`; tight `0.025em` tracking on
  body, wide `0.25em` uppercase on the `.title` tabs and buttons.
- **Palette**: ink `#777b80` / headings `#484d55` / muted `#989ba0`; accent
  salmon `#e97770` (hover `#f98780`, active `#d96760`); nav navy `#000a33` with
  CTA yellow `#ffe484`; section backgrounds alternate hero photo → `#fafafa↓#cecece`
  gradient → white → salmon → footer `#282b34`.
- **Layout**: fixed top nav; full-bleed sections with a centered `.container`
  (max `70em`); `.title` tabs that overlap the top edge of each section; a
  `.row`/`.col-*` grid; `.feature-list` icon circles.
- **Rhythm**: sections `6em 0 9em` padding (shrinking on small screens), titles
  uppercase and letter-spaced, generous whitespace, flat surfaces (no shadows
  except a faint inset on the footer credits).

## How to validate a change

Run the two gates already in the repo before and after:

```sh
pnpm check                 # svelte-check (types + a11y + unused CSS)
pnpm styles . build        # per-element computed-style diff (env-independent)
pnpm pics                  # pixel diff against pics/baseline (perceptual)
```

A change is "style-preserving" when `pnpm styles` reports no *meaningful*
differences and any pixel diff is confined to the intended area. Keep new
colours/spacing drawn from the palette and rhythm above.

---

## A. Accessibility (mostly Invisible)

1. **Visible keyboard focus** — `InscriptionButton.svelte` sets `outline: 0` on
   `.button`, and links rely on the UA default. Add a `:focus-visible` ring
   (e.g. `2px solid` current accent, `2px` offset) on links and buttons.
   *Subtle* (keyboard only) — no change for mouse users.
2. **Landmarks & semantics** — wrap the page in `<header>` / `<main>` /
   `<footer>` and give the nav `aria-label="Principale"`. Today the nav is a bare
   `<div id="nav">` and the footer is a `<section>`. *Invisible*.
3. **Nav anchors** — the logo and “Accueil” use `href="#"` (currently silenced
   with `svelte-ignore`). Give them a real target/`aria-current` so assistive
   tech announces them correctly. *Invisible*.
4. **Colour contrast audit** — muted text is borderline: `#989ba0` on the
   gradient, `rgba(255,255,255,.5)` on `#282b34`, and nav links at `.75` alpha on
   `#000a33`. Nudge alpha/lightness by the minimum needed for WCAG AA while
   keeping hue. *Subtle*.
5. **`prefers-reduced-motion`** — the global link transition and button
   transitions animate on hover; gate them behind the media query. *Subtle*.
6. **Skip-to-content link** — visually hidden until focused, jumps to `#main`.
   *Subtle*.
7. **Decorative images** — the topic photos use `alt=""`, which is correct (the
   `h3`/`p` describe them); document this so it isn’t “fixed” incorrectly.
   *None*.
8. **Heading order** — keep exactly one `h1` (hero) and `h2`/`h3` below it; the
   `.title` tabs are decorative `div`s, which is fine. *None*.

## B. Responsive & mobile (Subtle)

1. **Anchor offset under the fixed nav** — add `scroll-margin-top` to section
   anchors so `#highlights`, `#features`, `#intro`, `#footer` don’t land under
   the nav. *Subtle*, fixes a real annoyance.
2. **Touch target size** — nav links are `0.5rem 1rem`; ensure ≥ 44×44 px on
   touch. *Subtle*.
3. **Sparse small-screen nav** — `.nav-not-essential` is hidden ≤ 735px, leaving
   only two links + CTA. Consider a lightweight in-style disclosure menu (same
   navy bar, same type) so “Nous connaître”/“Devenir volontaire” stay reachable.
   *Subtle*.
4. **`.title` tab overlap at odd widths** — the tabs are fixed-width `em` boxes
   centred with negative margins; a `clamp()`-ish guard prevents overlap with the
   section edge at unusual viewport widths. *Subtle*.
5. **Sticky mobile CTA** — a persistent “Inscriptions” button on small screens
   (same button style) improves conversion. *Subtle/additive*.

## C. One-page navigation UX (Subtle)

1. **Scroll-spy active state** — highlight the nav link for the section in view
   using the existing hover colour (`#fff`). *Subtle*.
2. **Smooth scrolling** — `scroll-behavior: smooth` for in-page anchors (respect
   `prefers-reduced-motion`). *Subtle*.
3. **Progress/back-to-top** — the logo already returns to top; optionally make
   this explicit. *Subtle*.

## D. Performance (Invisible)

1. **Font loading** — add `&display=swap` to the Google Fonts URL and
   `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com` to avoid a flash
   of invisible text. *Invisible*.
2. **Self-host Source Sans Pro** — replaces the third-party request with local
   `woff2`; identical rendering if the same faces are used. *Invisible*.
3. **Subset Font Awesome** — `fontawesome-all.min.css` (~4.6k lines) + the full
   `fa-solid-900` woff2 are shipped; only a handful of icons are used
   (`fa-plane`, `fa-envelope`, `fa-comment`). Subsetting cuts a large chunk of CSS
   and font bytes. *Invisible*.
4. **Lazy-load below-the-fold images** — add `loading="lazy" decoding="async"`
   to the topic/laptop `<enhanced:img>`; leave the hero as-is (it’s a CSS
   background). *Invisible*.
5. **Preload the hero background** — `<link rel="preload" as="image"
   href="/images/ia-runway.webp">` to improve LCP. *Invisible*.
6. **`lang`/`dir`** already correct (`lang="fr"`). *None*.

## E. SEO, metadata & sharing (Invisible)

1. **Meta description + canonical** — add `<meta name="description">` and a
   canonical URL in `app.html`. *Invisible*.
2. **Open Graph / Twitter cards** — `og:title`, `og:description`, `og:image`
   (e.g. a hero screenshot), `og:locale="fr_FR"` for nice link previews.
   *Invisible*.
3. **Structured data (JSON-LD)** — `EducationalOrganization` for the association
   and `Course`/`Event` for the BIA sessions. *Invisible*.
4. **`robots.txt` + `sitemap.xml`** in `static/`. *Invisible*.
5. **Tighter `<title>`** — the current title is very long; keep the wording but
   ensure the important part comes first. *Text-only*.

## F. Visual polish & consistency (Subtle)

1. **Retire the two benign style diffs** — normalise the `.wrapper.style3`
   gradient (`#fafafa, #cecece`) and use `border-top-width: 0` instead of the
   `border-top: 0` shorthand that resets `border-top-color`. *None* (no visual
   change) — makes `pnpm styles` clean.
2. **Unify image treatment** — topic photos carry a `10px` white border; the
   laptop image does not. Keeping the style, decide one treatment and apply it
   consistently. *Subtle*.
3. **Transition consistency** — links use `color .25s`, buttons `all .25s`;
   align the easing/duration and property list. *Subtle*.
4. **Nav CTA active state** — add an `:active` shade mirroring the button’s
   (`#d96760`) so it feels part of the same control family. *Subtle*.
5. **Tracking consistency** — hero subtitle is `0.2em` while other uppercase
   text is `0.25em`; pick one. *Subtle*.
6. **Footer icon-circle sizing** — Features and Footer duplicate the
   `.feature-list h3:before` circle; keep them identical when touching either.
   *None*.

## G. Content & microcopy (Text-only)

These are visible text changes (they will show up in the pixel diff) but leave
the design untouched — mostly missing French diacritics copied from the
original:

1. "Nous connaitre" → **"Nous connaître"** — in both the nav link (`Nav.svelte`)
   and the Intro section title (`Intro.svelte`).
2. Topic copy "Etude …" → **"Étude …"** (several occurrences in `config.ts` and
   `Highlights.svelte`).
3. Features "à coeur" → **"à cœur"**.
4. Keep the CTA label/year in one place — `Inscriptions 2026-27` lives in
   `config.ts`, so updating the form year updates every call site at once.

## H. Maintainability (None)

1. **Design tokens** — lift the palette, tracking, transition and section
   rhythm into CSS custom properties so components stop re-declaring literal
   values. Values stay identical, so output is unchanged. *None*.
2. **Shared section primitives** — `.wrapper`, `.title`, `.container`, `.row`,
   `.icon` are duplicated across components. A shared primitive (or documented
   convention) reduces drift. Note the deliberate trade-off: the migration
   chose scoped duplication to keep global CSS tiny.
3. **CI gates** — run `pnpm check`, `pnpm styles`, and `pnpm pics` in
   `.github/workflows`. *None*.
4. **Document the image pipeline** — already in the README; keep the source
   original (`ia-runway.png`) and the webp in sync via the documented `cwebp`
   command.

---

## Non-goals

These would change the global style (or the product), so they are explicitly
out of scope for a “style-preserving” pass:

- New palette/brand colours, gradients or accent hues.
- Dark mode / `prefers-color-scheme` theming.
- A different typeface or a switch away from Source Sans Pro.
- Layout restructure (sidebars, card grids, hero video, sections removed/added).
- Switching templates or introducing a component framework beyond Svelte.
- Shadows, large border-radii, glassmorphism or other new surface treatments.
- Adding a backend/contact form (the site is intentionally static).

## Suggested priority

| Priority | Items | Rationale |
| --- | --- | --- |
| **P0** | A1, A2, A4, B1, D1, D5, E1, E2 | invisible/cheap, real a11y + LCP + sharing wins |
| **P1** | A5, A6, C1, C2, D3, D4, E3, E4, G1–G3 | quality, performance, discoverability |
| **P2** | B3, B5, F1–F5, H1, H3 | polish, consistency, maintainability |
| **P3** | B2, B4, D2, F2, H2 | larger or lower-value; revisit as needed |

Every P0/P1 item above can be shipped without altering how the site looks in its
default state; the only visible-in-default items are the copy fixes in **G**.
