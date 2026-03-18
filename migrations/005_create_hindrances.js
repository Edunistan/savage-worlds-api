const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE hindrances (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      type VARCHAR(20),
      description TEXT,
      summary TEXT
    );
  `);

  console.log("hindrances table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });