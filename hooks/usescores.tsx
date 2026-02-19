import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type Score = {
  id: number;
  score: number;
  date: string;
};

export function useScores() {
  const [wordle_scores, setScores] = useState<Score[]>([]);
  const db = useSQLiteContext();

  function getScores() {
    const data = db.getAllSync<Score>("SELECT * FROM wordle_scores");
    setScores(data);
    return data;
  }

  useEffect(() => {
    getScores();
    // Optionally, add a subscription/event for table changes if available
  }, [db]);

  return { getScores, wordle_scores };
}
