import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("app.db");

export function initScoresTable() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        steps INTEGER NOT NULL,
        date INTEGER NOT NULL
      );`,
    );
  });
}

export function getScores(callback: (rows: any[]) => void) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM scores ORDER BY date DESC;",
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => {
        console.error(error);
        return false;
      },
    );
  });
}

export function insertScore(
  steps: number,
  date: number,
  callback?: () => void,
) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO scores (steps, date) VALUES (?, ?);",
      [steps, date],
      () => callback && callback(),
      (_, error) => {
        console.error(error);
        return false;
      },
    );
  });
}
