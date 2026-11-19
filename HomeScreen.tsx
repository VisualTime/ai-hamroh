import React from "react";
import { Text, Pressable, ScrollView } from "react-native";
import { useTheme } from "../theme";

const TOPICS = [["✈️ Sayohat", "travel"], ["💼 Biznes", "business"], ["🏠 Kundalik hayot", "daily life"], ["🎨 Hobbi", "hobbies"], ["🎤 Intervyu", "job interview"], ["💬 Erkin mavzu", "free"]];

export default function HomeScreen({ navigation }: any) {
  const t = useTheme();
  const Btn = ({ label, to, params }: any) => (
    <Pressable onPress={() => navigation.navigate(to, params)} style={{ minHeight: 56, backgroundColor: t.card, borderRadius: 16, padding: 16, marginBottom: 10, justifyContent: "center" }}>
      <Text style={{ color: t.text, fontSize: 17 }}>{label}</Text></Pressable>);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: t.text, fontSize: 26, fontWeight: "700" }}>Salom! 👋</Text>
      <Text style={{ color: t.sub, marginBottom: 16 }}>🔥 Streak: 0 kun · Mavzu tanlang va gaplashing</Text>
      {TOPICS.map(([l, k]) => <Btn key={k} label={l} to="Chat" params={{ topic: k }} />)}
      <Text style={{ color: t.sub, marginVertical: 8 }}>Boshqa bo'limlar</Text>
      <Btn label="📒 Xatolar daftari" to="Mistakes" /><Btn label="📚 Lug'at" to="Vocab" />
      <Btn label="📈 Progress" to="Progress" /><Btn label="⚙️ Sozlamalar" to="Settings" />
    </ScrollView>
  );
}
