export { DatabaseProvider };
  import { Asset } from "expo-asset";
  import * as FileSystem from "expo-file-system/legacy";
  import * as SQLite from "expo-sqlite";
  import { Suspense, useEffect, useState } from "react";
  import { View } from "react-native";

async function loadDatabase() {
  const name = "scores.db";
  const dbPath = `${FileSystem.documentDirectory}SQLite/${name}`;
  try {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (!fileInfo.exists) {
      //Create DB
      const dbAsset = require("@/assets/" + name);
      const dbUri = Asset.fromModule(dbAsset).uri;
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true },
      );
      await FileSystem.downloadAsync(dbUri, dbPath);
    }
  } catch (error) {
    console.error("Error loading database:", error);
    throw error;
  }
}

function useDB() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadDatabase().then(() => setLoaded(true));
  }, []);

  return { loaded };
}

function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { loaded } = useDB();

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* You can add a loading indicator here if desired */}
      </View>
    );
  }

  return (
    <Suspense fallback={<View />}>
      <SQLite.SQLiteProvider useSuspense databaseName="scores.db">
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
