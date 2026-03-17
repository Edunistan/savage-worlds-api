const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q, r } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM edges 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR description ILIKE $1 OR summary ILIKE $1)
           AND ($2::text IS NULL OR requirements ILIKE $2)
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          r ? `%${r}%` : null
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
    const result = await pool.query("SELECT * FROM edges WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Edge not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;