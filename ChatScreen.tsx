import React, { useRef, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
import { sendChat, Correction, Msg } from "../api";
import { useTheme } from "../theme";
import CorrectionCard from "../components/CorrectionCard";

type Item = { id: string; role: "user" | "assistant" | "corr"; text?: string; c?: Correction };

export default function ChatScreen({ route }: any) {
  const t = useTheme();
  const topic = route.params?.topic ?? "free";
  const [items, setItems] = useState<Item[]>([{ id: "0", role: "assistant", text: "Hi! 👋 What would you like to talk about today?" }]);
  const [history, setHistory] = useState<Msg[]>([{ role: "assistant", content: "Hi! What would you like to talk about today?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [level, setLevel] = useState("A2");
  const list = useRef<FlatList>(null);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput(""); setBusy(true);
    const h: Msg[] = [...history, { role: "user", content: text }];
    setItems((p) => [...p, { id: Date.now() + "u", role: "user", text }]);
    try {
      const r = await sendChat(h, { level, topic, correction_mode: "instant" });
      setLevel(r.detected_level);
      setHistory([...h, { role: "assistant", content: r.reply }]);
      setItems((p) => [...p,
        ...r.corrections.map((c, i) => ({ id: Date.now() + "c" + i, role: "corr" as const, c })),
        ...(r.retry_prompt ? [{ id: Date.now() + "r", role: "assistant" as const, text: r.retry_prompt }] : []),
        { id: Date.now() + "a", role: "assistant" as const, text: r.reply }]);
    } catch (e: any) { Alert.alert("Xatolik", "Serverga ulanib bo'lmadi. Internetni tekshiring."); }
    finally { setBusy(false); }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={90}>
      <FlatList ref={list} data={items} keyExtractor={(i) => i.id} contentContainerStyle={{ padding: 12 }}
        onContentSizeChange={() => list.current?.scrollToEnd()}
        renderItem={({ item }) => item.role === "corr" ? <CorrectionCard c={item.c!} t={t} /> : (
          <View style={{ alignSelf: item.role === "user" ? "flex-end" : "flex-start", backgroundColor: item.role === "user" ? t.bubbleUser : t.bubbleAi,
            padding: 12, borderRadius: 18, marginVertical: 4, maxWidth: "85%" }}>
            <Text style={{ color: item.role === "user" ? "#fff" : t.text, fontSize: 16 }}>{item.text}</Text>
          </View>)} />
      {busy && <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}><ActivityIndicator color={t.primary} /><Text style={{ color: t.sub, marginLeft: 8 }}>AI yozmoqda…</Text></View>}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 8 }}>
        <TextInput value={input} onChangeText={setInput} placeholder="Xabar yozing…" placeholderTextColor={t.sub} onSubmitEditing={send}
          style={{ flex: 1, minHeight: 48, backgroundColor: t.card, color: t.text, borderRadius: 24, paddingHorizontal: 16 }} />
        <Pressable onPress={() => Alert.alert("Tez orada", "Ovozli rejim 3-bosqichda qo'shiladi.")} accessibilityLabel="Mikrofon"
          style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: t.primary, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24 }}>🎤</Text></Pressable>
        <Pressable onPress={send} accessibilityLabel="Yuborish" style={{ minWidth: 48, height: 48, borderRadius: 24, backgroundColor: t.card, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 20 }}>➤</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
