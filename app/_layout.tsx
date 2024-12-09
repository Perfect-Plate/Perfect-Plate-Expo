import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="nutrition" options={{ headerShown: false }} />
          <Stack.Screen name="dietary" options={{ headerShown: false }} />
          <Stack.Screen name="allergy" options={{ headerShown: false }} />
          <Stack.Screen name="splitOption" options={{ headerShown: false }} />
          <Stack.Screen name="cuisine" options={{ headerShown: false }} />
          <Stack.Screen name="calendar" options={{ headerShown: false }} />
          <Stack.Screen name="meals" options={{ headerShown: false }} />
          <Stack.Screen name="portion" options={{ headerShown: false }} />
          <Stack.Screen name="addPreferences" options={{ headerShown: false }} />
          <Stack.Screen name="overview" options={{ headerShown: false }} />
          <Stack.Screen name="mealGenerateWaiting" options={{ headerShown: false }} />
          <Stack.Screen name="signIn" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />          
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen name="mealCalendar" options={{ headerShown: false }} />
          <Stack.Screen name="recipeDetailsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="recipeGenerator" options={{ headerShown: false }} />
          <Stack.Screen name="recipeGenerateWaiting" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
  );
}
