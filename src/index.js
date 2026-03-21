require("dotenv").config();

const express = require("express");
const pool = require("./db/pool");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Savage Worlds API running");
});

app.use('/abilities', require('./routes/abilities'));
app.use('/ancestries', require('./routes/ancestries'));
app.use('/edges', require('./routes/edges'));
app.use('/gear', require('./routes/gear'));
app.use('/hindrances', require('./routes/hindrances'));
app.use('/powers', require('./routes/powers'));
app.use('/skills', require('./routes/skills'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
