const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q, v, max } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM abilities 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR description ILIKE $1)
           AND ($2::text IS NULL OR value ILIKE $2)
           AND ($3::text IS NULL OR max_quantity = $3::integer)
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          v ? `%${v}%` : null,
          max ? max : null
        ]
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