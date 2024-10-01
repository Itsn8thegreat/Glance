import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { isValidEmail } from '../utils/validation'; // Importing email validation utility

const MainScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginPress = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    // Validate password
    if (password === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    }

    // Navigate if valid
    if (valid) {
      navigation.replace('AppTabs');
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
        <Text style={styles.loginText}>Login</Text>
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
    fontFamily: 'MP-Bold',
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
