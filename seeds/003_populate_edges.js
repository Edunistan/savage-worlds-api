const pool = require("../src/db/pool");
const edges = require("../data/edges.json")

async function seed() {
  
  const values = edges.map(e => [
    e.name,
    e.category,
    e.requirements,
    e.description,
    e.summary
  ]);

  const query = `
  INSERT INTO edges (name, category, requirements, description, summary)
  VALUES ($1, $2, $3, $4, $5)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Edges imported");
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