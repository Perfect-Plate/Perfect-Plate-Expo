import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {getMultipleStoredData, getPreferenceFormData} from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OverviewScreen() {
  const [preferenceFormData, setPreferenceFormData] = useState<{
  cuisine?: { [key: string]: string };
  dietary?: string[];
  mealDescription?: string;
  mealPlanCalendar?: string[];
  meals?: string[];
  nutrition?: string[];
  portions?: number[];
}>({
  cuisine: {},
  dietary: [],
  mealDescription: "",
  mealPlanCalendar: [],
  meals: [],
  nutrition: [],
  portions: [],
});

  const [signed_in, setSignedIn] = useState<{
    status: string;
    email: string;
  }>();


  useEffect(() => {
  const fetchData = async () => {
    // Check if the user is signed in
    const signIn = await getPreferenceFormData("signed_in") as unknown as { status: string; email: string } | null;
    setSignedIn(signIn || { status: "false", email: "" });

    try {
      const formDataArray = await getMultipleStoredData([
        "nutrition",
        "meals",
        "dietary",
        'allergy',
        "cuisine",
        "mealPlanCalendar",
        "mealDescription",
        "portions",
      ]);

      // Transform the array into a single object
      const parsedData = formDataArray?.reduce((acc: any, item: any) => {
        const [key, value] = Object.entries(item)[0];
        acc[key] = JSON.parse(value as string); // Safely parse JSON
        return acc;
      }, {});


      setPreferenceFormData(parsedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);




  const router = useRouter();
  const {
    preferences = "",
    daysPlanned = "",
    adults = "",
    kids = "",
    breakfast = "",
    lunch = "",
    dinner = "",
  } = useLocalSearchParams();

  const handleGeneratePlan = () => {
    router.push({
      pathname: "/mealGenerateWaiting",
      params: { "data": JSON.stringify(preferenceFormData) },
    });
  };

  // Helper function to parse cuisine preferences
  const formatCuisinePreferences = () => {
    const cuisineMap: {[key: string]: string} = {
      "1": "American",
      "2": "Mexican",
      "3": "Chinese",
      "4": "Italian",
      "5": "Japanese",
      "6": "Thai",
      "7": "Indian",
      "8": "Mediterranean"
    };
    if (preferenceFormData["cuisine"]) {
      return Object.entries(preferenceFormData.cuisine)
        .map(([id, preference]) => `${cuisineMap[id]} (${preference})`)
        .join(", ");
    }
    return "No cuisine preferences selected";
  };

  return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meal Planning - Overview</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Here's your meal plan summary:</Text>

          {/* Days Planned Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Meal Plan Dates:</Text>
              {preferenceFormData.mealPlanCalendar?.map((date, index) => (
                <Text key={index} style={styles.sectionText}>{date}</Text>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push("/calendar")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Meals Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Meal Types:</Text>
              {preferenceFormData.meals?.map((meal, index) => (
                <Text key={index} style={styles.sectionText}>{meal}</Text>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push("/meals")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Dietary Preferences Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Dietary Preferences:</Text>
              {preferenceFormData.dietary?.map((diet, index) => (
                <Text key={index} style={styles.sectionText}>{diet}</Text>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push("/dietary")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Nutrition Preferences Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Nutrition Preferences:</Text>
              {preferenceFormData.nutrition?.map((nutrition, index) => (
                <Text key={index} style={styles.sectionText}>{nutrition}</Text>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push("/nutrition")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Cuisine Preferences Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Cuisine Preferences:</Text>
              <Text style={styles.sectionText}>{formatCuisinePreferences()}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/cuisine")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Meal Description Section */}
          <View style={styles.summarySection}>
            <View>
              <Text style={styles.sectionHeader}>Meal Description:</Text>
              <Text style={styles.sectionText}>
                {preferenceFormData.mealDescription || "No description provided"}
              </Text>
            </View>
             <TouchableOpacity onPress={() => router.push("/addPreferences")}>
              <Image
                  source={require("@/assets/images/edit.png")}
                  style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Extra space at the bottom to ensure the generate button doesn't cover content */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Footer */}
        <TouchableOpacity
            style={styles.generateButton}
            onPress={
              signed_in != null && signed_in["status"] === "true" ? handleGeneratePlan : () => router.push("/signUp")
            }
        >
          <Text style={styles.generateButtonText}>
            {signed_in ? "Generate Meal Plan" : "Sign Up to Continue"}
          </Text>
        </TouchableOpacity>
      </View>
  );
}

// Styles remain the same as in the original code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
    },
    scrollContent: {
    marginTop:20,
      marginRight: 16,
        marginLeft: 16,
        flexGrow: 1,
      paddingBottom: 120, // Ensures content isn't hidden behind the generate button
    },
    bottomSpacer: {
      height: 80, // Additional space at the bottom
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 30,
    marginTop: 10,
    textAlign: "left",
  },
  summarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 22,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#B55D45",
  },
  sectionText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  generateButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 30,
    alignSelf: "center",
  },
  generateButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});
