import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Social = () => {
  const navigation = useNavigation();

  // Function to open social media links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>SOCIALS</Text>

      {/* Social Media Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://twitter.com')}>
          <Text style={styles.buttonText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://youtube.com')}>
          <Text style={styles.buttonText}>YouTube</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://instagram.com')}>
          <Text style={styles.buttonText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://x.com')}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Feed Title */}
      <Text style={styles.feedTitle}>FEED</Text>

      {/* Feed Boxes */}
      <View style={styles.feedContainer}>
        <View style={styles.feedBox} />
        <View style={styles.feedBox} />
        <View style={styles.feedBox} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'black',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  feedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 20,
  },
  feedContainer: {
    width: '90%',
  },
  feedBox: {
    height: 100,
    backgroundColor: 'black',
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Social;
