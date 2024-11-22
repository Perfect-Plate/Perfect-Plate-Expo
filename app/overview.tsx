import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OverviewScreen() {
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
    console.log("Meal plan generated with details:", {
      daysPlanned,
      adults,
      kids,
      breakfast,
      lunch,
      dinner,
      preferences,
    });
    router.push("/signUp");
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

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Here’s your meal plan summary:</Text>

        {/* Days Planned Section */}
        <View style={styles.summarySection}>
          <View>
            <Text style={styles.sectionHeader}>Days planned:</Text>
            <Text style={styles.sectionText}>{daysPlanned} days</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/calendar")}>
            <Image
              source={require("@/assets/images/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Portions Section */}
        <View style={styles.summarySection}>
          <View>
            <Text style={styles.sectionHeader}>Portions:</Text>
            <Text style={styles.sectionText}>Adults: {adults}</Text>
            <Text style={styles.sectionText}>Kids: {kids}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/portion")}>
            <Image
              source={require("@/assets/images/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Dishes per Meal Section */}
        <View style={styles.summarySection}>
          <View>
            <Text style={styles.sectionHeader}>Dishes per meal:</Text>
            <Text style={styles.sectionText}>Breakfast: {breakfast}</Text>
            <Text style={styles.sectionText}>Lunch: {lunch}</Text>
            <Text style={styles.sectionText}>Dinner: {dinner}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/portion")}>
            <Image
              source={require("@/assets/images/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Additional Details Section */}
        <View style={styles.summarySection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionHeader}>Additional details:</Text>
            <Text style={styles.sectionText}>
              {preferences || "No additional preferences provided."}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/addPreferences")}>
            <Image
              source={require("@/assets/images/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGeneratePlan}
      >
        <Text style={styles.generateButtonText}>Generate my meal plan</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginBottom: 16,
    textAlign: "center",
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
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  generateButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});
