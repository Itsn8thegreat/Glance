import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Placeholder components
const Settings = () => <Text>Settings</Text>;
const Dining = () => <Text>Dining</Text>;
const Map = () => <Text>Map</Text>;

// WebView component with Back Button functionality
const WebViewScreen = ({ route, navigation }) => {
  const { url } = route.params;
  const webViewRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={(navState) => {
          if (!navState.canGoBack) {
            BackHandler.exitApp();
          }
        }}
      />
    </View>
  );
};

// Home screen
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>GLANCE</Text>
      <Text style={styles.subtitle}>Manhattan College Students and Faculty App</Text>

      {/* Barcode Placeholder */}
      <View style={styles.barcodeContainer}>
        <View style={styles.barcodePlaceholder} />
        <Text style={styles.barcodeText}>62772206580147914</Text>
      </View>

      {/* 2x4 Grid of Buttons */}
      <View style={styles.numberPad}>
        {[...Array(8)].map((_, i) => (
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
      <TouchableOpacity
        style={styles.insideManhattanButton}
        onPress={() =>
          navigation.navigate('WebViewScreen', {
            url: 'https://inside.manhattan.edu/index.php?test=1&q=&hPP=200&idx=TasksServices&p=0&hFR[category][0]=Featured&is_v=1',
          })
        }
      >
        <Text style={styles.insideManhattanText}>INSIDE MANHATTAN</Text>
      </TouchableOpacity>

      {/* Events Button */}
      <TouchableOpacity
        style={styles.eventsButton}
        onPress={() =>
          navigation.navigate('WebViewScreen', { url: 'https://manhattan.edu/events.php' })
        }
      >
        <Text style={styles.eventsText}>EVENTS</Text>
      </TouchableOpacity>
    </View>
  );
};

// Email validation function
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

    // Validate password
    if (password === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    }

    // If valid, navigate to the App tabs screen
    if (valid) {
      navigation.replace('AppTabs');
    }
  };

  return (
    <View style={[styles.homeContainer, { backgroundColor: '#ffffff' }]}>
    <Text style={styles.title}>GLANCE</Text>
    <Text style={styles.subtitle}>Manhattan College Students and Faculty App</Text>
    {/* Your other components */}

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

        if (route.name === 'HomeTab') {
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
    }}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Dining" component={Dining} options={{ headerShown: false }} />
    <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
  </Tab.Navigator>
);

// Stack for MainScreen (Sign In) and Home screen (no tabs)
const AppStack = () => (
  <Stack.Navigator initialRouteName="MainScreen">
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Main app component
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden={false} />
      <NavigationContainer independent={true}>
        <AppStack />
      </NavigationContainer>
    </SafeAreaView>

  );
};

// Styles
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
    width: '80%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  numberButton: {
    width: 70,
    height: 60,
    backgroundColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15, // Rounded edges
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  insideManhattanButton: {
    width: '75%',
    paddingVertical: 15, // Increased padding for larger button
    backgroundColor: 'green',
    borderRadius: 20, // Curved edges
    marginVertical: 10,
  },
  insideManhattanText: {
    fontSize: 20, // Increased font size
    color: 'white',
    textAlign: 'center',
  },
  eventsButton: {
    width: '75%',
    paddingVertical: 15, // Increased padding for larger button
    backgroundColor: 'black',
    borderRadius: 20, // Curved edges
    marginVertical: 10,
  },
  eventsText: {
    fontSize: 20, // Increased font size
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
  backButton: {
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
  },
});

export default App;
