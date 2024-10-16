import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Ensure correct import path for Firebase config
import { signOut } from 'firebase/auth';

const SettingsScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(null);
  const auth = FIREBASE_AUTH;

  // Retrieve the currently logged-in user's email
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail('No user signed in');
    }
  }, []);

  // Handle user sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('MainScreen'); // Navigate back to login screen after sign-out
    } catch (error) {
      console.error('Error signing out: ', error);
      alert('Sign out failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Display the user's email */}
      <Text style={styles.emailText}>Logged in as: {userEmail}</Text>

      {/* Sign out button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#008000',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
