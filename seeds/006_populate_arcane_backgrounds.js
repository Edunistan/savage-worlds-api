const pool = require("../src/db/pool");
const arcane_backgrounds = require("../data/arcane_backgrounds.json")

async function seed() {
  
  const values = arcane_backgrounds.map(a => [
    a.name,
    a.arcane_skill,
    a.starting_powers,
    a.power_points,
    a.description
  ]);

  const query = `
  INSERT INTO arcane_backgrounds (name, arcane_skill, starting_powers, power_points, description)
  VALUES ($1, $2, $3, $4, $5)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Arcane_backgrounds imported");
}

seed()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async err => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });