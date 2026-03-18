const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      summary TEXT,
      linked_attribute VARCHAR(100),
      is_core BOOLEAN
    );
  `);

  console.log("skills table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });