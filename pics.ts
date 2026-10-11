// run with `pnpm pics [--new-baseline] [--url URL]`

import puppeteer, { Page } from "puppeteer";
import readline from "readline";
import { program } from "commander";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "fs";

// intentionally not taking close to media-queries division
// to avoid threshold effect
const widthObj: Record<string, number> = {
  xlarge: 1440, // desktop
  large: 1024, // ipad landscape, laptop
  medium: 800, // ipad portrait?
  small: 360, // smaller iphones
};

function delay(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const differentScreenshots = (
  baseline: string,
  screenshot: string,
  name: string,
): boolean => {
  const img1 = PNG.sync.read(fs.readFileSync(baseline));
  const img2 = PNG.sync.read(fs.readFileSync(screenshot));
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  try {
    const mismatchCount = pixelmatch(img1.data, img2.data, diff.data, width, height, {
      threshold: 0.1,
    });
    // pixelmatch returns the number of mismatched pixels; 0 means identical
    const isDifferent = mismatchCount > 0;
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
const takeScreenshot = async (
  url: string,
  page: Page,
  widthName: string,
  width: number,
  forceBaseline: boolean,
): Promise<boolean> => {
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
      return true;
    }
  } else {
    console.log(`Baseline screenshot for ${widthName} created`);
  }
  return false;
};

// https://stackoverflow.com/a/50890409/20374403
function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

const makeDirs = (): void => {
  fs.mkdir("pics/new", { recursive: true }, () => {});
  fs.mkdir("pics/diff", { recursive: true }, () => {});
};

(async () => {
  // take argument from CLI, bool flag to know if new baseline
  console.log("#".repeat(80));

  program.option("--new-baseline", "Create new baseline screenshots");
  program.option(
    "-u, --url <url>",
    "URL to screenshot",
    "http://localhost:8000",
  );
  program.option(
    "-p, --port <port>",
    "Connect to an already-running Chrome debug port instead of launching one",
    parseInt,
  );

  program.parse();

  const options = program.opts<{
    newBaseline?: boolean;
    url: string;
    port?: number;
  }>();
  const forceBaseline = options.newBaseline ?? false;
  const url = options.url;
  // ask to confirm via input yes
  if (forceBaseline) {
    const answer = await askQuestion(
      "Confirm you want to override baseline screenshots? (yes/no) ",
    );
    if (answer !== "yes" && answer !== "y") {
      console.log("Exiting");
      process.exit(0);
    }
  }
  // create new and diff dirs
  makeDirs();
  if (forceBaseline) {
    const callback = (e: unknown) => {
      console.log("Error emptying dirs", e);
    };
    fs.rm("pics/new/", { recursive: true }, callback);
    fs.rm("pics/diff/", { recursive: true }, callback);
  }
  const browser = options.port
    ? await puppeteer.connect({ browserURL: `http://localhost:${options.port}` })
    : await puppeteer.launch();
  const page = await browser.newPage();

  let changed = false;

  for (const [widthName, width] of Object.entries(widthObj)) {
    changed = (await takeScreenshot(url, page, widthName, width, forceBaseline)) || changed;
  }
  if (options.port) {
    await browser.disconnect();
  } else {
    await browser.close();
  }
  if (!changed && !forceBaseline) {
    console.log("No visual change compared to baseline");
  }
})().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
