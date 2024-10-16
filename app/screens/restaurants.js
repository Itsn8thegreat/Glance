import React, { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { View, StatusBar, StyleSheet, SafeAreaView, FlatList } from "react-native";
import styled from "styled-components/native";
import { RestaurantsContext } from "../services/restaurants/restaurants.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from "../Components/restaurant-info-card.component";


const SafeArea = styled(SafeAreaView)`
   background-color: green;
   ${StatusBar.currentHeight && 'margin-top: ${StatusBar.currentHeight}px'};
`;


const SearchContainer = styled.View`
   padding: ${(props) => props.theme.space[3]};
`;


export const RestaurantsScreen = () => {
   const {isLoading, error, restaurants} = useContext(RestaurantsContext);


   return (
   <SafeArea>
       {isLoading && (
           <View style={{ position:"absolute", top:"300%", left:"50%"}}>
               <ActivityIndicator
                   size={50}
                   style={{ marginLeft: -25 }}
                   animating={true}
               />
           </View>
       )}
       <SearchContainer>
           <Searchbar />
       </SearchContainer>
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