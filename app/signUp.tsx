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
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { signUp } from "@/api";
import { SignUpRequest } from "@/api/signUp";


export default function SignUpScreen() {
  const router = useRouter();
  const {from} = useLocalSearchParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showToast = async () => {
    Toast.show({
      type: "success",
      text1: "Sign Up Successful 🎉",
    });
  };

  const handleSignUp = async () => {
    try {
      const data = { firstName, lastName, username, email, password };
      const response = await signUp(data as SignUpRequest);

      if (response?.status === 200) {
        await showToast();
        router.push({
          pathname:"/signIn",
          params: {from},
        });
      } else {
        console.error("Error signing up:", response);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Backdrop */}
      <ImageBackground
        source={require("@/assets/images/signUpHeader.png")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Text style={styles.headerTitle}>
          Sign up to save your meal plans & recipes
        </Text>
      </ImageBackground>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.firstLastNameContainer}>
          {/* First Name */}
          <View style={[styles.inputGroup, styles.inputFirstName]}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          {/* Last Name */}
          <View style={[styles.inputGroup, styles.inputLastName]}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {/* Other Inputs */}
        <View style={styles.inputsContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
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
            <Text style={styles.passwordHint}>
              Password must be at least 8 characters with one uppercase letter
              and one number
            </Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push({
            pathname:"/signIn",
            params: {from},
          })}>
            <Text style={styles.signInLink}>Sign in</Text>
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
    height: 192,
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
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  firstLastNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputFirstName: {
    marginRight: 4,
    flex: 1,
  },
  inputLastName: {
    marginLeft: 4,
    flex: 1,
  },
  inputsContainer: {
    marginBottom: "auto",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#1B1918",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    marginBottom: 8,
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
  passwordHint: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#737170",
    marginTop: 8,
  },
  signUpButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  signUpButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
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
  },
  signInLink: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#E36714",
  },
});
