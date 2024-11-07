import React from "react";
import styled from "styled-components/native"
import { Text, Image, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";


import star from "../assets/star";
import open from "../assets/open";


const RestaurantCard = styled(Card)`
   background-color: white;
   margin-bottom: ${(props) => props.theme.space[3]};
`;


const RestaurantCardCover = styled(Card.Cover)`
   padding: ${(props) => props.theme.space[2]};
   background-color: white;
`;


const Title = styled(Text)`
   font-size: ${(props) => props.theme.fontSizes.body};
   padding: 16px;
   color: green;
`;


const Address = styled(Text)`
   padding: 16px;
   color:green;
`;


const Rating = styled.View`
   padding: 16px;
   flex-direction:row;
`;


const Section = styled.View`
   flex-direction: row;
   align-items: center;
`;


const SectionEnd = styled.View`
   flex:  1;
   flex-direction: row;
   justify-content: flex-end;
`;




export const RestaurantInfoCard = ({ restaurant = {} }) => {
   const {
       name = 'Some Restaurant',
       icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
       photos = [
           "https://foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
       ],
       address = "100 some random street",
       isOpenNow = true ,
       rating = 4,
       isClosedTemporarily = true,
   } = restaurant;
   const ratingArray = Array.from(new Array(Math.floor(rating)));
   return (
       <RestaurantCard elevation={5}>
           <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
               <Title>{name}</Title>
               <Section>
                   <Rating>
                       {ratingArray.map(() => (
                       <SvgXml xml={star} width={20} height={20}/>
                       ))}
                   </Rating>
                   <SectionEnd>
                       {isClosedTemporarily && (
                           <Text variant = "label" style = {{  color: "red"}}>
                               CLOSED
                           </Text>
                       )}
                       <View style = {{paddingLeft:16}}/>
                       {isOpenNow && <SvgXml xml={open} width={35} height={35} />}
                       <View style = {{paddingLeft:16}}/>
                       <Image style={{ marginRight: 16, width: 30, height: 30 }} source={{ uri: icon }} />
                   </SectionEnd>
               </Section>
               <Address>{address}</Address>
       </RestaurantCard>
   );
};
