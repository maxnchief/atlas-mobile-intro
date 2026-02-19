import { useSetupScoresTable } from "@/hooks/db";
import { useScores } from "@/hooks/usescores";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
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

  const db = useSQLiteContext();

  // Handler to delete all scores
  const handleDeleteAll = async () => {
    await db.execAsync("DELETE FROM wordle_scores;");
    setScores([]);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Wordle Scores
      </Text>
      {scores.length === 0 ? (
        <Text style={{ marginBottom: 16, textAlign: "center" }}>
          No scores yet.
        </Text>
      ) : (
        <FlashList
          data={scores}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 12,
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Date: {item.date}
              </Text>
              <Text style={{ fontSize: 15 }}>Score: {item.score}</Text>
            </View>
          )}
          estimatedItemSize={64}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
      <Button
        title="Add scores"
        onPress={() => router.push("/add-activity")}
        style={{ marginTop: 16 }}
      />
      <View style={{ height: 12 }} />
      <Button
        title="Delete All Scores"
        color="#d9534f"
        onPress={handleDeleteAll}
      />
    </View>
  );
}
