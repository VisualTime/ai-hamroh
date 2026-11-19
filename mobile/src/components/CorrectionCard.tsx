import React from "react";
import { View, Text } from "react-native";
import { Correction } from "../api";
import { Theme } from "../theme";

export default function CorrectionCard({ c, t }: { c: Correction; t: Theme }) {
  return (
    <View style={{ backgroundColor: t.card, borderRadius: 14, padding: 12, marginVertical: 6, maxWidth: "90%" }}>
      <Text style={{ color: t.err, backgroundColor: t.errBg, padding: 6, borderRadius: 8, textDecorationLine: "line-through" }}>{c.original}</Text>
      <Text style={{ color: t.ok, backgroundColor: t.okBg, padding: 6, borderRadius: 8, marginTop: 6, fontWeight: "600" }}>{c.corrected}</Text>
      <Text style={{ color: t.sub, marginTop: 8 }}>💡 {c.explanation_uz}</Text>
    </View>
  );
}
