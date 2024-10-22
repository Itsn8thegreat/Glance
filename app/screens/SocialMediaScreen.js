import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview'; // Import WebView
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

//
// Import your images
const twitterIcon = require('../assets/twitter.png');
const youtubeIcon = require('../assets/youtube.png');
const instagramIcon = require('../assets/instagram.png');
const facebookIcon = require('../assets/facebook.png'); // Corrected variable name


const MainScreen = () => {
  const navigation = useNavigation();


  // Function to navigate to WebviewScreen with URL
  const navigateToWebView = (url) => {
    navigation.navigate('WebviewScreen', { url });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button (optional, if you want to allow navigation back) */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>


      <Text style={styles.header}>SOCIALS</Text>


      {/* Social Media Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => navigateToWebView('https://x.com/manhattanedu?lang=en')}>
          <Image source={twitterIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => navigateToWebView('https://www.youtube.com/@manhattanuniversityedu')}>
          <Image source={youtubeIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => navigateToWebView('https://www.instagram.com/manhattanedu/?hl=en')}>
          <Image source={instagramIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => navigateToWebView('https://www.facebook.com/ManhattanUniversityEdu/?_rdr')}>
          <Image source={facebookIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>


      {/* Instagram Feed WebView */}
      <View style={styles.feedContainer}>
        <WebView
          source={{ uri: 'https://www.instagram.com/manhattanedu/embed' }} // Embed Manhattan College's Instagram feed
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>


      {/* YouTube Video WebView */}
      <View style={styles.feedContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/fZzc7csCdB8' }} // Embed specific YouTube video
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Change to flex-start to position header and buttons at the top
    backgroundColor: 'white',
  },
  backButton: {
    alignSelf: 'flex-start', // Aligns back button to the start
    margin: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'black',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  feedContainer: {
    width: '100%', // Full width
    height: 400, // Adjust height as needed
    marginTop: 20, // Add space between buttons and feed
  },
  webview: {
    flex: 1,
  },
});


export default MainScreen;