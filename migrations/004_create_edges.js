const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE edges (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(100),
      requirements VARCHAR(100),
      description TEXT,
      summary TEXT
    );
  `);

  console.log("edges table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
