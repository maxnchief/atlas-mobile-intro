import db from "@/hooks/db";

export function insertSampleScore() {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO wordle_scores (date, score) VALUES (?, ?)",
      [new Date().toISOString().slice(0, 10), 4],
      (_, result) => {
        console.log("Inserted sample score:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting sample score:", error);
        return false;
      },
    );
  });
}
