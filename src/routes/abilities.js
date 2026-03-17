const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q } = req.query;
  let result;

  try {
    if (!q) {result = await pool.query("SELECT * FROM abilities ORDER BY id");}

    else {result = await pool.query(
      "SELECT * FROM abilities WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id",
      [`%${q}%`]
    );}

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM abilities WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ability not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;