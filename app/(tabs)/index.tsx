import { insertSampleScore } from "@/hooks/insert-sample";
import { useScores } from "@/hooks/usescores";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { scores } = useScores();
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(scores)}</Text>
      <Button
        title="Add activity"
        onPress={() => router.push("/add-activity")}
      />
      <Button title="Add sample score" onPress={insertSampleScore} />
    </View>
  );
}
