import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export const MapScreen = () => {
  const initialRegion = {
    latitude: 40.8901,
    longitude: -73.9011,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState(initialRegion);

  const navigation = useNavigation();

  const navigateToWebView = (url) => {
    navigation.navigate('WebviewScreen', { url });
  };

  const openMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    navigateToWebView(url);
  };

  const buildings = [
    { id: '1', name: 'Alumni Hall', latitude: 40.89096, longitude: -73.90113 },
    { id: '2', name: 'De La Salle Hall', latitude: 40.890239, longitude: -73.901677 },
    { id: '3', name: 'Hayden Hall', latitude: 40.88934, longitude: -73.90096 },
    { id: '4', name: 'Higgins Engineering and Science Center', latitude: 40.886173, longitude: -73.902120 },
    { id: '5', name: 'Kelly Commons', latitude: 40.88872, longitude: -73.90293 },
    { id: '6', name: 'Leo Hall', latitude: 40.88653, longitude: -73.90153 },
    { id: '7', name: 'McGovern Plaza', latitude: 40.889973, longitude: -73.901234 },
    { id: '8', name: 'McNeil Courtyard', latitude: 40.889607, longitude: -73.902170 },
    { id: '9', name: 'Memorial Hall', latitude: 40.88975, longitude: -73.90186 },
    { id: '10', name: 'Miguel Hall', latitude: 40.889784, longitude: -73.901402 },
    { id: '11', name: 'OMalley Library', latitude: 40.88981, longitude: -73.90061 },
    { id: '12', name: 'Quadrangle', latitude: 40.889989, longitude: -73.901671 },
    { id: '13', name: 'Research & Learning Center', latitude: 40.88613, longitude: -73.90078 },
    { id: '14', name: 'Smith Auditorium / Chapel of DeLaSalle', latitude: 40.89035, longitude: -73.90121 },
    { id: '15', name: 'Thomas Hall', latitude: 40.89012, longitude: -73.90090 },
    { id: '16', name: 'Walsh Plaza', latitude: 40.890608, longitude: -73.901123 },
    { id: '17', name: 'Draddy Gymnasium', latitude: 40.89102, longitude: -73.90031 },
    { id: '18', name: 'Chrysostom Hall', latitude: 40.89064, longitude: -73.90162 },
    { id: '19', name: 'Horan Hall', latitude: 40.89094, longitude: -73.89902 },
    { id: '20', name: 'Jasper Hall', latitude: 40.89057, longitude: -73.90210 },
    { id: '21', name: 'Thomas Lee Hall', latitude: 40.89041, longitude: -73.89973 },
    { id: '22', name: 'Broadway Parking Garage', latitude: 40.88852, longitude: -73.89952 },
  ];

  const handleSearch = (text) => {
    setSearchTerm(text);
    
    const building = buildings.find(b => b.name.toLowerCase() === text.toLowerCase());
    if (building) {
      setRegion({
        latitude: building.latitude,
        longitude: building.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      });
    } else {
      setRegion(initialRegion); // Reset if no building is found
    }
  };

  const renderCustomMarker = (building) => (
    <Marker
      key={building.id}
      coordinate={{ latitude: building.latitude, longitude: building.longitude }}
      onPress={() => openMaps(building.latitude, building.longitude)}
    >
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
        <Text style={styles.markerText}>{building.name}</Text>
      </View>
    </Marker>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a building..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <MapView style={{ flex: 1 }} region={region}>
        {buildings.map(renderCustomMarker)}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: 'green',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 12,
    height: 12,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  markerText: {
    color: 'green',
    fontSize: 16,
    marginTop: 4,
  },
});

export default MapScreen;
