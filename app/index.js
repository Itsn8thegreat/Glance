import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './Navigation/AppTabs';
import MainScreen from './screens/MainScreen';
import WebviewScreen from './Components/WebviewScreen';
import Social from './screens/SocialMediaScreen'; // Example screen
import { ThemeProvider } from "styled-components/native";
import { theme } from "./infrastructure/theme/index.js";
import { RestaurantsContextProvider } from "./services/restaurants/restaurants.context.js";
import { RestaurantsScreen } from "./screens/restaurants.js";
import ScheduleScreen from "./screens/ScheduleScreen.js";


const Stack = createStackNavigator();


const AppStack = () => (
  <Stack.Navigator initialRouteName="MainScreen">
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="WebviewScreen" component={WebviewScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Social" component={Social} options={{ headerShown: false }} />
    <Stack.Screen name="Restaurants" component={RestaurantsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);


const RestaurantsScreenWrapper = () => {
  return (
    <ThemeProvider theme={theme}>
      <RestaurantsContextProvider>
        <RestaurantsScreen />
      </RestaurantsContextProvider>
    </ThemeProvider>
  );
};


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden={false} />
      <NavigationContainer independent={true}>
        <AppStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});


export default App;
