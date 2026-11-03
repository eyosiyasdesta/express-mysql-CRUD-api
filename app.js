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
// GET all
app.get("/students", (req, res) => {
  pool.query("SELECT * FROM students", (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(rows);
  });
});

// GET one by id
app.get("/students/:id", (req, res) => {
  pool.query(
    "SELECT *FROM students WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json([rows[0]]);
    },
  );
});
// Insert data with POST
app.post("/students", (req, res) => {
  const { name, email } = req.body; //accepting the data from the user and  decomposing it to name and email

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  } //Checking require fields

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
