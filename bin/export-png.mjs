// Rasterises the print faces (print/*.svg) to flattened PNGs at print DPI.
//
//   node bin/export-png.mjs [dpi]     # default 600
//
// Fonts: @resvg/resvg-js cannot read woff2, so the (subset) Source Sans Pro
// TTFs in assets/fonts/ are passed explicitly. The SVGs themselves also embed
// the fonts for other renderers.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { Resvg } from "@resvg/resvg-js";

const root = process.cwd();
const DPI = parseInt(process.argv[2] || "600", 10);
const CARD_MM = { w: 88, h: 58 };

// Insert a pHYs chunk (physical pixel density) so the PNG declares its DPI.
function withDpi(png, dpi) {
  const ppm = Math.round(dpi / 0.0254); // pixels per metre
  const data = Buffer.alloc(9);
  data.writeUInt32BE(ppm, 0);
  data.writeUInt32BE(ppm, 4);
  data.writeUInt8(1, 8); // unit = metre
  const body = Buffer.concat([Buffer.from("pHYs"), data]);
  const chunk = Buffer.alloc(4 + body.length + 4);
  chunk.writeUInt32BE(data.length, 0);
  body.copy(chunk, 4);
  chunk.writeUInt32BE(zlib.crc32(body) >>> 0, 4 + body.length);
  const ihdrEnd = 8 + 4 + 4 + 13 + 4; // signature + IHDR chunk
  return Buffer.concat([png.subarray(0, ihdrEnd), chunk, png.subarray(ihdrEnd)]);
}

const fontFiles = ["400-latin", "400-italic-latin", "700-latin", "900-latin"].map((n) =>
  path.join(root, "assets/fonts", `source-sans-pro-${n}.ttf`),
);

const widthPx = Math.round((CARD_MM.w / 25.4) * DPI); // 1039 px @ 300 dpi

for (const face of ["recto", "verso"]) {
  const svg = fs.readFileSync(path.join(root, "print", `carte-visite-${face}.svg`));
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: widthPx },
    font: { loadSystemFonts: false, fontFiles },
  });
  const rendered = resvg.render();
  const out = path.join(root, "print", `carte-visite-${face}.png`);
  fs.writeFileSync(out, withDpi(rendered.asPng(), DPI));
  console.log(`wrote print/carte-visite-${face}.png (${rendered.width}×${rendered.height} px @ ${DPI} dpi)`);
}
