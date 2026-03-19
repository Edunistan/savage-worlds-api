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
           AND ($3::text IS NULL OR power_points ILIKE $3)
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


router.get("/modifiers", async (req, res) => {
  const { q } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM modifiers
        WHERE
          (is_generic = true)
          AND ($1::text IS NULL OR name ILIKE $1 OR description ILIKE $1)
        ORDER BY id`,
          [
            q ? `%${q}%` : null
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
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.rank,
        p.power_points,
        p.range,
        p.duration,
        p.trappings,
        p.description,
        p.summary,
        m.id AS modifier_id,
        m.name AS modifier_name,
        m.cost AS modifier_cost,
        m.description AS modifier_description
      FROM powers p
      LEFT JOIN power_modifiers pm ON pm.power_id = p.id
      LEFT JOIN modifiers m ON m.id = pm.modifier_id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Power not found" });
    }

    const power = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      rank: result.rows[0].rank,
      power_points: result.rows[0].power_points,
      range: result.rows[0].range,
      duration: result.rows[0].duration,
      trappings: result.rows[0].trappings,
      description: result.rows[0].description,
      summary: result.rows[0].summary
    };

    const modifiers = Array.from(
      new Map(
        result.rows
          .filter(row => row.modifier_id !== null)
          .map(row => [
            row.modifier_id,
            {
              id: row.modifier_id,
              name: row.modifier_name,
              cost: row.modifier_cost,
              description: row.modifier_description
            }
          ])
      ).values()
    );

    res.json({
      power,
      modifiers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;