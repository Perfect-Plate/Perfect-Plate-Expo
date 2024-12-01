import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

import { useRouter } from "expo-router";
import {getMultipleStoredData} from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();

  // Helper function to randomize opacity
  const getRandomOpacity = () => {
    const opacities = [0.7, 0.6, 0.5, 0.4, 0.3];
    return opacities[Math.floor(Math.random() * opacities.length)];
  };
  // useEffect(() => {
  //   const clearData = async () => {
  //     await AsyncStorage.clear();
  //   }
  //   clearData().then(r => {});
  // }, []);

  return (
    <View style={styles.container}>
      {/* Top Section with Single Background Image */}
      <View style={styles.topSection}>
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.fullScreenImage}
        />
      </View>

      {/* Bottom Section */}
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
            onPress={() => {
              router.push({
                pathname: "/nutrition",
            })}}
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
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  bottomSection: {
    flex: 0.8,
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
