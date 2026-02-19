import { Colors } from "@/constants/theme";
import { useSetupScoresTable } from "@/hooks/db";
import { useScores } from "@/hooks/usescores";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

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

  const colorScheme = useColorScheme() ?? "light";
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: Colors[colorScheme].background,
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
          renderItem={({ item }) => {
            const renderRightActions = () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#d9534f",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 80,
                  height: "100%",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                onPress={async () => {
                  await db.runAsync("DELETE FROM wordle_scores WHERE id = ?", [
                    item.id,
                  ]);
                  setScores((prev: any[]) =>
                    prev.filter((s) => s.id !== item.id),
                  );
                }}
              >
                <Text
                  style={{
                    color: Colors[colorScheme].background,
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            );
            return (
              <Swipeable renderRightActions={renderRightActions}>
                <View
                  style={{
                    marginBottom: 12,
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme].background,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors[colorScheme].primary,
                    padding: 16,
                    shadowColor: Colors[colorScheme].primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Date: {item.date}
                  </Text>
                  <Text style={{ fontSize: 15 }}>Score: {item.score}</Text>
                  {item.grid ? (
                    <View style={{ marginTop: 8 }}>
                      {item.grid
                        .split("\n")
                        .map((line: string, idx: number) => (
                          <Text
                            key={idx}
                            style={{
                              fontSize: 32,
                              textAlign: "center",
                              lineHeight: 38,
                              letterSpacing: 2,
                            }}
                            selectable={false}
                            allowFontScaling={false}
                          >
                            {line}
                          </Text>
                        ))}
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: Colors[colorScheme].tabIconDefault,
                        fontSize: 14,
                        fontStyle: "italic",
                        marginTop: 8,
                      }}
                    >
                      No grid available
                    </Text>
                  )}
                </View>
              </Swipeable>
            );
          }}
          estimatedItemSize={64}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
      <Button
        title="Add scores"
        onPress={() => router.push("/add-activity")}
        color={Colors[colorScheme].primary}
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
