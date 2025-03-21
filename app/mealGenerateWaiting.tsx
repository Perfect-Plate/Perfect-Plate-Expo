import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity, ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {SavePreference} from "@/api";
import { LocalData } from "@/api/savePreference";

const MealPlanLoadingScreen = () => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const spinValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
      const generateMeal = async () => {
           const ldata = searchParams["data"] as unknown as LocalData;
           const response = await SavePreference({ localData: ldata})
              if (response?.status === 200) {
                 router.push({
                    pathname: "/calendarScreen",
                    params: { mealPlan: JSON.stringify(response.data) },
                 });
              } else {
                 console.error("Error generating meal plan:", response);
              }
        };

        generateMeal().catch((err) => {}); // Add error handling
    }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planning</Text>
      </View>

      {/* Centered Content */}
      <View style={styles.centeredContent}>
        <ActivityIndicator size="large" color="#F4A691" style={styles.largeIndicator} />
        <Text style={styles.message}>Your meal plan is on its way!</Text>
      </View>
    </View>
  );
};

export default MealPlanLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  header: {
    height: 110,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  backArrow: {
    fontSize: 24,
    color: "#1B1918",
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 110,
    marginHorizontal: 64,
  },
  largeIndicator: {
    transform: [{ scale: 2 }], // Scale the spinner to make it significantly larger
    marginBottom: 32,
  },
  message: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    marginTop: 32,
  },
});
