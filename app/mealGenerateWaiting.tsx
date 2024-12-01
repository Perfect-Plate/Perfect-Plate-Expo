import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {getPreferenceFormData, SavePreference} from "@/api";
import { LocalData } from "@/api/savePreference";
import MealPlanGenerate, {SignInRequest} from "@/api/mealPlan";

const MealPlanLoadingScreen = () => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const spinValue = useRef(new Animated.Value(0)).current;



  // Spinning Animation
  useEffect(() => {
      Animated.loop(
          Animated.timing(spinValue, {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
          })
      ).start();
  }, [spinValue]);

  useEffect(() => {
      const generateMeal = async () => {
           const ldata = searchParams["data"] as unknown as LocalData;
           const response = await SavePreference({ localData: ldata})
        };

        generateMeal().catch((err) => {}); // Add error handling
    }, []);



  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planning</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
          <View style={styles.spinnerLine} />
        </Animated.View>
        <Text style={styles.message}>Your meal plan is on its way!</Text>
      </View>
    </SafeAreaView>
  );
};

export default MealPlanLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F4F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  backArrow: {
    fontSize: 24,
    color: "#1B1918",
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B1918",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerLine: {
    width: 24,
    height: 2,
    backgroundColor: "#F4A691",
    borderRadius: 1,
  },
  message: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    marginTop: 16,
  },
});
