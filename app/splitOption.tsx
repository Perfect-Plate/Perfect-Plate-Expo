import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplitOptionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Title and Description */}
      <View style={styles.content}>
        <Text style={styles.title}>What would you like to do next?</Text>
        <Text style={styles.description}>
          Once you're set up, we'll help you create an account to save your meal
          plan and recipes.
        </Text>

        {/* Options */}
        <View style={styles.buttonGroup}>
          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.optionButton}
            // onPress={() => router.push("/recipes")}
          >
            <Text style={styles.optionButtonText}>
              Get started with recipes
            </Text>
          </TouchableOpacity>

          {/* Meal Planning Button */}
          <TouchableOpacity
            style={styles.optionButton}
            // onPress={() => router.push("/meal-planning")}
          >
            <Text style={styles.optionButtonText}>
              Continue to meal planning
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingTop: 95,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
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
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#737170",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  buttonGroup: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
  },
  optionButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 24,
  },
});
