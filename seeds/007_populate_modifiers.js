const pool = require("../src/db/pool");
const modifiers = require("../data/modifiers.json")

async function seed() {
  
  const values = modifiers.map(m => [
    m.name,
    m.cost,
    m.description
  ]);

  const query = `
  INSERT INTO modifiers (name, cost, description)
  VALUES ($1, $2, $3)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Modifiers imported");
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