import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { vehicleListings } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

export default function AvailableVehiclesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Vehicles</Text>
        <Text style={styles.headerSubtitle}>{vehicleListings.length} vehicles found nearby</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {vehicleListings.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              (navigation as any).navigate('BookVehicle', {
                vehicle: {
                  model: item.vehicleModel,
                  number: item.registrationNumber,
                  location: `${item.location.latitude.toFixed(4)}, ${item.location.longitude.toFixed(4)}`,
                  dailyRate: item.estimatedPrice,
                  hourlyRate: Math.round(item.estimatedPrice / 8),
                },
              })
            }
          >
            <View style={styles.cardHeader}>
              <View style={styles.vehicleIconWrap}>
                <Text style={styles.vehicleIcon}>🚛</Text>
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.name}>{item.vehicleModel}</Text>
                <Text style={styles.regNo}>{item.registrationNumber}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Capacity</Text>
                <Text style={styles.detailValue}>{item.capacityKg} kg</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Owner</Text>
                <Text style={styles.detailValue}>{item.ownerName}</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={[
                  styles.statusText,
                  { color: item.availability ? colors.success : colors.danger }
                ]}>
                  {item.availability ? 'Ready' : 'Busy'}
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.priceLabel}>Daily Rate</Text>
                <Text style={styles.priceValue}>₹{item.estimatedPrice}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !item.availability && { backgroundColor: colors.textMuted }
                ]}
                disabled={!item.availability}
                onPress={() =>
                  (navigation as any).navigate('BookVehicle', {
                    vehicle: {
                      model: item.vehicleModel,
                      number: item.registrationNumber,
                      location: `${item.location.latitude.toFixed(4)}, ${item.location.longitude.toFixed(4)}`,
                      dailyRate: item.estimatedPrice,
                      hourlyRate: Math.round(item.estimatedPrice / 8),
                    },
                  })
                }
              >
                <Text style={styles.bookButtonText}>
                  {item.availability ? 'Book Now →' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  vehicleIcon: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  regNo: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F57F17',
  },
  detailsGrid: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});