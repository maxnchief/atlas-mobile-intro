import { DatabaseProvider } from "@/components/DatabaseProvider";
import { Colors } from "@/constants/theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const customTheme = {
    ...(colorScheme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(colorScheme === "dark"
        ? NavigationDarkTheme.colors
        : NavigationDefaultTheme.colors),
      background: Colors[colorScheme ?? "light"].background,
      primary: Colors[colorScheme ?? "light"].primary,
      card: Colors[colorScheme ?? "light"].background,
      text: Colors[colorScheme ?? "light"].text,
      border: Colors[colorScheme ?? "light"].primary,
      notification: Colors[colorScheme ?? "light"].secondary,
    },
  };
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <DatabaseProvider>
        <ThemeProvider value={customTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-activity"
              options={{ title: "Add Activity" }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"}
            backgroundColor={Colors[colorScheme ?? "light"].background}
          />
        </ThemeProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
