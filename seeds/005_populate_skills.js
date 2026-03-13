const pool = require("../src/db/pool");
const skills = require("../data/skills.json")

async function seed() {
  
  const values = skills.map(s => [
    s.name,
    s.linked_attribute,
    s.description,
    s.summary,
    s.is_core
  ]);

  const query = `
  INSERT INTO skills (name, linked_attribute, description, summary, is_core)
  VALUES ($1, $2, $3, $4, $5)
  `;

  for (const v of values) {
    await pool.query(query, v);
  }

  console.log("Skills imported");
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