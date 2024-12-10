import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import NavBar from "./NavBar";

const Home: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/homeHeader.png")}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>
          What are we cooking today, [username]?
        </Text>
        <Text style={styles.subHeaderText}>Generate custom recipes</Text>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => router.push("/recipeGenerator")} // Navigate to RecipeGenerator page
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Enter recipe URL or description"
            editable={false} // Prevent text entry to make it clickable only
            pointerEvents="none" // Ensure it behaves like a button
          />
          <TouchableOpacity style={styles.micButton}>
            <Image
              source={require("@/assets/images/mic.png")}
              style={styles.micIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Section title="Today's Meals" />
        <Section title="Recent Recipes" />
        <Section title="Revisit Your Favorites" />
      </ScrollView>

      {/* Floating Meal Plan Section */}
      <View style={styles.mealPlanSection}>
        <Image
          source={require("@/assets/images/homeButton.png")}
          style={styles.mealPlanImage}
        />
        <Text style={styles.mealPlanText}>Ready for a new meal plan?</Text>
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>Generate meal plan</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
      <NavBar currentPage="home" onNavigate={(page) => console.log(page)} />
    </View>
  );
};

// Reusable Section Component
const Section: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeAll}>See all</Text>
    </View>
    <View style={styles.sectionContent}>
      <Image
        style={styles.recipeImage}
        source={require("@/assets/images/food9.png")}
      />
      <Image
        style={styles.recipeImage}
        source={require("@/assets/images/food4.png")}
      />
      <Image
        style={styles.recipeImage}
        source={require("@/assets/images/food5.png")}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  header: {
    height: 292,
    padding: 16,
    justifyContent: "flex-end",
  },
  headerImage: {
    position: "absolute",
    width: "110%",
    height: 292,
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 32,
    color: "#1B1918",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginTop: 80,
    marginBottom: 24,
  },
  subHeaderText: {
    fontSize: 22,
    color: "#1B1918",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 24,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#73463A",
    padding: 8,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#737170",
    height: 40,
    marginLeft: 12,
  },
  micButton: {
    marginLeft: 8,
    marginRight: 12,
  },
  micIcon: {
    width: 24,
    height: 24,
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#1B1918",
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  seeAll: {
    fontSize: 16,
    color: "#1B1918",
    fontFamily: "Poppins",
  },
  sectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeImage: {
    width: 115,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#DDD",
    marginBottom: 15,
  },
  mealPlanSection: {
    position: "absolute",
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: "#77992E",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  mealPlanImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  mealPlanText: {
    fontSize: 22,
    color: "#141412",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  generateButton: {
    backgroundColor: "#EFFFCC",
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 32,
    height: 44,
    marginTop: 4,
  },
  generateButtonText: {
    fontSize: 18,
    color: "#141412",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginTop: 2,
  },
});

export default Home;