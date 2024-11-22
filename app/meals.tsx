import React, { useState } from "react";
import OptionButton from "./OptionButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Meals: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useLocalSearchParams(); // Use useLocalSearchParams to get query params
  const { daysPlanned } = searchParams; // Extract daysPlanned

  const options: string[] = ["Breakfast", "Lunch", "Dinner"];

  const handleSelectOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planning - Meals</Text>
      </View>

      {/* Question Section */}
      <Text style={styles.questionText}>
        Select the meals you would like to cover:
      </Text>

      {/* Options Section */}
      {options.map((option) => (
        <OptionButton
          key={option}
          text={option}
          isSelected={selectedOptions.includes(option)}
          onPress={() => handleSelectOption(option)}
          icon={
            selectedOptions.includes(option)
              ? require("@/assets/images/yes.png")
              : undefined
          }
        />
      ))}

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() =>
          router.push({
            pathname: "/portion",
            params: {
              daysPlanned, // Pass the daysPlanned value to the next page
            },
          })
        }
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  questionText: {
    fontSize: 28,
    color: "black",
    marginTop: 50,
    textAlign: "left",
    marginLeft: 20,
    fontWeight: "500",
    marginBottom: 40,
  },
  continueButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  continueButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});

export default Meals;
