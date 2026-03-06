const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Savage Worlds API funcionando");
});

app.get("/characters", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM characters");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

app.post("/characters", async (req, res) => {
  try {
    const {
      name,
      ancestry_id,
      bennies,
      size,
      wild_die,
      wounds_level,
      fatigue_level,
      power_points,
      rank
    } = req.body;

    const result = await pool.query(
      `INSERT INTO characters
      (name, ancestry_id, bennies, size, wild_die, wounds_level, fatigue_level, power_points, rank)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        name,
        ancestry_id,
        bennies,
        size,
        wild_die,
        wounds_level,
        fatigue_level,
        power_points,
        rank
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando personaje" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
