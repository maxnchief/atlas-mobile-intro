import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function AddActivityScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => router.back()} />
    </View>
  );
}
