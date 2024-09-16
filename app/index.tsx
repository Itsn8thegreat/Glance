import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const Manhattan_Login = 'https://banner-ssb-prod.manhattan.edu/BannerGeneralSsb/ssb/general#/home';

const App = () => {
  const [isMember, setIsMember] = useState(false);

  const handleMemberPress = () => {
    console.log("Sign In pressed");
    setIsMember(true);
  };

  const handleGuestPress = () => {
    console.log("Visitor pressed");
    setIsMember(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isMember ? (
        <WebView 
          style={{ flex: 1 }}
          source={{ uri: Manhattan_Login }}
          onError={(e) => console.log('WebView Error', e.nativeEvent)}
          startInLoadingState={true}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 75, color: '#008000', fontFamily: 'MP-Bold', textAlign: 'center', lineHeight: 75 }}>
            GLANCE
          </Text>
          <Text style={{ fontSize: 15, color: 'gray', fontFamily: 'MP-BoldIt', textAlign: 'center', lineHeight: 15, marginVertical: 5 }}>
            Manhattan College App for Faculty and Students
          </Text>
          <TouchableOpacity
            style={{
              width: '75%',
              paddingVertical: 10,
              backgroundColor: 'green',
              borderRadius: 5,
              marginVertical: 5,
              textAlign: 'center',
            }}
            onPress={handleMemberPress}
          >
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'MP-Bold', textAlign: 'center' }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '75%',
              paddingVertical: 10,
              backgroundColor: '#008000',
              borderRadius: 5,
              marginVertical: 5,
              textAlign: 'center',
            }}
            onPress={handleGuestPress}
          >
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'MP-Bold', textAlign: 'center' }}>
              Visitor
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
