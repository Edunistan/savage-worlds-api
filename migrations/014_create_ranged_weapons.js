const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE ranged_weapons (
      id SERIAL PRIMARY KEY,
      gear_id INTEGER REFERENCES gear(id) ON DELETE CASCADE,
      category VARCHAR(100),
      damage INTEGER,
      min_str INTEGER,
      range VARCHAR(100),
      ap INTEGER,
      rof INTEGER,
      shots INTEGER
    );
  `);

  console.log("ranged_weapons table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });