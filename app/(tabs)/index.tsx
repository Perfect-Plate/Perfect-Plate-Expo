import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image source={require('@/assets/images/Image.png')} style={styles.image} />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to PerfectPlates!</Text>
      <Text style={styles.subtitle}>Plan your meals with PerfectPlates</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text style={styles.signInLink}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9443F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    color: '#E9443F',
    fontWeight: 'bold',
  },
});
