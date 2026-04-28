import React, { useState, useRef, useMemo } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import MapComponent from '../../components/MapComponent';
import BookingBottomSheet from '../../components/BookingBottomSheet';
import { vehicleListings } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const { width, height } = Dimensions.get('window');

export default function CustomerDashboardScreen({ navigation }: any) {
  const [weight, setWeight] = useState('');
  const [search, setSearch] = useState('');

  const pickupLocation = { latitude: 11.0168, longitude: 76.9558 };
  const dropLocation = { latitude: 11.02, longitude: 76.96 };

  const handleBook = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum < 25) {
      Alert.alert('Load Too Small', 'Minimum load weight for booking is 25kg.');
      return;
    }

    const eligibleVehicles = vehicleListings.filter(v => v.capacityKg >= weightNum);
    if (eligibleVehicles.length === 0) {
      Alert.alert('No Vehicles', 'We couldn\'t find vehicles for this heavy load.');
      return;
    }

    Alert.alert('Success ✅', `Assigned ${eligibleVehicles[0].vehicleModel}. Driver is on the way!`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Floating Header UI */}
      <SafeAreaView style={styles.floatingHeader} edges={['top']}>
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
              style={styles.searchInput}
              placeholder="Search destination market..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.locationChipContainer}>
          <TouchableOpacity style={styles.locationChip}>
            <Text style={styles.chipEmoji}>📍</Text>
            <Text style={styles.chipText}>Pollachi Farm</Text>
          </TouchableOpacity>
          <View style={styles.chipArrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
          <TouchableOpacity style={styles.locationChip}>
            <Text style={styles.chipEmoji}>🛒</Text>
            <Text style={styles.chipText}>Salem Market</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapComponent 
          vehicles={vehicleListings} 
          pickupLocation={pickupLocation} 
          dropLocation={dropLocation} 
        />
      </View>

      {/* Bottom Sheet UI */}
      <BookingBottomSheet 
        weight={weight}
        setWeight={setWeight}
        estimatedPrice={1850}
        vehicleCount={vehicleListings.length}
        onBook={handleBook}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  searchContainer: {
    marginBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 16,
  },
  locationChipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  chipEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  chipArrow: {
    opacity: 0.6,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  mapContainer: {
    flex: 1,
  },
});