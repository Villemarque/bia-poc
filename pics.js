import puppeteer from 'puppeteer';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';


const widthObj = {
    xlarge: 1680,
    large: 1280,
    medium: 980,
    small: 360 // smaller iphones
}

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

const containsRed = (png) => {
    const {data} = png;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0) {
            return true;
        }
    }
    return false;

}
const differentScreenshots = (baseline, screenshot, name) => {
    const img1 = PNG.sync.read(fs.readFileSync(baseline));
    const img2 = PNG.sync.read(fs.readFileSync(screenshot));
    const {width, height} = img1;
    const diff = new PNG({width, height});
    pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

    // check if diff contains pixel of difference, 255;0;0 by default
    const isDifferent = containsRed(diff);
    if (isDifferent) {
        fs.writeFileSync(`pics/diff/${name}.png`, PNG.sync.write(diff));
    }
    return isDifferent
}

const takeScreenshot = async (url, page, widthName, width) => {
    const viewportHeight = 800; // You can set a default height, it won't affect the full-page screenshot
    await page.setViewport({ width: width, height: viewportHeight });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await delay(400);
    const screenshotName = `${widthName}.png`;
    const baseline =  `pics/baseline/${screenshotName}`;
    const baselineExists = fs.existsSync(baseline);
    const path = baselineExists ? `pics/new/${screenshotName}` : baseline;
    await page.screenshot({
        path: path,
        fullPage: true
    })
    
    if (baselineExists) {
        const different = await differentScreenshots(baseline, path, widthName);
        if (different) {
            console.log(`The screenshot ${widthName} is different from the baseline`);
        }
    } else {
        console.log(`Baseline screenshot for ${widthName} created`);
    }
}

(async () => {
    console.log("#".repeat(80))
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = 'http://localhost:8000'; // Replace with your target URL
    
    for (const [widthName, width] of Object.entries(widthObj)) {
        await takeScreenshot(url, page, widthName, width)
    }

    await browser.close();
})();