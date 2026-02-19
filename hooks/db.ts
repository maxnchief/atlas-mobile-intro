import { useSQLiteContext } from "expo-sqlite";
import React from "react";

// Hook to setup the table if it doesn't exist
export function useSetupScoresTable() {
  const db = useSQLiteContext();
  React.useEffect(() => {
    if (!db) return;
    db.withTransactionAsync(async () => {
      // Drop the table if it exists (safe since no data)
      await db.execAsync("DROP TABLE IF EXISTS wordle_scores;");
      // Recreate table with date nullable and grid for emoji lines (as NVARCHAR for emoji support)
      await db.execAsync(`CREATE TABLE wordle_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        score INTEGER NOT NULL,
        grid NVARCHAR
      );`);
    });
  }, [db]);
  return db;
}
