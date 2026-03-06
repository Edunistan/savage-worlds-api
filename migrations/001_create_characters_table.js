require("dotenv").config();
const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS characters (
      id SERIAL PRIMARY KEY,

      name TEXT NOT NULL,
      ancestry_id INTEGER,

      bennies INTEGER DEFAULT 3,

      size INTEGER DEFAULT 0,
      wild_die INTEGER DEFAULT 6,

      wounds_level INTEGER DEFAULT 0,
      fatigue_level INTEGER DEFAULT 0,

      power_points INTEGER DEFAULT 0,

      rank CHAR(1) CHECK (rank IN ('n','s','v','h','l')) DEFAULT 'n',

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("characters table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
