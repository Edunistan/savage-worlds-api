require("dotenv").config();

const express = require("express");
const pool = require("./db/pool");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Savage Worlds API running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
