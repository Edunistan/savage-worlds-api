const pool = require("../src/db/pool");
const hindrances = require("../data/hindrances.json")

async function seed() {
  
  const values = hindrances.map(h => [
    h.name,
    h.type,
    h.description,
    h.summary
  ]);

  const query = `
  INSERT INTO hindrances (name, type, description, summary)
  VALUES ($1, $2, $3, $4)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Hindrances imported");
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