import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen.js';
import RestaurantsScreen from '../screens/restaurants.js';
import Map from '../screens/Map';
import Settings from '../screens/Settings.js';
import {StatusBar} from 'expo-status-bar';
import { useState } from  'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ThemeProvider } from "styled-components/native";
import { theme } from "../infrastructure/theme/index.js";
import { RestaurantsContextProvider } from "../services/restaurants/restaurants.context.js";



const Tab = createBottomTabNavigator();

const wrappedRestaurant = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsContextProvider>
          <RestaurantsScreen />
        </RestaurantsContextProvider>
      </ThemeProvider>
    </>
  );
 };
 

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'HomeScreen') {
          iconName = 'home';
        } else if (route.name === 'RestaurantsScreen') {
          iconName = 'restaurant-sharp';
        } else if (route.name === 'Map') {
          iconName = 'map';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="RestaurantsScreen" component={wrappedRestaurant} options={{ headerShown: false }} />
    <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AppTabs;
