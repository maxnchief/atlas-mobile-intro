import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("scores.db");

// Create the table if it doesn't exist
export function setupScoresTable() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS wordle_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        score INTEGER NOT NULL
      );`,
    );
  });
}

export default db;
