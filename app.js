const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getHeaders() {
  puppeteer.use(stealthPlugin());
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.goto("https://www.httpbin.org/headers");

  await page.waitForSelector("pre");

  const content = await page.$eval("pre", (el) => el.textContent);
  await browser.close();

  return content;
}

module.exports = getHeaders;
