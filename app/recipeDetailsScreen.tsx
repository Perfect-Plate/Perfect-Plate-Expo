import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import NavBar from "./NavBar";

export default function RecipeDetailsScreen() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const searchParams = useLocalSearchParams();
  const recipe = searchParams.recipe ? JSON.parse(searchParams.recipe as string) : null;

  const toggleFavorite = () => {
    if (!isFavorite) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
    }
    setIsFavorite((prev) => !prev);
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No recipe details available</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>{recipe.cuisine || 'Recipe'} Details</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/recipeHolder.jpeg")}
            style={styles.recipeImage}
          />
          <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require("@/assets/images/heartFilled.png")
                  : require("@/assets/images/heart.png")
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Recipe Details */}
        <Text style={styles.recipeTitle}>{recipe.title || 'Untitled Recipe'}</Text>
        <Text style={styles.recipeDescription}>{recipe.description || 'No description available'}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Serving and Time Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Servings</Text>
            <Text style={styles.infoText}>{recipe.servings || 'N/A'}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Prep time</Text>
            <Text style={styles.infoText}>{recipe.prep_time || 'N/A'} min</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Cook time</Text>
            <Text style={styles.infoText}>{recipe.cook_time || 'N/A'} min</Text>
          </View>
        </View>

        {/* Nutritional Info */}
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Calories</Text>
            <Text style={styles.infoText}>{recipe.calories || 'N/A'}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Protein</Text>
            <Text style={styles.infoText}>{recipe.protein || 'N/A'}g</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoHeader}>Fat</Text>
            <Text style={styles.infoText}>{recipe.fat || 'N/A'}g</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Ingredients Section */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.listContainer}>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((item: any, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>No ingredients listed</Text>
          )}
        </View>

        {/* Instructions Section */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.listContainer}>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            recipe.instructions.map((item: any, index: number) => (
              <Text key={index} style={styles.listItem}>
                {index + 1}. {item}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>No instructions available</Text>
          )}
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
  errorText: {
    fontSize: 18,
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 50,
    color: "#1B1918",
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
