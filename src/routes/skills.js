const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q, l, core } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM skills 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR description ILIKE $1 OR summary ILIKE $1)
           AND ($2::text IS NULL OR linked_attribute ILIKE $2)
           AND ($3::boolean IS NULL OR is_core = $3::boolean)
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          l ? `%${l}%` : null,
          core ? core : null
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
    const result = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;