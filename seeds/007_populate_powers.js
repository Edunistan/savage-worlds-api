const pool = require("../src/db/pool");
const powers = require("../data/powers.json")

async function seed() {
  
  const values = powers.map(p => [
    p.name,
    p.rank,
    p.power_points,
    p.range,
    p.duration,
    p.trappings,
    p.description,
    p.summary
  ]);

  const query = `
  INSERT INTO powers (name, rank, power_points, range, duration, trappings, description, summary)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Powers imported");
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