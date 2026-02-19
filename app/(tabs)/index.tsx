import { useSetupScoresTable } from "@/hooks/db";
import { useScores } from "@/hooks/usescores";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  useSetupScoresTable();
  const { getScores } = useScores();
  const router = useRouter();
  const [scores, setScores] = React.useState([]);

  // Refresh scores when screen is focused (e.g., after returning from add-activity)
  useFocusEffect(
    React.useCallback(() => {
      setScores(getScores());
    }, [getScores]),
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Wordle Scores
      </Text>
      {scores.length === 0 ? (
        <Text style={{ marginBottom: 16 }}>No scores yet.</Text>
      ) : (
        scores.map((score: any) => (
          <View
            key={score.id}
            style={{ marginBottom: 8, alignItems: "center" }}
          >
            <Text>Date: {score.date}</Text>
            <Text>Score: {score.score}</Text>
          </View>
        ))
      )}
      <Button
        title="Add activity"
        onPress={() => router.push("/add-activity")}
      />
    </View>
  );
}
