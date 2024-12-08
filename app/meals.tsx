import React, { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getPreferenceFormData, storePreferences } from "@/api";

const Meals: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();
  const [queriedOptions, setQueriedOptions] = useState<string[]>([]);
  const options: string[] = ["Breakfast", "Lunch", "Dinner"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreferenceFormData("meals");

        // convert string to array
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;

        // Add explicit type checking and default to empty array
        if (parsedData === null || parsedData === undefined) {
          console.log("No meal preferences found, initializing empty array");
          setSelectedOptions([]);
          setQueriedOptions([]);
        } else {
          setSelectedOptions(parsedData);
          setQueriedOptions(parsedData);
        }
      } catch (err) {
        console.error("Error fetching preferences:", err);
        setSelectedOptions([]);
        setQueriedOptions([]);
      }
    };

    fetchData();
  }, []);

  const handleSelectOption = (option: string) => {
    setSelectedOptions((prev) => {
      // Ensure prev is an array, fallback to empty array if not
      const prevArray = Array.isArray(prev) ? prev : [];

      return prevArray.includes(option)
        ? prevArray.filter((item) => item !== option)
        : [...prevArray, option];
    });
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0 && selectedOptions !== queriedOptions) {
      storePreferences("meals", selectedOptions).then(() => {
        router.push("/portion");
      });
    } else {
      router.push("/portion");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planning - Meals</Text>
      </View>

      <Text style={styles.questionText}>
        Select the meals you would like to cover:
      </Text>

      {options.map((option) => (
        <OptionButton
          key={option}
          text={option}
          isSelected={
            selectedOptions.filter((item) => item === option).length > 0
          }
          onPress={() => handleSelectOption(option)}
          icon={
            selectedOptions.includes(option)
              ? require("@/assets/images/yes.png")
              : undefined
          }
        />
      ))}

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedOptions.length === 0 && styles.inactiveContinueButton,
        ]}
        onPress={handleContinue}
        disabled={selectedOptions.length === 0}
      >
        <Text
          style={[
            styles.continueButtonText,
            selectedOptions.length === 0 && styles.inactiveContinueButtonText,
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
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
  questionText: {
    fontSize: 28,
    color: "black",
    marginTop: 32,
    textAlign: "left",
    marginLeft: 20,
    fontWeight: "500",
    marginBottom: 24,
  },
  continueButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});

export default Meals;
