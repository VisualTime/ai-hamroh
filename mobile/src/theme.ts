import { useColorScheme } from "react-native";
const light = { bg: "#FFF8F0", card: "#FFFFFF", text: "#2B2622", sub: "#7A6F66", primary: "#E8743B",
  bubbleUser: "#E8743B", bubbleAi: "#F2E8DC", errBg: "#FDECEC", err: "#C62828", okBg: "#E8F5E9", ok: "#2E7D32" };
const dark = { bg: "#1C1816", card: "#272220", text: "#F5EEE6", sub: "#B3A89E", primary: "#F28A55",
  bubbleUser: "#C9602F", bubbleAi: "#332D2A", errBg: "#3B2323", err: "#FF8A80", okBg: "#213424", ok: "#81C784" };
export const useTheme = () => (useColorScheme() === "dark" ? dark : light);
export type Theme = typeof light;
