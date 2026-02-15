import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type Score = {
  id: number;
  score: number;
  date: string;
};

export function useScores() {
  const [wordle_scores, setScores] = useState([]);

  const db = useSQLiteContext();

  function getScores() {
    return db.getAllSync<Score>("SELECT * FROM wordle_scores");
  }

  useEffect(() => {
    const data = getScores();
  }, []);

  return { getScores, wordle_scores };
}
