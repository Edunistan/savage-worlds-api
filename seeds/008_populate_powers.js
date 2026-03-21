const pool = require("../src/db/pool");
const powers = require("../data/powers.json");

async function seed() {
  try {
    await pool.query("BEGIN");

    const query = `
      INSERT INTO powers (
        name, rank, power_points, range, duration, trappings, description, summary
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    for (const p of powers) {
      const powerResult = await pool.query(query, [
        p.name,
        p.rank,
        p.power_points,
        p.range,
        p.duration,
        p.trappings,
        p.description,
        p.summary
      ]);

      const powerId = powerResult.rows[0].id;

      for (const modifierId of p.modifiers || []) {
        await pool.query(
          `INSERT INTO power_modifiers (power_id, modifier_id)
           VALUES ($1, $2)`,
          [powerId, modifierId]
        );
      }
    }

    await pool.query("COMMIT");
    console.log("Powers imported");

  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
  }
}

seed()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async err => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });