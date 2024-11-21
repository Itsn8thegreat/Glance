import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import restaurantData from "/Users/stefan/Glance/app/services/restaurants/mock/san_francisco.json"; // Adjust path as needed

export const RestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Load restaurant data
    setRestaurants(restaurantData.results);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants Near Manhattan University</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.icon }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Address: </Text>
              {item.vicinity}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Rating: </Text>
              {item.rating} ⭐ ({item.user_ratings_total} reviews)
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Currently Open: </Text>
              {item.opening_hours?.open_now ? "Yes" : "No"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "green",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "white",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default RestaurantsScreen;
