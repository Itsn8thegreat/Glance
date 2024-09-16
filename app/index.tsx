import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';


const App = () => {
  const [isMember, setIsMember] = useState(false);

  const handleMemberPress = () => {
    const url = 'https://banner-ssb-prod.manhattan.edu/BannerGeneralSsb/ssb/general#/home';
    Linking.openURL(url);
  };
  const handleGuestPress = () => {
    setIsMember(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 75, color: '#008000', fontFamily: 'MP-Bold', textAlign: 'center', lineHeight: 75
        }}>GLANCE</Text>
      <Text style={{ fontSize: 15, color: 'gray', fontFamily: 'MP-BoldIt', textAlign: 'center', lineHeight: 15, marginVertical: 5
        }}>Manhattan College App for Faculty and Students</Text>
      <TouchableOpacity
        style={{
          width: '75%',
          paddingVertical: 10,
          backgroundColor: 'green',
          borderRadius: 5,
          marginVertical: 5,
          textAlign: 'center',
        }}
        onPress={handleMemberPress}>
        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'MP-Bold', textAlign: 'center' }}>Sign In</Text>
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
        onPress={handleGuestPress}>
        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'MP-Bold', textAlign: 'center' }}>Visitor</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
