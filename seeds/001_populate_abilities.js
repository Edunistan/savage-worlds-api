const pool = require("../src/db/pool");

async function seed() {

    await pool.query(`
        INSERT INTO abilities (name, value, description, max_quantity) VALUES
        ('Adaptable', '2',
        'The race has great variation among its people and cultures. Characters start with a free Novice Edge of their choice (and must meet all the Edge''s Requirements).',
        1),

        ('Aditional Action', '3',
        'The being has additional appendages, enhanced reflexes, or exceptional eye-hand coordination. He may ignore 2 points of Multi-Action penalties each turn.',
        1),

        ('Aquatic/Semi-Aquatic', '1/2',
        'For one point the character is semi-aquatic and can hold his breath for 15 minutes before checking for drowning. For two, he''s native to the water. He cannot drown in oxygenated liquid and moves his full Pace when swimming.',
        1);
    `)

}

seed()
  .then(async () => {
    await pool.end();
    process.exit();
  })
  .catch(async err => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });