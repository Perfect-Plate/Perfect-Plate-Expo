import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
        <Text style={styles.backArrowText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Image at the top */}
      <Image
        source={require("@/assets/images/Image.png")}
        style={styles.image}
      />

      {/* Welcome Back Text */}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Sign in to continue planning your meals
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backArrowText: {
    color: '#E9443F',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#E9443F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    color: "#E9443F",
    fontWeight: "bold",
  },
});
