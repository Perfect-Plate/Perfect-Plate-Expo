import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import SignIn, {SignInRequest} from "@/api/signIn";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storeData from "@/api/preference_form";

export default function SignInScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showToast = async  () => {
    Toast.show({
      type: 'success',
      text1: 'Sign Up Successful 🎉',
    });
  }

  return (
    <View style={styles.container}>
      {/* Header with Backdrop */}
      <ImageBackground
        source={require("@/assets/images/signInHeader.png")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        {/* Back Arrow */}
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Header Title */}
        <Text style={styles.headerTitle}>
          Sign in to access your meal plans & recipes
        </Text>
      </ImageBackground>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={
                  passwordVisible
                    ? require("@/assets/images/eye-slash.png")
                    : require("@/assets/images/eye.png")
                }
                style={styles.passwordToggleIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton}
                          onPress={async () => {
                            const signInRequest: SignInRequest = {
                              email: email,
                              password: password
                            }
                            const response = await SignIn(signInRequest);
                            if (response?.status === 200) {
                              await showToast();
                              await storeData("signed_in", {id: email, status: "true"});
                              router.push("/overview")
                            } else {
                              console.error("Error signing in:", response);                         }
                          }}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={async () => {
            router.push("/signUp")
          }
          }
            >
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    height: 236,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  headerImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 0.1,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 32,
    color: "#1B1918",
  },
  headerTitle: {
    color: "#1B1918",
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "left",
    marginTop: 60,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#1B1918",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderColor: "#8F8D8C",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#000",
    backgroundColor: "#FFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#8F8D8C",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  passwordInput: {
    flex: 1,
    height: 48,
    borderWidth: 0,
    paddingHorizontal: 16,
  },
  passwordToggle: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordToggleIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  signInButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  signInButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  signUpLink: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#E36714",
  },
});
