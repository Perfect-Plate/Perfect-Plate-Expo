import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import OptionButton from "./OptionButton";
import { storePreferences, getPreferenceFormData } from "@/api";

type Option =
  | "Low Carb"
  | "High Protein"
  | "Low Fat"
  | "Low Sodium"
  | "Low Calorie";

const NutritionalPreferences: React.FC = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [queriedOption, setQueriedOption] = useState<Option | null>(null);

  const options: Option[] = [
    "Low Carb",
    "High Protein",
    "Low Fat",
    "Low Sodium",
    "Low Calorie",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getPreferenceFormData("nutrition")) as Option | null;
      if (data) {
        setSelectedOption(data);
        setQueriedOption(data);
      }
    };

    fetchData().catch((err) => console.error(err));
  }, []);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
  };

  const handleContinue = async () => {
    if (selectedOption && selectedOption !== queriedOption) {
      try {
        await storePreferences("nutrition", [selectedOption]);
        router.push("/dietary");
      } catch (err) {
        console.error("Error storing preferences:", err);
      }
    } else {
      router.push("/dietary");
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
        <Text style={styles.headerTitle}>Nutritional Preferences</Text>
        <Image
          source={require("@/assets/images/Frame.png")}
          style={styles.frameButton}
        />
      </View>

      <Text style={styles.questionText}>Do you have any</Text>
      <Text style={styles.questionText2}>nutritional preferences?</Text>

      {options.map((option) => (
        <OptionButton
          key={option}
          text={option}
          isSelected={selectedOption === option}
          onPress={() => handleSelectOption(option)}
          icon={
            selectedOption === option
              ? require("@/assets/images/yes.png")
              : undefined
          }
        />
      ))}

      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedOption && styles.inactiveContinueButton,
        ]}
        onPress={handleContinue}
        disabled={!selectedOption}
      >
        <Text
          style={[
            styles.continueButtonText,
            !selectedOption && styles.inactiveContinueButtonText,
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
  frameButton: {
    marginTop: 50,
    width: 25,
    height: 25,
    marginLeft: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
    marginLeft: 80,
  },
  questionText: {
    fontSize: 28,
    color: "black",
    marginTop: 32,
    textAlign: "left",
    marginLeft: 20,
    fontWeight: "500",
  },
  questionText2: {
    fontSize: 28,
    color: "black",
    textAlign: "left",
    marginBottom: 24,
    marginLeft: 20,
    fontWeight: "500",
  },
});

export default NutritionalPreferences;
