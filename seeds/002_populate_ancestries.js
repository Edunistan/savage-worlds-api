const pool = require("../src/db/pool");
const ancestries = require("../data/ancestries.json")

async function seed() {
    await pool.query("BEGIN");

    for (const ancestry of ancestries) {

        const ancestryResult = await pool.query(
            `INSERT INTO ancestries (name, description)
            VALUES ($1, $2)
            RETURNING id`,
            [ancestry.name, ancestry.description]
        );

        const ancestryId = ancestryResult.rows[0].id;

        for (const abilityText of ancestry.abilities) {

            const parts = abilityText.split(":");
            const name = parts[0].trim();
            const description = parts.slice(1).join(":").trim();

            const abilityResult = await pool.query(
                `INSERT INTO ancestral_abilities (ancestry_id, name, description)
                VALUES ($1, $2, $3)
                RETURNING id`,
                [ancestryId, name, description]
            );
        }
    }

    await pool.query("COMMIT");
    
    console.log("Ancestries imported");
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