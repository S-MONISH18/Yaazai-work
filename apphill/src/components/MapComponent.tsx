
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import colors from '../theme/colors';

interface Location {
  latitude: number;
  longitude: number;
}

interface Vehicle {
  id: string;
  vehicleModel: string;
  estimatedPrice: number;
  capacityKg: number;
  location: Location;
}

interface MapComponentProps {
  vehicles?: Vehicle[];
  pickupLocation?: Location;
  dropLocation?: Location;
}

// Custom Map Style for a cleaner look
const mapStyle = [
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }]
  }
];

export default function MapComponent({ vehicles = [], pickupLocation, dropLocation }: MapComponentProps) {
  const defaultRegion = {
    latitude: 11.0168,
    longitude: 76.9558,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={defaultRegion}
        customMapStyle={mapStyle}
      >
        {pickupLocation && (
          <Marker coordinate={pickupLocation} title="Pickup Point">
            <View style={[styles.markerContainer, { backgroundColor: colors.primary }]}>
              <Text style={styles.markerEmoji}>📍</Text>
            </View>
          </Marker>
        )}

        {dropLocation && (
          <Marker coordinate={dropLocation} title="Drop-off Point">
            <View style={[styles.markerContainer, { backgroundColor: colors.danger }]}>
              <Text style={styles.markerEmoji}>🏁</Text>
            </View>
          </Marker>
        )}

        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            coordinate={vehicle.location}
            title={vehicle.vehicleModel}
          >
            <View style={styles.vehicleMarker}>
              <Text style={styles.vehicleEmoji}>🚜</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerEmoji: {
    fontSize: 16,
  },
  vehicleMarker: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  vehicleEmoji: {
    fontSize: 18,
  },
});
