import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const HomeScreen = ({ navigation }) => {
  // Ensure navigation is defined
  if (!navigation) {
    console.error("Navigation prop is undefined");
    return null; // Return null if navigation is not defined
  }

  const navigateToWebView = (url) => {
    navigation.navigate('WebviewScreen', { url });
  };

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
          navigateToWebView('https://inside.manhattan.edu/index.php?test=1&q=&hPP=200&idx=TasksServices&p=0&hFR[category][0]=Featured&is_v=1')
        }
      >
        <Text style={styles.insideManhattanText}>INSIDE MANHATTAN</Text>
      </TouchableOpacity>

      {/* Events Button */}
      <TouchableOpacity
        style={styles.eventsButton}
        onPress={() =>
          navigateToWebView('https://manhattan.edu/events.php')
        }
      >
        <Text style={styles.eventsText}>EVENTS</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
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
});

export default HomeScreen;
