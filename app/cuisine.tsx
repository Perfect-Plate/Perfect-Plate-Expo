import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getPreferenceFormData, storePreferences } from "@/api";

export default function CuisineScreen() {
  const router = useRouter();

  const cuisines = [
    { id: "1", title: "American" },
    { id: "2", title: "Mexican" },
    { id: "3", title: "Chinese" },
    { id: "4", title: "Italian" },
    { id: "5", title: "Japanese" },
    { id: "6", title: "Thai" },
    { id: "7", title: "Indian" },
    { id: "8", title: "Mediterranean" },
  ];

  const [preferences, setPreferences] = useState<{ [key: string]: string }>({});
  const [queriedOptions, setQueriedOptions] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreferenceFormData("cuisine");

        // Check if the data needs parsing
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;

        setPreferences(parsedData || {});
        setQueriedOptions(parsedData || {});
      } catch (err) {
        setPreferences({});
        setQueriedOptions({});
      }
    };

    fetchData();
  }, []);

  const handlePreference = (id: string, preference: string) => {
    setPreferences((prev) => ({
      ...prev, // Keep other preferences
      [id]: prev[id] === preference ? "" : preference, // Toggle preference
    }));
  };

  const handleContinue = () => {
    // Check if any preferences have been selected
    const hasPreferences = Object.keys(preferences).some(
      (key) => preferences[key] === "like" || preferences[key] === "dislike"
    );

    if (hasPreferences && preferences !== queriedOptions) {
      storePreferences("cuisine", preferences).then((r) => {
        router.push("/calendar");
      });
    } else {
      router.push("/calendar");
    }
  };

  const renderCuisineItem = ({
    item,
  }: {
    item: { id: string; title: string };
  }) => {
    return (
      <View style={styles.cuisineItem}>
        <Text style={styles.cuisineText}>{item.title}</Text>
        <View style={styles.preferenceButtons}>
          {/* "Like" Button */}
          <TouchableOpacity
            style={[
              styles.preferenceButton,
              preferences[item.id] === "like" && styles.likeSelected,
            ]}
            onPress={() => handlePreference(item.id, "like")}
          >
            <Image
              source={require("@/assets/images/like.png")}
              style={[
                styles.preferenceIcon,
                preferences[item.id] === "like" && styles.likeIcon,
              ]}
            />
          </TouchableOpacity>
          {/* "Dislike" Button */}
          <TouchableOpacity
            style={[
              styles.preferenceButton,
              preferences[item.id] === "dislike" && styles.dislikeSelected,
            ]}
            onPress={() => handlePreference(item.id, "dislike")}
          >
            <Image
              source={require("@/assets/images/dislike.png")}
              style={[
                styles.preferenceIcon,
                preferences[item.id] === "dislike" && styles.dislikeIcon,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>Meal Planning - Cuisine</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Are there any cuisines you like or dislike?
        </Text>

        {/* Cuisine List */}
        <FlatList
          data={cuisines}
          renderItem={renderCuisineItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cuisineList}
        />

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !Object.keys(preferences).some(
              (key) =>
                preferences[key] === "like" || preferences[key] === "dislike"
            ) && styles.inactiveContinueButton,
          ]}
          onPress={handleContinue}
          disabled={
            !Object.keys(preferences).some(
              (key) =>
                preferences[key] === "like" || preferences[key] === "dislike"
            )
          }
        >
          <Text
            style={[
              styles.continueButtonText,
              !Object.keys(preferences).some(
                (key) =>
                  preferences[key] === "like" || preferences[key] === "dislike"
              ) && styles.inactiveContinueButtonText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... styles remain the same as in the original code

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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    marginTop: 32,
    marginBottom: 24,
    textAlign: "left",
  },
  cuisineList: {
    flexGrow: 1,
  },
  cuisineItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    height: 56,
    borderRadius: 12,
    marginBottom: 8,
  },
  cuisineText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
  },
  preferenceButtons: {
    flexDirection: "row",
    gap: 12,
  },
  preferenceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E0E0E0",
  },
  likeSelected: {
    borderColor: "#A6C463",
    backgroundColor: "#A6C463",
  },
  dislikeSelected: {
    borderColor: "#E4A7A7",
    backgroundColor: "#E4A7A7",
  },
  preferenceIcon: {
    width: 24,
    height: 24,
    tintColor: "#737170",
  },
  likeIcon: {
    tintColor: "#1B1918",
  },
  dislikeIcon: {
    tintColor: "#1B1918",
  },
  continueButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
});
