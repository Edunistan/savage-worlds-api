const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q, r, pp } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM powers 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR description ILIKE $1 OR summary ILIKE $1 OR trappings ILIKE $1)
           AND ($2::text IS NULL OR rank ILIKE $2)
           AND ($3::text IS NULL or power_points ILIKE $3)
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          r? `%${r}%` : null,
          pp ? `%${pp}%` : null
        ]
      );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/backgrounds", async (req, res) => {
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM arcane_backgrounds ORDER BY id`,
      );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/backgrounds/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM arcane_backgrounds WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Arcane background not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM powers WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Power not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;