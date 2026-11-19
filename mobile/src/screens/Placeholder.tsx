import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../theme";
export const placeholder = (title: string) => () => {
  const t = useTheme();
  return <View style={{ flex: 1, backgroundColor: t.bg, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: t.text, fontSize: 18 }}>{title}</Text><Text style={{ color: t.sub }}>Keyingi bosqichda qo'shiladi</Text></View>;
};
