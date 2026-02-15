import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";

async function loadDatabase() {
  const name = "scores.db";
  const dbPath = `${FileSystem.documentDirectory}SQLite/${name}`;
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
    return null;
  }

  return (
    <Suspense fallback={<view></view>}>
      <SQLite.SQLiteProvider useSuspense databaseName="scores.db">
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
