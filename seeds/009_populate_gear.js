const pool = require("../src/db/pool");

const gear = require("../data/gear.json");
const shields = require("../data/shields.json");
const armors = require("../data/armors.json");
const meleeWeapons = require("../data/melee_weapons.json");
const rangedWeapons = require("../data/ranged_weapons.json");

async function seed() {

  await pool.query("BEGIN");

  // GEAR GENERICO
  for (const g of gear) {

    await pool.query(
      `INSERT INTO gear (name, type, cost, weight, notes)
       VALUES ($1,$2,$3,$4,$5)`,
      [g.name, g.type, g.cost, g.weight, g.notes]
    );

  }

  // SHIELDS
  for (const s of shields) {

    const result = await pool.query(
      `INSERT INTO gear (name, type, cost, weight, notes)
       VALUES ($1,'Shield',$2,$3,$4)
       RETURNING id`,
      [s.name, s.cost, s.weight, s.notes]
    );

    const gearId = result.rows[0].id;

    await pool.query(
      `INSERT INTO shields (gear_id, category, parry, cover, min_str)
       VALUES ($1,$2,$3,$4,$5)`,
      [gearId, s.category, s.parry, s.cover, s.min_str]
    );

  }

  // ARMORS
  for (const a of armors) {

    const result = await pool.query(
      `INSERT INTO gear (name, type, cost, weight, notes)
       VALUES ($1,'Armor',$2,$3,$4)
       RETURNING id`,
      [a.name, a.cost, a.weight, a.notes]
    );

    const gearId = result.rows[0].id;

    await pool.query(
      `INSERT INTO armors (gear_id, category, subcategory, armor, min_str)
       VALUES ($1,$2,$3,$4,$5)`,
      [gearId, a.category, a.subcategory, a.armor, a.min_str]
    );

  }

  // MELEE WEAPONS
  for (const w of meleeWeapons) {

    const result = await pool.query(
      `INSERT INTO gear (name, type, cost, weight, notes)
       VALUES ($1,'Melee weapon',$2,$3,$4)
       RETURNING id`,
      [w.name, w.cost, w.weight, w.notes]
    );

    const gearId = result.rows[0].id;

    await pool.query(
      `INSERT INTO melee_weapons (gear_id, category, damage, min_str)
       VALUES ($1,$2,$3,$4)`,
      [gearId, w.category, w.damage, w.min_str]
    );

  }

  // RANGED WEAPONS
  for (const w of rangedWeapons) {

    const result = await pool.query(
      `INSERT INTO gear (name, type, cost, weight, notes)
       VALUES ($1,'Ranged weapon',$2,$3,$4)
       RETURNING id`,
      [w.name, w.cost, w.weight, w.notes]
    );

    const gearId = result.rows[0].id;

    await pool.query(
      `INSERT INTO ranged_weapons (gear_id, category, subcategory, range, damage, ap, rof, shots, min_str)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [gearId, w.category, w.subcategory, w.range, w.damage, w.ap, w.rof, w.shots, w.min_str]
    );

  }

  await pool.query("COMMIT");

  console.log("All gear imported");
}

seed()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async err => {
    await pool.query("ROLLBACK");
    console.error(err);
    await pool.end();
    process.exit(1);
  });