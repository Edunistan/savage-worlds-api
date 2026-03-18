const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE modifiers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      cost VARCHAR(10),
      description TEXT
    );
  `);

  console.log("modifiers table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });