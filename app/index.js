import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './Navigation/AppTabs';
import MainScreen from './screens/MainScreen';
import WebviewScreen from './Components/WebviewScreen';

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="MainScreen">
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="WebviewScreen" component={WebviewScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

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

export default App;
