const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "576755",
  host: "localhost",
  port: 5432,
  database: "savage_worlds"
});

module.exports = pool;
