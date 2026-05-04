import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MapComponent from '../../components/MapComponent';
import BookingBottomSheet from '../../components/BookingBottomSheet';
import { vehicleListings } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

export default function CustomerDashboardScreen() {
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

      {/* Floating Header — Ola-style route planner card */}
      <SafeAreaView style={styles.floatingHeader} edges={['top']}>
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.routeCard}>
          {/* Pickup row */}
          <View style={styles.routeRow}>
            <View style={styles.greenDot} />
            <TextInput
              style={styles.routeInput}
              placeholder="Pickup location"
              placeholderTextColor={colors.textMuted}
              value="Pollachi Farm, Tamil Nadu"
              editable={false}
            />
            <TouchableOpacity style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.routeDivider} />

          {/* Destination row */}
          <View style={styles.routeRow}>
            <View style={styles.redDot} />
            <TextInput
              style={[styles.routeInput, styles.routeInputActive]}
              placeholder="Where do you want to go?"
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.swapBtn}>
              <Text style={styles.swapIcon}>⇵</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: spacing.sm,
  },
  // ── Route Card (Ola-style) ─────────────────────────────────
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  routeDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 28,
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#A5D6A7',
    marginRight: 12,
    flexShrink: 0,
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: '#FFCDD2',
    marginRight: 12,
    flexShrink: 0,
  },
  routeInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    paddingVertical: 0,
  },
  routeInputActive: {
    color: colors.textMuted,
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  swapBtn: {
    padding: 4,
  },
  swapIcon: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
  },
  // ── Map ────────────────────────────────────────────────────
  mapContainer: {
    flex: 1,
  },
});