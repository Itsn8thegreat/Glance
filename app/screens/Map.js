import React, { useContext, useState, useEffect} from 'react';
import MapView from "react-native-maps";

export const MapScreen = () => {
  const initialRegion = {
    latitude: 40.8901,
    longitude: -73.9011,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  return (
    <>
      <MapView
    style = {{ height: "100%" }}
    initialRegion={initialRegion}
      />
    </>
  );
};

export default MapScreen;