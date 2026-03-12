const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE attributes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      summary TEXT
    );
  `);

  console.log("attributes table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });