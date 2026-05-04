import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { vehicleListings, farmerProducts, ACTIVE_TRIPS } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function FarmerDashboardScreen({ navigation }: any) {
  const { currentUser } = useAuth();
  const activeTrip = ACTIVE_TRIPS[0];

  const stats = [
    { label: 'Active Listings', value: '3', icon: '📦', color: '#E8F5E9' },
    { label: 'Pending Orders', value: '12', icon: '🛒', color: '#E3F2FD' },
    { label: 'Total Earnings', value: '₹42K', icon: '💰', color: '#FFF8E1' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Clean White Header */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>Welcome back 👋</Text>
            <Text style={styles.nameText}>{currentUser?.name || 'Siva Kumar'}</Text>
          </View>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileEmoji}>👨‍🌾</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Stats Banner */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: s.color }]}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Live Trip Tracking Card */}
        {activeTrip && (
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE TRACKING</Text>
              </View>
              <Text style={styles.etaText}>ETA: {activeTrip.eta}</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={styles.dot} />
                <Text style={styles.pointText}>{activeTrip.origin}</Text>
              </View>
              <View style={styles.routeLine}>
                <View style={[styles.progressLine, { width: `${activeTrip.progress * 100}%` }]} />
              </View>
              <View style={styles.routePoint}>
                <View style={[styles.dot, { backgroundColor: colors.danger }]} />
                <Text style={styles.pointText}>{activeTrip.destination}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.trackBtn}
              onPress={() => Alert.alert('Tracking', 'Opening map for live tracking...')}
            >
              <Text style={styles.trackBtnText}>View on Map</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Vehicles')}
          >
            <Text style={styles.actionEmoji}>🚜</Text>
            <Text style={styles.actionText}>Book Transport</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, styles.actionCardSell]}
            onPress={() => navigation.navigate('SellProducts')}
          >
            <Text style={styles.actionEmoji}>🏷️</Text>
            <Text style={styles.actionText}>Sell Produce</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SellProducts')}>
            <Text style={styles.seeAllText}>Manage All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {farmerProducts.map((p, i) => (
            <Animated.View 
              key={p.id} 
              entering={FadeInRight.delay(600 + i * 100).springify()}
              style={styles.productCard}
            >
              <Image source={{ uri: p.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{p.productName}</Text>
                <Text style={styles.productPrice}>₹{p.price}/kg</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{p.status}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Vehicles Nearby */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Logistics</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Vehicles')}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.vehicleList}>
          {vehicleListings.slice(0, 2).map((v) => (
            <TouchableOpacity key={v.id} style={styles.vehicleRow}>
              <View style={styles.vehicleInfo}>
                <View style={styles.vIconBg}>
                  <Text style={styles.vIcon}>🚛</Text>
                </View>
                <View>
                  <Text style={styles.vModel}>{v.vehicleModel}</Text>
                  <Text style={styles.vOwner}>{v.ownerName}</Text>
                </View>
              </View>
              <View style={styles.vRight}>
                <Text style={styles.vPrice}>₹{v.estimatedPrice}</Text>
                <Text style={styles.vRating}>⭐ {v.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  greetingText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '800',
    marginTop: 2,
  },
  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  profileEmoji: {
    fontSize: 22,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingTop: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - (spacing.lg * 2 + spacing.sm * 2)) / 3,
    height: 110,
    padding: spacing.sm,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  trackingCard: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F0F5F0',
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },
  etaText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  routePoint: {
    alignItems: 'center',
    width: 80,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginBottom: 6,
  },
  pointText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
    borderRadius: 1,
    marginTop: -16,
  },
  progressLine: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  trackBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  actionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    height: 110,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  actionCardSell: {
    backgroundColor: '#2E7D32',
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalScroll: {
    paddingLeft: spacing.lg,
  },
  productCard: {
    width: 150,
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productImage: {
    width: '100%',
    height: 90,
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  statusBadge: {
    marginTop: 8,
    backgroundColor: colors.surfaceSecondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  vehicleList: {
    paddingHorizontal: spacing.lg,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vIcon: {
    fontSize: 22,
  },
  vModel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  vOwner: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  vRight: {
    alignItems: 'flex-end',
  },
  vPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  vRating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gold,
    marginTop: 2,
  },
});