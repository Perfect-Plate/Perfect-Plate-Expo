import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getPreferenceFormData, storePreferences } from "@/api";
import Stringifier from "postcss/lib/stringifier";

export default function AddPreferencesScreen() {
  const router = useRouter();
  // const { daysPlanned, adults, kids, breakfast, lunch, dinner } = useLocalSearchParams(); // Retrieve previously passed data
  const [preferences, setPreferences] = useState("");
  const [queriedOptions, setQueriedOptions] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Check if the user has already localStorage data for nutrition
      const data = (await getPreferenceFormData(
        "mealDescription"
      )) as unknown as string | null;
      if (data) {
        // Ensure data is an array
        setPreferences(data as string);
        setQueriedOptions(data as string);
      }
    };

    fetchData().catch((err) => {}); // Add error handling
  }, []);
  const handleContinue = () => {
    if (preferences.length > 0 && preferences !== queriedOptions) {
      storePreferences("mealDescription", preferences).then((r) => {
        router.push("/overview");
      });
    } else {
      router.push("/overview");
    }
  };

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
            value={preferences || ""}
            onChangeText={setPreferences}
          />
        </View>
        <Text style={styles.hint}>
          Hint: You can include extra meal preferences like favorite foods or
          leftover ingredients.
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            preferences.length === 0 && styles.inactiveContinueButton,
          ]}
          onPress={handleContinue}
          disabled={preferences.length === 0}
        >
          <Text
            style={[
              styles.continueButtonText,
              preferences.length === 0 && styles.inactiveContinueButtonText,
            ]}
          >
            Continue
          </Text>
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
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  inactiveContinueButton: {
    backgroundColor: "#D3D3D3",
  },
  continueButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  inactiveContinueButtonText: {
    color: "#808080",
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
    fontSize: 18,
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
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 24,
    textAlign: "left",
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
});
