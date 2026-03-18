const pool = require("../src/db/pool");

async function up() {
  await pool.query(`
    CREATE TABLE power_modifiers (
      power_id INTEGER REFERENCES powers(id) ON DELETE CASCADE,
      modifier_id INTEGER REFERENCES modifiers(id) ON DELETE CASCADE,
      PRIMARY KEY (power_id, modifier_id)
    );
  `);

  console.log("power_modifiers table created");
}

up()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });