const pool = require("../src/db/pool");

async function seed() {

  // attributes
  await pool.query(`
    INSERT INTO attributes (name, description) VALUES
    ('Agility','Coordination and reflexes'),
    ('Smarts','Intellect and perception'),
    ('Spirit','Willpower and courage'),
    ('Strength','Physical power'),
    ('Vigor','Endurance and toughness');
  `);

  // skills
  await pool.query(`
    INSERT INTO skills (name) VALUES
    ('Athletics'),
    ('Fighting'),
    ('Shooting'),
    ('Stealth'),
    ('Notice');
  `);

  // ancestry
  await pool.query(`
    INSERT INTO ancestries (name, description) VALUES
    ('Human','Versatile and adaptable');
  `);

  // abilities
  await pool.query(`
    INSERT INTO abilities (name, value, description) VALUES
    ('Adaptable','Free Edge','Humans gain a free Edge');
  `);

  // relation ancestry ability
  await pool.query(`
    INSERT INTO ancestry_abilities (ancestry_id, ability_id, quantity)
    VALUES (1,1,1);
  `);

  // gear base item
  await pool.query(`
    INSERT INTO gear (name, type, cost, weight)
    VALUES ('Longsword','melee_weapon',300,3);
  `);

  // melee weapon stats
  await pool.query(`
    INSERT INTO melee_weapons (gear_id, category, damage, min_str)
    VALUES (1,'sword',8,6);
  `);

  // shield
  await pool.query(`
    INSERT INTO gear (name, type, cost, weight)
    VALUES ('Medium Shield','shield',100,5);
  `);

  await pool.query(`
    INSERT INTO shields (gear_id, category, parry, cover, min_str)
    VALUES (2,'shield',1,2,4);
  `);

  console.log("Seed data inserted");
}

seed()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });