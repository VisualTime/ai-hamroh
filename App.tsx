import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import ChatScreen from "./src/screens/ChatScreen";
import { placeholder } from "./src/screens/Placeholder";

const Stack = createNativeStackNavigator();
export default function App() {
  const dark = useColorScheme() === "dark";
  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Onboarding" component={placeholder("Onboarding")} options={{ title: "Xush kelibsiz" }} />
        <Stack.Screen name="Login" component={placeholder("Kirish")} options={{ title: "Kirish" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "AI-Hamroh" }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Suhbat" }} />
        <Stack.Screen name="Retry" component={placeholder("Qayta mashq")} options={{ title: "Qayta mashq" }} />
        <Stack.Screen name="Mistakes" component={placeholder("Xatolar daftari")} options={{ title: "Xatolar daftari" }} />
        <Stack.Screen name="Vocab" component={placeholder("Lug'at")} options={{ title: "Lug'at" }} />
        <Stack.Screen name="Progress" component={placeholder("Progress")} options={{ title: "Progress" }} />
        <Stack.Screen name="Settings" component={placeholder("Sozlamalar")} options={{ title: "Sozlamalar" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
