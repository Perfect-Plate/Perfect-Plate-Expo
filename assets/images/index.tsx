import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image source={require('@/assets/images/Image.png')} style={styles.image} />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to PerfectPlates!</Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push('/sign-up')}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text style={styles.signInLink} onPress={() => router.push('/sign-in')}>Sign In</Text>
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
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  getStartedButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9443F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedButtonText: {
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
