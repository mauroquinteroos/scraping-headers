const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getHeaders() {
  puppeteer.use(stealthPlugin());

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://www.httpbin.org/headers");
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("pre");

    const content = await page.$eval("pre", (el) => el.textContent);
    console.log("content:", content);

    return content;
  } catch (error) {
    console.error(error);
    return `Something went wrong while running Puppeteer: ${e}`;
  } finally {
    await browser.close();
  }
}

module.exports = getHeaders;
