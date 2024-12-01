import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

const RecipeDetailsScreen = () => {
  const recipe = {
    title: "Classic Spaghetti Bolognese",
    description:
      "A hearty Italian-inspired dish featuring a rich, savory meat sauce simmered with tomatoes, garlic, onions, and aromatic herbs.",
    servings: 1,
    prepTime: "20 min",
    cookTime: "30 min",
    ingredients: [
      "400g spaghetti",
      "1 medium onion, finely chopped",
      "500g ground beef",
      "1 can (400g) diced tomatoes",
      "2 tablespoons tomato paste",
      "1 teaspoon dried oregano",
      "1 teaspoon dried basil",
      "1 cup beef stock",
      "Salt and pepper, to taste",
      "Fresh parsley, for garnish",
      "Grated Parmesan cheese, for serving",
    ],
    instructions: [
      "Prepare the ingredients: Chop onion, garlic, carrot, and celery; gather the remaining ingredients.",
      "Cook the aromatics: Heat olive oil, sauté onion, garlic, carrot, celery for 5 minutes.",
      "Add ground beef: Brown the meat, then add diced tomatoes, tomato paste, and beef stock.",
      "Simmer the sauce: Let it cook on low heat for 20 minutes.",
      "Cook spaghetti: Boil water, add spaghetti, and cook according to package instructions.",
      "Serve: Plate the spaghetti, pour the sauce on top, garnish with parsley and Parmesan.",
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Recipe Title */}
        <Text style={styles.title}>{recipe.title}</Text>

        {/* Description */}
        <Text style={styles.description}>{recipe.description}</Text>

        {/* Metadata */}
        <View style={styles.metadata}>
          <Text style={styles.metaText}>Servings: {recipe.servings}</Text>
          <Text style={styles.metaText}>Prep Time: {recipe.prepTime}</Text>
          <Text style={styles.metaText}>Cook Time: {recipe.cookTime}</Text>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            - {ingredient}
          </Text>
        ))}

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={index} style={styles.step}>
            {index + 1}. {step}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F4F4",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B1918",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 16,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1918",
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  step: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
});
