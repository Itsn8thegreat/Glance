import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { isValidEmail } from '../utils/validation'; // Importing email validation utility
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Ensure correct import path for Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as FileSystem from 'expo-file-system';

const MainScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const fileUri = FileSystem.documentDirectory + 'editme.json';

  const saveDataToFile = async () => {
    const data = {
      username: email.split('@')[0],
      password: password,
    };

    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 4));
      console.log('Data saved to editme.json');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const readDataFromFile = async () => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      const data = JSON.parse(fileContents);
      console.log('Data read from editme.json:', data);
      return data; // This returns the data if you want to use it elsewhere
    } catch (error) {
      console.error('Error reading data:', error);
    }
  };

  // Email validation and Firebase login
  const handleLoginPress = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (password === '') {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Firebase sign-in
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      await saveDataToFile();
      await readDataFromFile();
      navigation.replace('AppTabs'); // Navigate to AppTabs upon successful login
    } catch (error) {
      alert('Login failed: ' + "User not registered"); // Display error to user
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GLANCE</Text>
      <Text style={styles.subtitle}>Manhattan College Students and Faculty App</Text>

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="gray"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 75,
    color: '#008000',
    textAlign: 'center',
    lineHeight: 75,
  },
  subtitle: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  loginButton: {
    width: '80%',
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default MainScreen;