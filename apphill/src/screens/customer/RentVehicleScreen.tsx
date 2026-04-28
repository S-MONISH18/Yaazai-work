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
import Animated, { FadeInDown } from 'react-native-reanimated';
import { vehicleListings } from '../../data/mockData';
import colors from '../../theme/colors';

export default function RentVehicleScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vehicle Fleet</Text>
        <Text style={styles.headerSubtitle}>Rent premium logistics for your farm</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {vehicleListings.map((item, index) => (
          <Animated.View 
            key={item.id} 
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.vIconBg}>
                <Text style={styles.vIcon}>🚚</Text>
              </View>
              <View style={styles.headerMain}>
                <Text style={styles.name}>{item.vehicleModel}</Text>
                <Text style={styles.subText}>{item.vehicleType} • {item.registrationNumber}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>CAPACITY</Text>
                <Text style={styles.detailValue}>{item.capacityKg}kg</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>DAILY RATE</Text>
                <Text style={styles.detailValue}>₹{item.estimatedPrice}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>TRIPS</Text>
                <Text style={styles.detailValue}>{(item as any).trips || 45}+</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.bookBtn, !item.availability && styles.disabledBtn]}
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
              <Text style={styles.bookBtnText}>
                {item.availability ? 'Book This Vehicle' : 'Currently Busy'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vIcon: {
    fontSize: 24,
  },
  headerMain: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  subText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.gold,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F7F5',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  bookBtn: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  disabledBtn: {
    backgroundColor: colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  bookBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
});