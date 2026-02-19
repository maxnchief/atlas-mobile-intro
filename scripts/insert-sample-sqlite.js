// insert-sample-sqlite.js
// Script to insert sample data into the wordle_scores table in scores.db using sqlite3 (Node.js)

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./assets/scores.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS wordle_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, score INTEGER NOT NULL)",
  );
  db.run("INSERT INTO wordle_scores (date, score) VALUES (?, ?)", [
    "2026-02-15",
    4,
  ]);
  db.run("INSERT INTO wordle_scores (date, score) VALUES (?, ?)", [
    "2026-02-14",
    5,
  ]);
  db.run("INSERT INTO wordle_scores (date, score) VALUES (?, ?)", [
    "2026-02-13",
    3,
  ]);
  console.log("Sample data inserted successfully.");
});

db.close();
