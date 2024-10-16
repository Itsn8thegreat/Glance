import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen.js';
import Dining from '../screens/Dining';
import Map from '../screens/Map';
import Settings from '../screens/Settings.js';


const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'HomeScreen') {
          iconName = 'home';
        } else if (route.name === 'Dining') {
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
    <Tab.Screen name="Dining" component={Dining} options={{ headerShown: false }} />
    <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AppTabs;
