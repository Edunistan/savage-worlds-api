const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ancestries ORDER BY id");
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    const result = await pool.query(
      "SELECT * FROM ancestries WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id",
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM ancestries WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ancestry not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;