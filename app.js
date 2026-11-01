require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("App is running");
});
app.post("/students", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  pool.query(
    "INSERT INTO students (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.error(err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.status(201).json({ id: result.insertId, name, email });
    },
  );
});
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Server is running on PORT", process.env.PORT);
  }
});
