import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { vehicleListings, ACTIVE_TRIPS } from '../../data/mockData';
import colors from '../../theme/colors';

// ─── Utility ──────────────────────────────────────────────────────────────────
const maskPhoneNumber = (phone: string): string => {
  if (!phone || phone.length < 10) return phone;
  const cleaned = phone.replace(/\D/g, '');
  return `+91 ${cleaned.slice(0, 2)}***  **${cleaned.slice(-3)}`;
};

const callNumber = (phone: string, name: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const url = `tel:${cleaned}`;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Call', `Calling ${name} at ${phone}`);
    }
  });
};

// ─── Live Tracking Card ───────────────────────────────────────────────────────
function LiveTrackingCard({ trip }: { trip: any }) {
  const [driverRevealed, setDriverRevealed] = useState(false);
  const [farmerRevealed, setFarmerRevealed] = useState(false);

  const progressPercent = Math.round(trip.progress * 100);

  return (
    <Animated.View entering={FadeInUp.duration(600).springify()} style={styles.trackCard}>
      {/* Header Badge */}
      <View style={styles.trackHeaderRow}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveBadgeText}>LIVE</Text>
        </View>
        <Text style={styles.trackStatusText}>{trip.status}</Text>
        <View style={styles.etaBadge}>
          <Text style={styles.etaText}>ETA {trip.eta}</Text>
        </View>
      </View>

      {/* Route */}
      <View style={styles.routeRow}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.routeDotOrigin]} />
          <Text style={styles.routeLabel}>FROM</Text>
          <Text style={styles.routeCity}>{trip.origin}</Text>
        </View>
        <View style={styles.routeLineWrap}>
          <View style={styles.routeLine} />
          <Text style={styles.routeArrow}>🚚</Text>
          <View style={styles.routeLine} />
        </View>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, styles.routeDotDest]} />
          <Text style={styles.routeLabel}>TO</Text>
          <Text style={styles.routeCity}>{trip.destination}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressPct}>{progressPercent}% Completed</Text>
          <Text style={styles.progressStart}>Started {trip.tripStartTime}</Text>
        </View>
      </View>

      {/* Cargo & Vehicle */}
      <View style={styles.infoRow}>
        <View style={styles.infoChip}>
          <Text style={styles.infoChipIcon}>📦</Text>
          <Text style={styles.infoChipText}>{trip.cargo}</Text>
        </View>
        <View style={styles.infoChip}>
          <Text style={styles.infoChipIcon}>🚛</Text>
          <Text style={styles.infoChipText}>{trip.vehicle}</Text>
        </View>
      </View>

      <View style={styles.trackDivider} />

      {/* Driver Contact */}
      <Text style={styles.contactSectionTitle}>CONTACT DETAILS</Text>

      <View style={styles.contactCard}>
        <View style={styles.contactLeft}>
          <View style={[styles.contactAvatar, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.contactAvatarText}>🧑‍✈️</Text>
          </View>
          <View>
            <Text style={styles.contactRole}>Driver</Text>
            <Text style={styles.contactName}>{trip.driverName}</Text>
            <Text style={styles.contactPhone}>
              {driverRevealed ? `+91 ${trip.driverPhone}` : maskPhoneNumber(trip.driverPhone)}
            </Text>
          </View>
        </View>
        <View style={styles.contactActions}>
          <TouchableOpacity
            style={styles.revealBtn}
            onPress={() => setDriverRevealed(v => !v)}
          >
            <Text style={styles.revealBtnText}>{driverRevealed ? '🔒' : '👁️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => callNumber(trip.driverPhone, trip.driverName)}
          >
            <Text style={styles.callBtnText}>📞</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Farmer Contact */}
      <View style={[styles.contactCard, { marginTop: 10 }]}>
        <View style={styles.contactLeft}>
          <View style={[styles.contactAvatar, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.contactAvatarText}>🌾</Text>
          </View>
          <View>
            <Text style={styles.contactRole}>Farmer</Text>
            <Text style={styles.contactName}>{trip.farmerName}</Text>
            <Text style={styles.contactPhone}>
              {farmerRevealed ? `+91 ${trip.farmerPhone}` : maskPhoneNumber(trip.farmerPhone)}
            </Text>
          </View>
        </View>
        <View style={styles.contactActions}>
          <TouchableOpacity
            style={styles.revealBtn}
            onPress={() => setFarmerRevealed(v => !v)}
          >
            <Text style={styles.revealBtnText}>{farmerRevealed ? '🔒' : '👁️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => callNumber(trip.farmerPhone, trip.farmerName)}
          >
            <Text style={styles.callBtnText}>📞</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Vehicle Number */}
      <View style={styles.regRow}>
        <Text style={styles.regLabel}>REG. NO</Text>
        <Text style={styles.regValue}>{trip.registrationNumber}</Text>
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
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
        {/* ── Live Tracking Section ── */}
        {ACTIVE_TRIPS.length > 0 && (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Active Trip</Text>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>{ACTIVE_TRIPS.length} Running</Text>
              </View>
            </View>
            {ACTIVE_TRIPS.map(trip => (
              <LiveTrackingCard key={trip.id} trip={trip} />
            ))}
          </View>
        )}

        {/* ── Available Vehicles ── */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Available Vehicles</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
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

  // ── Section ──
  sectionBlock: {
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  sectionBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },

  // ── Live Tracking Card ──
  trackCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  trackHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#E53935',
    letterSpacing: 1,
  },
  trackStatusText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  etaBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },

  // Route
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  routePoint: {
    alignItems: 'center',
    flex: 1,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  routeDotOrigin: {
    backgroundColor: colors.accent,
  },
  routeDotDest: {
    backgroundColor: colors.gold,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  routeCity: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  routeLineWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.border,
  },
  routeArrow: {
    fontSize: 18,
    marginHorizontal: 4,
  },

  // Progress
  progressSection: {
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  progressStart: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },

  // Info Chips
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 6,
  },
  infoChipIcon: {
    fontSize: 14,
  },
  infoChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  trackDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 14,
  },
  contactSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
  },

  // Contact Card
  contactCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    fontSize: 22,
  },
  contactRole: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginTop: 1,
  },
  contactPhone: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  revealBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  revealBtnText: {
    fontSize: 16,
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  callBtnText: {
    fontSize: 16,
  },

  // Reg Number
  regRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  regLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  regValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  // ── Vehicle Cards ──
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