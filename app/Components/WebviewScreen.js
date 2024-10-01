import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const WebviewScreen = ({ navigation, route }) => {
  const { url } = route.params;
  const webViewRef = useRef(null); // Reference for the WebView to control back/forward actions
  const [currentUrl, setCurrentUrl] = useState(url); // State to track current URL
  const [canGoBack, setCanGoBack] = useState(false); // State to track if WebView can go back
  const [canGoForward, setCanGoForward] = useState(false); // State to track if WebView can go forward

  // Function to handle share button
  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this link: ${currentUrl}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // Function to handle navigation state change
  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with Done, URL, and Refresh */}
      <View style={styles.topBar}>
        {/* Done Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topButton}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>

        {/* URL in the center */}
        <TextInput
          style={styles.urlBar}
          value={currentUrl}
          editable={false}
          placeholder="Loading..."
        />

        {/* Refresh Button */}
        <TouchableOpacity onPress={() => webViewRef.current.reload()} style={styles.topButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        onNavigationStateChange={onNavigationStateChange} // Listen to navigation state changes
        style={styles.webview}
      />

      {/* Bottom bar with Back, Forward, and Share */}
      <View style={styles.bottomBar}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => webViewRef.current.goBack()}
          disabled={!canGoBack} // Disable when can't go back
          style={styles.bottomButton}
        >
          <Ionicons name="play-back" size={24} color={canGoBack ? 'black' : 'gray'} />
        </TouchableOpacity>

        {/* Forward Button */}
        <TouchableOpacity
          onPress={() => webViewRef.current.goForward()}
          disabled={!canGoForward} // Disable when can't go forward
          style={styles.bottomButton}
        >
          <Ionicons name="play-forward" size={24} color={canGoForward ? 'black' : 'gray'} />
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity onPress={onShare} style={styles.bottomButton}>
          <Ionicons name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f8f8f8',
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  urlBar: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  bottomButton: {
    padding: 10,
  },
});

export default WebviewScreen;
