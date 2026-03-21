const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE powers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      rank CHAR(1),
      power_points VARCHAR(100),
      range VARCHAR(100),
      duration VARCHAR(100),
      trappings VARCHAR(100),
      description TEXT,
      summary TEXT
    );
  `);

  console.log("powers table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });