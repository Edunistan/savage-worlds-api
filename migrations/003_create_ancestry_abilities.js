const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE ancestry_abilities (
      ancestry_id INTEGER REFERENCES ancestries(id) ON DELETE CASCADE,
      ability_id INTEGER REFERENCES abilities(id) ON DELETE CASCADE,
      quantity INTEGER DEFAULT 1,

      PRIMARY KEY (ancestry_id, ability_id)
    );
  `);

  console.log("ancestry_abilities table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
