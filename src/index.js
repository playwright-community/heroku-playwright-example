const express = require("express")
const { chromium } = require("playwright-chromium")
const { firefox } = require("playwright-firefox")
const { webkit } = require("playwright-webkit")

const app = express()
const port = process.env.PORT || 3000;

app.get("/browser/:name", async (req, res) => {
  const browserName = req.params["name"] || "chromium"
  if (!["chromium", "firefox", "webkit"].includes(browserName)) {
    return res.status(500).send(`invalid browser name (${browserName})!`)
  }
  const url = req.query.url || "https://microsoft.com"
  console.log(`Incoming request for browser '${browserName}' and URL '${url}'`)
  try {
    /** @type {import('playwright').Browser} */
    const browser = await { chromium, firefox, webkit }[browserName].launch(browserName === "chromium" ? {
      args: ['--no-sandbox']
    } : {})
    const page = await browser.newPage()
    await page.goto(url, {
      timeout: 10 * 1000
    })
    const data = await page.screenshot({
      type: "png"
    })
    await browser.close()
    res.contentType("image/png")
    res.set("Content-Disposition", "inline;");
    res.send(data)
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err}`)
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});