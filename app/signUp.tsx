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
import Toast from 'react-native-toast-message';
import { signUp } from "@/api";
import {SignUpRequest} from "@/api/signUp";

export default function SignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showToast = async  () => {
    Toast.show({
      type: 'success',
      text1: 'Sign Up Successful 🎉',
    });
  }

  const handleSignUp = async () => {
    try {
      const data = { firstName, lastName, username, email, password };
      const response = await signUp(data as SignUpRequest);

      if (response?.status === 200) {
        await showToast();
        router.push("/signIn");
      }else {
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
          Sign up to save your personalized meal plans & recipes
        </Text>
      </ImageBackground>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* First and Last Name Row */}
        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, styles.inputFirstName]}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
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

        {/* Username Field */}
        <View style={[styles.inputGroup, styles.usernameSection]}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Email Field */}
        <View style={[styles.inputGroup, styles.emailSection]}>
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
        <View style={[styles.inputGroup, styles.passwordSection]}>
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
            Password must be at least 8 characters with one uppercase letter and
            one number
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  inputFirstName: {
    marginRight: 4,
  },
  inputLastName: {
    marginLeft: 4,
  },
  inputGroup: {
    flex: 1,
  },
  usernameSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  emailSection: {
    marginBottom: 16,
  },
  passwordSection: {
    marginBottom: 48,
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
    marginBottom: 16,
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
    marginBottom: 48,
  },
  signInLink: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#E36714",
    marginBottom: 48,
  },
});
