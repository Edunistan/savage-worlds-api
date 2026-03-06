const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE arcane_backgrounds (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      starting_powers INTEGER,
      power_points INTEGER
    );
  `);

  console.log("arcane_backgrounds table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });