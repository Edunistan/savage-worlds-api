const pool = require("../src/db/pool");
const abilities = require("../data/abilities.json")

async function seed() {
  
  const values = abilities.map(a => [
    a.name,
    a.value,
    a.description,
    a.max_quantity
  ]);

  const query = `
  INSERT INTO abilities (name, value, description, max_quantity)
  VALUES ($1, $2, $3, $4)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Abilities imported");
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