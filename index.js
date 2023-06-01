const dotenv = require("dotenv");
const express = require("express");
const getHeaders = require("./app");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Puppeteer server is up and running!");
});

app.get("/api/scrape", async (req, res) => {
  const headers = await getHeaders();

  const data = JSON.parse(headers);
  return res.status(200).json({ data });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
