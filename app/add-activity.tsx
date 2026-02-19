import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

// Helper to robustly parse a Wordle result string
function parseWordleResult(text: string) {
  // Look for a line like "Wordle 1,705 5/6" (commas allowed in number)
  const lines = text.split(/\r?\n/);
  let headerMatch = null;
  for (const line of lines) {
    const m = line.match(/wordle\s+([\d,]+)\s+([\dxX])\s*\/\s*(\d+)/i);
    if (m) {
      headerMatch = m;
      break;
    }
  }
  if (!headerMatch) {
    throw new Error(
      "Could not find a valid Wordle header (e.g. 'Wordle 1,705 5/6') in your pasted text.",
    );
  }
  const wordleNumber = parseInt(headerMatch[1].replace(/,/g, ""), 10);
  const scoreRaw = headerMatch[2].toUpperCase();
  const maxTries = parseInt(headerMatch[3], 10);
  const score = scoreRaw === "X" ? maxTries + 1 : parseInt(scoreRaw, 10);
  // Optionally, extract the grid (emojis) for future use
  const gridLines = lines.filter((l) => /[⬛⬜🟩🟨]/.test(l));
  return {
    wordleNumber,
    score,
    maxTries,
    grid: gridLines.join("\n"),
  };
}

export default function AddActivityScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setSuccess("");
    setLoading(true);
    let parsed;
    try {
      parsed = parseWordleResult(input);
    } catch (e: any) {
      setError(e.message || String(e));
      setLoading(false);
      return;
    }
    try {
      // Insert into wordle_scores table (schema: id, date, score, grid)
      // Use today's date for the entry
      const today = new Date().toISOString().slice(0, 10);
      await db.runAsync(
        `INSERT INTO wordle_scores (date, score, grid) VALUES (?, ?, ?)`,
        [today, parsed.score, parsed.grid],
      );
      setSuccess(`Score for Wordle #${parsed.wordleNumber} added!`);
      setInput("");
    } catch (e: any) {
      setError("Database error: " + (e.message || String(e)));
    }
    setLoading(false);
  }

  return (
    <View style={{ alignItems: "center", padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Paste your Wordle result:
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          width: "100%",
          padding: 8,
          marginBottom: 8,
        }}
        value={input}
        onChangeText={setInput}
        placeholder="Paste Wordle result here"
        multiline
        editable={!loading}
      />
      {error ? (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ) : null}
      {success ? (
        <Text style={{ color: "green", marginBottom: 8 }}>{success}</Text>
      ) : null}
      <Button
        title={loading ? "Adding..." : "Add Score"}
        onPress={handleSubmit}
        disabled={loading}
      />
      <View style={{ height: 16 }} />
      <Button
        title="Go back"
        onPress={() => router.back()}
        disabled={loading}
      />
    </View>
  );
}
