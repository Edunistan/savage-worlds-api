const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE gear (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      type VARCHAR(100),
      cost INTEGER,
      weight FLOAT,
      notes TEXT
    );
  `);

  console.log("gear table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });