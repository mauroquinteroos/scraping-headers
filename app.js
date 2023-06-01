const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getHeaders() {
  puppeteer.use(stealthPlugin());

  try {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.goto("https://www.httpbin.org/headers");
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("pre");

    const content = await page.$eval("pre", (el) => el.textContent);
    console.log("headers:", headers);

    return content;
  } catch (error) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
}

module.exports = getHeaders;
