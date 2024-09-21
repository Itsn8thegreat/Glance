import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Placeholder components
const Settings = () => <Text>Settings</Text>;
const Dining = () => <Text>Dining</Text>;
const Map = () => <Text>Map</Text>;

// Home screen from the image you provided
const HomeScreen = () => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>GLANCE</Text>
      <Text style={styles.subtitle}>Manhattan College Students and Faculty App</Text>

      {/* Barcode Placeholder */}
      <View style={styles.barcodeContainer}>
        <View style={styles.barcodePlaceholder} />
        <Text style={styles.barcodeText}>62772206580147914</Text>
      </View>

      {/* 2x3 Grid of Square Buttons */}
      <View style={styles.numberPad}>
        {[...Array(6)].map((_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.numberButton}
            onPress={() => console.log(`Button ${i + 1} pressed`)}
          >
            <Text style={styles.buttonText}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inside Manhattan Button */}
      <TouchableOpacity style={styles.insideManhattanButton}>
        <Text style={styles.insideManhattanText}>INSIDE MANHATTAN</Text>
      </TouchableOpacity>

      {/* Events Button */}
      <TouchableOpacity style={styles.eventsButton}>
        <Text style={styles.eventsText}>EVENTS</Text>
      </TouchableOpacity>
    </View>
  );
};

// Email validation function using regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Main screen with email/password input
const MainScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginPress = () => {
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    // Validate password (check if it's empty)
    if (password === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    }

    // If valid, navigate to the Home screen
    if (valid) {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>GLANCE</Text>
      <Text style={styles.subtitle}>Manhattan College App for Faculty and Students</Text>

      {/* Email input */}
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

      {/* Password input */}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="gray"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Bottom tab navigation for Home and Settings
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        } else if (route.name === 'Dining') {
          iconName = 'restaurant-sharp';
        } else if (route.name === 'Map') {
          iconName = 'map';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Dining" component={Dining} />
    <Tab.Screen name="Map" component={Map} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

// Stack for MainScreen (Sign In) and Home screen (no tabs)
const AppStack = () => (
  <Stack.Navigator initialRouteName="MainScreen">
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Main app component
const App = () => {
  return (
    <NavigationContainer independent={true}>
      <AppStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
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
    fontFamily: 'MP-BoldIt',
    textAlign: 'center',
    lineHeight: 15,
    marginVertical: 5,
  },
  barcodeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  barcodePlaceholder: {
    width: 200,
    height: 100,
    backgroundColor: '#C0C0C0',
  },
  barcodeText: {
    fontSize: 18,
    marginTop: 10,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '65%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  numberButton: {
    width: 80,
    height: 80,
    backgroundColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  insideManhattanButton: {
    width: '75%',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginVertical: 10,
  },
  insideManhattanText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  eventsButton: {
    width: '75%',
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginVertical: 10,
  },
  eventsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
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
    marginBottom: 10,
  },
  loginButton: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginVertical: 10,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
