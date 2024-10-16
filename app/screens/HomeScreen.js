import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Import your Firebase config

const HomeScreen = ({ navigation }) => {
  const [barcodeUrl, setBarcodeUrl] = useState('');

  // Retrieve the currently logged-in user's UID (unique identifier)
  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const userId = user.uid; // Get the user's unique ID (UID)

      // Generate the barcode URL using BWIPJS API
      const generatedBarcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${userId}&scale=5&includetext=true&guardwhitespace=true`;
      setBarcodeUrl(generatedBarcodeUrl); // Set the barcode image URL
    }
  }, []);

  // Define an array of images for the buttons
  const buttonImages = [
    'https://via.placeholder.com/70', // Image for Button 1
    'https://via.placeholder.com/70', // Image for Button 2
    'https://via.placeholder.com/70', // Image for Button 3
    'https://via.placeholder.com/70', // Image for Button 4
    'https://via.placeholder.com/70', // Image for Button 5
    'https://via.placeholder.com/70', // Image for Button 6
    'https://via.placeholder.com/70', // Image for Button 7
    'https://via.placeholder.com/70', // Image for Button 8
  ];

  // Function to handle button press and navigate to a new screen
  const handleButtonPress = (index) => {
    // Example: Navigate to a specific screen based on the button index
    switch (index) {
      case 0:
        navigation.navigate('Social'); // Navigate to Screen1 when Button 1 is pressed
        break;
      case 1:
        navigation.navigate('Screen2'); // Navigate to Screen2 when Button 2 is pressed
        break;
      // Add similar cases for other buttons/screens
      default:
        console.log(`Button ${index + 1} pressed`);
    }
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>GLANCE</Text>
      <Text style={styles.subtitle}>Manhattan College Students and Faculty App</Text>

      {/* Display the barcode */}
      <View style={styles.barcodeContainer}>
        {barcodeUrl ? (
          <Image source={{ uri: barcodeUrl }} style={styles.barcodeImage} />
        ) : (
          <Text style={styles.barcodeText}>No barcode available</Text>
        )}
      </View>

      {/* 2x4 Grid of Buttons */}
      <View style={styles.numberPad}>
        {buttonImages.map((imageUri, i) => (
          <TouchableOpacity
            key={i}
            style={styles.numberButton}
            onPress={() => handleButtonPress(i)} // Navigate to the corresponding screen
          >
            <Image
              source={{ uri: imageUri }} // Display image for each button
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Inside Manhattan Button */}
      <TouchableOpacity
        style={styles.insideManhattanButton}
        onPress={() =>
          navigation.navigate('WebviewScreen', {
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
          navigation.navigate('WebviewScreen', { url: 'https://manhattan.edu/events.php' })
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
  barcodeImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  barcodeText: {
    fontSize: 18,
    marginTop: 10,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    backgroundColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  insideManhattanButton: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: 'green',
    borderRadius: 20,
    marginVertical: 10,
  },
  insideManhattanText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  eventsButton: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    marginVertical: 10,
  },
  eventsText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
