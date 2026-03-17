const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q } = req.query;
  let result;

  try {
    if (!q) {result = await pool.query("SELECT * FROM ancestries ORDER BY id");}

    else {result = await pool.query(
      "SELECT * FROM ancestries WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id",
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
    const ancestry = await pool.query("SELECT * FROM ancestries WHERE id = $1", [id]);
    const abilities = await pool.query("SELECT * FROM ancestral_abilities WHERE ancestry_id = $1", [id]);
    
    if (ancestry.rows.length === 0) {
      return res.status(404).json({ error: "Ancestry not found" });
    }

    res.json({
      ancestry: ancestry.rows[0],
      abilities: abilities.rows
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;