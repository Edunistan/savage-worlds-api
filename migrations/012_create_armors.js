const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE armors (
      id SERIAL PRIMARY KEY,
      gear_id INTEGER REFERENCES gear(id) ON DELETE CASCADE,
      category VARCHAR(100),
      armor INTEGER,
      min_str INTEGER
    );
  `);

  console.log("armors table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });