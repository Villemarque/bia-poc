# Bia Proof of Concept

## Install

`pnpm install`
to generate CSS run `pnpm run build`

to generate the HTML, you need a working JVM, with `scala-cli` installed.
Then `scala-cli index.scala > index.html`

To format, `pnpm run format` and `scala-cli fmt`.

## Visual regression (pics.ts)

`pics.ts` takes screenshots of the page at 4 widths and compares them against
baselines in `pics/baseline/`. Any difference is written to `pics/diff/`.

```sh
pnpm pics                      # compare against baselines
pnpm pics --url http://localhost:8000   # point at a different URL
pnpm pics --new-baseline       # (re)create the baselines
```

Serve the site locally with Python's built-in server (matches the default
`http://localhost:8000` URL):

```sh
python3 -m http.server 8000
```

By default it launches its own (downloaded) Chrome. To reuse a Chrome instance
that is already running, start it with a remote debugging port and connect to it:

```sh
# Linux
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-profile &
# macOS
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-profile &
pnpm pics --port 9222
```

Notes:
- Modern Chrome ignores `--remote-debugging-port` on the default profile, so a
  separate `--user-data-dir` is required.
- Reusing one Chrome instance avoids relaunch overhead across runs; just make
  sure to close it (`kill %1`) when done.
- The screenshots load in the connected Chrome instance, so the `--url` must be
  reachable *from where Chrome runs*. When reusing a Chrome on another machine,
  serve the site there (e.g. `python3 -m http.server 8000`) rather than next to
  `pics.ts`.
- Chrome's debug endpoint rejects requests whose `Host` header is not an IP or
  `localhost` (DNS-rebinding protection, returns HTTP 500 "Host header is
  specified and is not an IP address or localhost"). When running `pics.ts` in
  a container/other host and connecting to a remote Chrome, forward the debug
  port to `localhost` (the forwarded `Host: localhost` header is then accepted),
  e.g. with a plain TCP proxy:

  ```sh
  socat TCP-LISTEN:9222,fork TCP:host.docker.internal:9222 &
  pnpm pics --port 9222
  ```

## Computed-style regression (bin/compare-styles.ts)

`pics.ts` (pixel diff) is noisy: it conflates genuine layout changes with
antialiasing/sub-pixel text rendering. `bin/compare-styles.ts` compares the
**computed CSS of every element** of two sites at several widths, and reports
exactly which element and which property diverged. It is environment-independent
and a better first gate for a migration/refactor; reach for it before pixel diffs.

```sh
pnpm styles <oldDir> <newDir>          # e.g. pnpm styles . v2/build
pnpm styles . v2/build --report 100
pnpm styles . v2/build --json /tmp/styles.json --fail   # non-zero exit on any diff
```

Options: `--port` (Chrome debug port, default 9222), `--origin` (URL used for
request interception, default `http://localhost:8000`), `--widths`
(`1440,1024,800,360`), `--report` (max elements printed), `--json`, `--fail`.

It needs a Chrome reachable on the debug port (same as `pics.ts --port`):

```sh
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-profile &
```

The two sites are served to Chrome via request interception, so no web server is
required. Elements are matched across the two documents by a graded tree
alignment (tag + id + non-scoped classes + `href`), since component frameworks
like Svelte insert wrapper elements and scoped class hashes. Note that some
computed differences are visually irrelevant (e.g. an equivalent
`linear-gradient` written with the colours reversed, or `border-top-color` on a
zero-width border reset by the `border-top: 0` shorthand) — check the actual
pixels before "fixing" them.

## Credits:

- Template: https://html5up.net/escape-velocity
- Icons: Font Awesome (fontawesome.io)

## License

Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
