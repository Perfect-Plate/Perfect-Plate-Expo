import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  // Helper function to randomize opacity
  const getRandomOpacity = () => {
    const opacities = [0.7, 0.6, 0.5, 0.4, 0.3];
    return opacities[Math.floor(Math.random() * opacities.length)];
  };

  return (
    <View style={styles.container}>
      {/* Top Half with Images */}
      <View style={styles.topSection}>
        <ScrollView contentContainerStyle={styles.backdrop} horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.column}>
            <Image
              source={require("@/assets/images/food1.png")}
              style={[styles.image, styles.imageLarge, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food2.png")}
              style={[styles.image, styles.imageSmall, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food3.png")}
              style={[styles.image, styles.imageSmall, { opacity: getRandomOpacity() }]}
            />
          </View>
          <View style={styles.column}>
            <Image
              source={require("@/assets/images/food4.png")}
              style={[styles.image, styles.imageMedium, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food5.png")}
              style={[styles.image, styles.imageMedium, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food6.png")}
              style={[styles.image, styles.imageMedium, styles.shadow, { opacity: getRandomOpacity() }]}
            />
          </View>
          <View style={styles.column}>
            <Image
              source={require("@/assets/images/food7.png")}
              style={[styles.image, styles.imageSmall, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food8.png")}
              style={[styles.image, styles.imageLarge, { opacity: getRandomOpacity() }]}
            />
            <Image
              source={require("@/assets/images/food9.png")}
              style={[styles.image, styles.imageSmall, { opacity: getRandomOpacity() }]}
            />
          </View>
        </ScrollView>
      </View>

      {/* Bottom Half */}
      <View style={styles.bottomSection}>
        {/* Title */}
        <Text style={styles.title}>PerfectPlates</Text>
        <Text style={styles.subtitle}>
          Personalized meal plans, perfectly crafted for you
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push("/allergy")}
          >
            <Text style={styles.getStartedButtonText}>Get started</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signIn")}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  topSection: {
    flex: 1,
  },
  backdrop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  image: {
    borderRadius: 80,
  },
  imageLarge: {
    height: 216,
    width: 112,
    borderWidth: 2,
    borderColor: "#F4A691",
  },
  imageMedium: {
    height: 144,
    width: 112,
    borderWidth: 2,
    borderColor: "#B9D774",
  },
  imageSmall: {
    height: 112,
    width: 112,
  },
  shadow: {
    shadowColor: "#B2A7A4",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  bottomSection: {
    flex: .80,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontFamily: "SavoyeLetPlain",
    fontWeight: "400",
    color: "#1B1918",
    textAlign: "center",
    lineHeight: 48,
    paddingTop: 25,
  },
  subtitle: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    lineHeight: 36,
    marginTop: 16,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 32,
  },
  getStartedButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  getStartedButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 24,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
    lineHeight: 24,
  },
  signInLink: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#E36714",
    lineHeight: 24,
  },
});
