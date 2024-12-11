import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import NavBar from "./NavBar";

export default function RecipeGeneratorScreen() {
  const [recipeInput, setRecipeInput] = useState("");
  const router = useRouter();

  const handleGenerateRecipe = () => {
    // Navigate to the loading screen
    router.push({
      pathname: "/recipeGenerateWaiting", // Adjust the path to your loading screen
      params: { userDescription: recipeInput }, // Pass the input to the loading screen
    });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/recipeBackground.png")}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Tell us what you’d like to eat:</Text>

        {/* Input Box */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Paste recipe URL or describe meal..."
            placeholderTextColor="#737170"
            value={recipeInput}
            onChangeText={setRecipeInput}
            multiline
          />
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateRecipe}>
          <Text style={styles.generateButtonText}>Generate recipe</Text>
        </TouchableOpacity>
      </View>

      {/* NavBar */}
      <NavBar currentPage={null}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  header: {
    height: 110,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: "flex-start",
  },
  title: {
    color: "#1B1918",
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 28,
    marginBottom: 16,
  },
  inputBox: {
    height: 168,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#8F8D8C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    color: "#1B1918",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    lineHeight: 24,
    textAlignVertical: "top",
  },
  generateButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});
