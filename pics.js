import puppeteer from "puppeteer";
import { program } from "commander";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "fs";

// intentionally not taking close to media-queries division
// to avoid threshold effect
const widthObj = {
  xlarge: 1440, // desktop
  large: 1024, // ipad landscape, laptop
  medium: 800, // ipad portrait?
  small: 360, // smaller iphones
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const containsRed = (png) => {
  const { data } = png;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0) {
      return true;
    }
  }
  return false;
};
const differentScreenshots = (baseline, screenshot, name) => {
  const img1 = PNG.sync.read(fs.readFileSync(baseline));
  const img2 = PNG.sync.read(fs.readFileSync(screenshot));
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  try {
    pixelmatch(img1.data, img2.data, diff.data, width, height, {
      threshold: 0.1,
    });
    // check if diff contains pixel of difference, 255;0;0 by default
    const isDifferent = containsRed(diff);
    if (isDifferent) {
      fs.writeFileSync(`pics/diff/${name}.png`, PNG.sync.write(diff));
    }
    return isDifferent;
  } catch (e) {
    console.log(`Error comparing images, ${name}`, e);
    return true;
  }
};

// return true if changed
const takeScreenshot = async (url, page, widthName, width, forceBaseline) => {
  // fixed viewport height instead of taking full page picture because `pixelmatch`
  // need images to have the same dimensions, and modifying css often has an impact of length
  const viewportHeight = 7000; 
  await page.setViewport({ width: width, height: viewportHeight });
  await page.goto(url, { waitUntil: "networkidle0" });
  const screenshotName = `${widthName}.png`;
  const baseline = `pics/baseline/${screenshotName}`;
  const baselineExists = !forceBaseline && fs.existsSync(baseline);
  const path = baselineExists ? `pics/new/${screenshotName}` : baseline;
  await page.screenshot({
    path: path,
    // fullPage: true,
  });

  if (baselineExists) {
    const different = await differentScreenshots(baseline, path, widthName);
    if (different) {
      console.log(`The screenshot ${widthName} is different from the baseline`);
      return true
    }
  } else {
    console.log(`Baseline screenshot for ${widthName} created`);
  }
  return false
};

const makeDirs = () => {
  fs.mkdir("pics/new", { recursive: true }, () => {});
  fs.mkdir("pics/diff", { recursive: true }, () => {});
};

(async () => {
  // take argument from CLI, bool flag to know if new baseline
  console.log("#".repeat(80));

  program.option("--new-baseline", "Create new baseline screenshots");

  program.parse();

  const options = program.opts();
  const forceBaseline = options.newBaseline;
  // create new and diff dirs
  makeDirs();
  if (forceBaseline) {
    const callback = (e) => {
      console.log("Error emptying dirs", e);
    };
    fs.rm("pics/new/", { recursive: true }, callback);
    fs.rm("pics/diff/", { recursive: true }, callback);
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "http://localhost:8000"; // Replace with your target URL
  let changed = false;

  for (const [widthName, width] of Object.entries(widthObj)) {
    changed |= await takeScreenshot(url, page, widthName, width, forceBaseline);
  }
  await browser.close();
  if (!changed) {
    console.log("No visual change compared to baseline")
  }
})();
