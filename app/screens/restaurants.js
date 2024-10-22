import React, { useContext } from "react";
import { View, StatusBar, SafeAreaView, FlatList, Platform } from "react-native";
import styled from "styled-components/native";
import { RestaurantsContext } from "../services/restaurants/restaurants.context";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../Components/restaurant-info-card.component";
import { Search } from "../Components/search.component";


const SafeArea = styled(SafeAreaView)`
   background-color: green;
   flex: 1;
`;

export const RestaurantsScreen = () => {
   const {isLoading, restaurants} = useContext(RestaurantsContext);
   const marginTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
   return (
   <SafeArea style={{ marginTop }}>
       {isLoading && (
           <View style={{ position:"absolute", top:"300%", left:"50%"}}>
               <ActivityIndicator
                   size={50}
                   style={{ marginLeft: -25 }}
                   animating={true}
               />
           </View>
       )}
       <Search />
       <FlatList
           data={restaurants}
           renderItem = {({ item }) => {
               return (
           <RestaurantInfoCard restaurant={item}/>
       );}}
           keyExtractor={(item) => item.name}
           contentContainerStyle={{ padding: 16 }}
       />
   </SafeArea>
   )
};export default RestaurantsScreen;