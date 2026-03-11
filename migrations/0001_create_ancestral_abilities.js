const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE ancestral_abilities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
    );
  `);

  console.log("ancestral_abilities table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
