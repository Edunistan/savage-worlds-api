const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  const { q, t, max_c, max_w } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM gear 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR notes ILIKE $1)
           AND ($2::text IS NULL OR type ILIKE $2)
           AND ($3::text IS NULL OR cost <= $3::integer)
           AND ($4::text IS NULL OR weight <= $4::integer)
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          t ? `%${t}%` : null,
          max_c ? max_c : null,
          max_w ? max_w : null
        ]
      );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/common", async (req, res) => {
  const { q, max_c, max_w } = req.query;
  let result;

  try {
      result = await pool.query(
        `SELECT * FROM gear 
         WHERE 
           ($1::text IS NULL OR name ILIKE $1 OR notes ILIKE $1)
           AND ($2::text IS NULL OR cost <= $2::integer)
           AND ($3::text IS NULL OR weight <= $3::integer)
           AND (type!='Shield' AND type!='Armor' AND type!='Melee weapon' AND type!='Ranged weapon')
         ORDER BY id`,
        [
          q ? `%${q}%` : null,
          max_c ? max_c : null,
          max_w ? max_w : null
        ]
      );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/shields", async (req, res) => {
  const { q, max_c, max_w, max_s } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
        g.*, 
        s.*
      FROM gear g
      LEFT JOIN shields s ON s.gear_id = g.id
      WHERE 
        g.type = 'Shield'
        AND ($1::text IS NULL OR g.name ILIKE $1 OR g.notes ILIKE $1 OR category ILIKE $1)
        AND ($2::text IS NULL OR g.cost <= $2::integer)
        AND ($3::text IS NULL OR g.weight <= $3::integer)
        AND ($4::text IS NULL OR min_str <= $4::integer)
      ORDER BY g.id`,
      [
        q ? `%${q}%` : null,
        max_c ? max_c : null,
        max_w ? max_w : null,
        max_s ? max_s : null
      ]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/armors", async (req, res) => {
  const { q, max_c, max_w, max_s } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
        g.*, 
        s.*
      FROM gear g
      LEFT JOIN armors s ON s.gear_id = g.id
      WHERE 
        g.type = 'Armor'
        AND ($1::text IS NULL OR g.name ILIKE $1 OR g.notes ILIKE $1 OR category ILIKE $1 OR subcategory ILIKE $1)
        AND ($2::text IS NULL OR g.cost <= $2::integer)
        AND ($3::text IS NULL OR g.weight <= $3::integer)
        AND ($4::text IS NULL OR min_str <= $4::integer)
      ORDER BY g.id`,
      [
        q ? `%${q}%` : null,
        max_c ? max_c : null,
        max_w ? max_w : null,
        max_s ? max_s : null
      ]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/melee_weapons", async (req, res) => {
  const { q, max_c, max_w, max_s, dmg } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
        g.*, 
        s.*
      FROM gear g
      LEFT JOIN melee_weapons s ON s.gear_id = g.id
      WHERE 
        g.type = 'Melee weapon'
        AND ($1::text IS NULL OR g.name ILIKE $1 OR g.notes ILIKE $1 OR category ILIKE $1)
        AND ($2::text IS NULL OR g.cost <= $2::integer)
        AND ($3::text IS NULL OR g.weight <= $3::integer)
        AND ($4::text IS NULL OR min_str <= $4::integer)
        AND ($5::text IS NULL OR damage ILIKE $5)
      ORDER BY g.id`,
      [
        q ? `%${q}%` : null,
        max_c ? max_c : null,
        max_w ? max_w : null,
        max_s ? max_s : null,
        dmg ? `%${dmg}%` : null
      ]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/ranged_weapons", async (req, res) => {
  const { q, max_c, max_w, max_s, dmg } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
        g.*, 
        s.*
      FROM gear g
      LEFT JOIN ranged_weapons s ON s.gear_id = g.id
      WHERE 
        g.type = 'Ranged weapon'
        AND ($1::text IS NULL OR g.name ILIKE $1 OR g.notes ILIKE $1 OR category ILIKE $1 OR subcategory ILIKE $1)
        AND ($2::text IS NULL OR g.cost <= $2::integer)
        AND ($3::text IS NULL OR g.weight <= $3::integer)
        AND ($4::text IS NULL OR min_str <= $4::integer)
        AND ($5::text IS NULL OR damage ILIKE $5)
      ORDER BY g.id`,
      [
        q ? `%${q}%` : null,
        max_c ? max_c : null,
        max_w ? max_w : null,
        max_s ? max_s : null,
        dmg ? `%${dmg}%` : null
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
    const item = await pool.query("SELECT * FROM gear WHERE id = $1", [id]);
    
    if (item.rows.length === 0) {
      return res.status(404).json({ error: "Gear not found" });
    }

    let stats;

    if (item.rows[0].type == "Shield") {
      stats = await pool.query("SELECT * FROM shields WHERE gear_id = $1", [id]);
    } else if (item.rows[0].type == "Armor") {
      stats = await pool.query("SELECT * FROM armors WHERE gear_id = $1", [id]);
    } else if (item.rows[0].type == "Melee weapon") {
      stats = await pool.query("SELECT * FROM melee_weapons WHERE gear_id = $1", [id]);
    } else if (item.rows[0].type == "Ranged weapon") {
      stats = await pool.query("SELECT * FROM ranged_weapons WHERE gear_id = $1", [id]);
    } else {stats = {}}

    res.json({
      item: item.rows[0],
      stats: stats.rows
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;