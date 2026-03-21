const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE ancestries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      image_url TEXT
    );
  `);

  console.log("ancestries table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
