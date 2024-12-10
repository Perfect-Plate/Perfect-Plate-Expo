import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import NavBar from "./NavBar";

export default function RecipeDetailsScreen() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleFavorite = () => {
    if (!isFavorite) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
    }
    setIsFavorite((prev) => !prev);
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
        <Text style={styles.headerTitle}>Custom Recipe</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/recipeHolder.jpeg")} // Replace with your image source
            style={styles.recipeImage}
          />
          <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require("@/assets/images/heartFilled.png") // Red heart image
                  : require("@/assets/images/heart.png") // Empty heart image
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Recipe Details */}
        <Text style={styles.recipeTitle}>Classic Spaghetti Bolognese</Text>
        <Text style={styles.recipeDescription}>
          Classic Spaghetti Bolognese is a hearty Italian-inspired dish
          featuring a rich, savory meat sauce simmered with tomatoes, garlic,
          onions, and aromatic herbs.
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Serving and Time Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Servings</Text>
            <Text style={styles.infoText}>1</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Prep time</Text>
            <Text style={styles.infoText}>20 min</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Cook time</Text>
            <Text style={styles.infoText}>30 min</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Ingredients Section */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.listContainer}>
          {[
            "400g (14 oz) spaghetti",
            "1 medium onion, finely chopped",
            "500g (1 lb) ground beef",
            "1 can (400g) diced tomatoes",
            "2 tablespoons tomato paste",
            "1 teaspoon dried oregano",
            "1 teaspoon dried basil",
            "1 cup beef stock",
            "Salt and pepper, to taste",
            "Fresh parsley, for garnish",
            "Grated Parmesan cheese, for serving",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Instructions Section */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.listContainer}>
          {[
            "Prepare the ingredients. Chop onion, garlic, carrot, and celery finely.",
            "Heat olive oil in a large skillet over medium heat. Add onion, garlic, carrot, and celery. Sauté for 5 minutes until softened.",
            "Add the ground beef to the skillet. Cook until browned, breaking up the meat with a spoon, about 8 minutes.",
            "Stir in diced tomatoes, tomato paste, oregano, basil, and beef stock. Season with salt and pepper. Lower the heat and let it simmer uncovered for 20–30 minutes, stirring occasionally.",
            "Bring a large pot of salted water to a boil. Cook spaghetti according to package instructions. Drain and set aside.",
            "Toss the cooked spaghetti with the Bolognese sauce or serve the sauce over the pasta. Garnish with parsley and grated Parmesan cheese.",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.generateButtonText}>Explore more recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.generateButton, styles.generateAgainButton]}
          onPress={() => router.push("/recipeGenerator")}
        >
          <Text style={[styles.generateButtonText, styles.generateAgainText]}>
            Generate again
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Alert */}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Added to Favorites</Text>
        </View>
      )}

      {/* NavBar */}
      <NavBar currentPage={null} onNavigate={(page) => console.log(page)} />
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
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 32,
    marginTop: 24,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  heartButton: {
    position: "absolute",
    bottom: 8,
    right: 16,
    backgroundColor: "#FFF",
    borderRadius: 40,
    padding: 8,
  },
  heartIcon: {
    width: 32,
    height: 32,
    tintColor: "#B55D45",
  },
  recipeTitle: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 16,
  },
  recipeDescription: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
    marginBottom: 24,
    lineHeight: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#C7C5C5",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoColumn: {
    alignItems: "center",
  },
  infoHeader: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginTop: 16,
    marginBottom: 16,
  },
  listContainer: {
    marginBottom: 24,
  },
  listItem: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
    lineHeight: 24,
    marginBottom: 8,
  },
  generateButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  generateButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  generateAgainButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F4A691",
  },
  generateAgainText: {
    color: "#1B1918",
  },
  alertContainer: {
    position: "absolute",
    bottom: 112, // 80px (NavBar height) + 32px (desired spacing)
    left: 16,
    right: 16,
    backgroundColor: "#F4A691",
    borderRadius: 8,
    padding: 16,
    shadowColor: "rgba(74, 69, 68, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    alignItems: "center",
},
  alertText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
});
