import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AddPreferencesScreen() {
  const router = useRouter();
  const { daysPlanned, adults, kids, breakfast, lunch, dinner } = useLocalSearchParams(); // Retrieve previously passed data
  const [preferences, setPreferences] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planning - Preferences</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Any additional details or preferences?</Text>

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write additional preferences..."
            placeholderTextColor="#8F8D8C"
            multiline
            value={preferences}
            onChangeText={setPreferences}
          />
        </View>
        <Text style={styles.hint}>
          Hint: You can include extra meal preferences like favorite foods or
          leftover ingredients.
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            // Pass all collected data to the `overview.tsx` screen
            router.push({
              pathname: "/overview",
              params: {
                daysPlanned, // Data from calendar.tsx
                adults, // Data from portions.tsx
                kids,
                breakfast,
                lunch,
                dinner,
                preferences, // User-entered preferences
              },
            });
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 400,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    height: 152,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#8F8D8C",
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  hint: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
    lineHeight: 24,
  },
  continueButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
  },
});
