const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE abilities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      value TEXT,
      description TEXT,
      max_quantity INTEGER
    );
  `);

  console.log("abilities table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
