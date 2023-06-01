const express = require("express");
const getHeaders = require("./app");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/headers", async (req, res) => {
  const headers = await getHeaders();
  console.log(headers);

  const data = JSON.parse(headers);
  return res.status(200).json({ data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
