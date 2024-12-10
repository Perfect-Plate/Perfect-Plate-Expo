import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const RecipeLoadingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Re</Text>
      </View> */}

      {/* Centered Content */}
      <View style={styles.centeredContent}>
        <ActivityIndicator
          size="large"
          color="#F4A691"
          style={styles.largeIndicator}
        />
        <Text style={styles.message}>Crafting your personalized recipe...</Text>
      </View>
    </View>
  );
};

export default RecipeLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  //   header: {
  //     height: 110,
  //     backgroundColor: "#FFF",
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     paddingHorizontal: 16,
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#DDD",
  //   },
  //   backButton: {
  //     position: "absolute",
  //     left: 16,
  //   },
  //   backArrow: {
  //     fontSize: 24,
  //     color: "#1B1918",
  //     marginTop: 50,
  //   },
  //   headerTitle: {
  //     fontSize: 20,
  //     fontFamily: "Poppins",
  //     fontWeight: "400",
  //     textAlign: "center",
  //     color: "#1B1918",
  //     marginTop: 50,
  //   },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  largeIndicator: {
    transform: [{ scale: 2 }], // Scale the spinner to make it significantly larger
    marginBottom: 32,
  },
  message: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    marginTop: 32,
  },
});
