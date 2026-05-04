import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import { colors, spacing } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function DriverDashboardScreen({ navigation }: any) {
  const { currentUser } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  const earnings = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 2500 },
    { day: 'Wed', amount: 1800 },
    { day: 'Thu', amount: 3200 },
    { day: 'Fri', amount: 2100 },
  ];

  const maxAmount = Math.max(...earnings.map(e => e.amount));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Profile Section */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome Captain,</Text>
              <Text style={styles.driverName}>{currentUser?.name || 'Arun Prakash'}</Text>
            </View>
            <View style={styles.onlineToggle}>
              <Text style={styles.toggleText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
              <Switch 
                value={isOnline} 
                onValueChange={setIsOnline}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor="#FFF"
              />
            </View>
          </View>

          {/* Quick Stats Banner */}
          <View style={styles.quickStats}>
            <View style={styles.qStatItem}>
              <Text style={styles.qStatValue}>24</Text>
              <Text style={styles.qStatLabel}>Trips</Text>
            </View>
            <View style={styles.qDivider} />
            <View style={styles.qStatItem}>
              <Text style={styles.qStatValue}>₹12,450</Text>
              <Text style={styles.qStatLabel}>Earned</Text>
            </View>
            <View style={styles.qDivider} />
            <View style={styles.qStatItem}>
              <Text style={styles.qStatValue}>4.9</Text>
              <Text style={styles.qStatLabel}>Rating</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Earnings Chart Section */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Revenue</Text>
            <Text style={styles.totalEarnings}>₹{earnings.reduce((a, b) => a + b.amount, 0)}</Text>
          </View>
          
          <View style={styles.chartContainer}>
            {earnings.map((e, i) => (
              <View key={i} style={styles.chartBarCol}>
                <View style={[styles.chartBar, { height: (e.amount / maxAmount) * 80 }]} />
                <Text style={styles.chartDay}>{e.day}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Active Trip Request Card */}
        <Text style={styles.groupTitle}>New Requests</Text>
        <Animated.View 
          entering={FadeInDown.delay(400).springify()} 
          layout={Layout.springify()}
          style={styles.requestCard}
        >
          <View style={styles.requestHeader}>
            <View style={styles.customerProfile}>
              <View style={styles.cAvatar}>
                <Text style={styles.cAvatarText}>S</Text>
              </View>
              <View>
                <Text style={styles.cName}>Siva Kumar</Text>
                <Text style={styles.cDistance}>2.4 km away</Text>
              </View>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>₹1,850</Text>
            </View>
          </View>

          <View style={styles.routeBox}>
            <View style={styles.routeIconLine}>
              <View style={[styles.routeDot, styles.routeDotStart]} />
              <View style={styles.routeLine} />
              <View style={[styles.routeDot, styles.routeDotEnd]} />
            </View>
            <View style={styles.routeLabels}>
              <Text style={styles.routePoint} numberOfLines={1}>Pollachi Farm, Sector 2</Text>
              <Text style={styles.routePoint} numberOfLines={1}>Salem Wholesale Market</Text>
            </View>
          </View>

          <View style={styles.requestFooter}>
            <TouchableOpacity 
              style={styles.declineBtn}
              onPress={() => Alert.alert('Request Declined')}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.acceptBtn}
              onPress={() => navigation.navigate('ActiveTrip')}
            >
              <Text style={styles.acceptText}>Accept Job</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Text style={styles.groupTitle}>Shortcuts</Text>
        <View style={styles.shortcutsRow}>
          <TouchableOpacity style={styles.shortcutCard} onPress={() => navigation.navigate('RegisterVehicle')}>
            <View style={[styles.sIconBg, styles.sIconBgCompliance]}>
              <Text style={styles.sIcon}>📋</Text>
            </View>
            <Text style={styles.sLabel}>Compliance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutCard} onPress={() => navigation.navigate('Vehicles')}>
            <View style={[styles.sIconBg, styles.sIconBgFleet]}>
              <Text style={styles.sIcon}>🚛</Text>
            </View>
            <Text style={styles.sLabel}>Fleet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutCard} onPress={() => Alert.alert('Support')}>
            <View style={[styles.sIconBg, styles.sIconBgSupport]}>
              <Text style={styles.sIcon}>🎧</Text>
            </View>
            <Text style={styles.sLabel}>Support</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 32,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    marginRight: 8,
    letterSpacing: 1,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  qStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  qStatValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  qStatLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  qDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 100,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  totalEarnings: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
  },
  chartBarCol: {
    alignItems: 'center',
    width: (width - spacing.lg * 4) / 5,
  },
  chartBar: {
    width: 14,
    backgroundColor: colors.primary,
    borderRadius: 7,
    opacity: 0.8,
  },
  chartDay: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  requestCard: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F0F5F0',
    marginBottom: spacing.xl,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  customerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  cName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cDistance: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  priceText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  routeBox: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    paddingLeft: 4,
  },
  routeIconLine: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 4,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeDotStart: {
    backgroundColor: '#4CAF50',
  },
  routeDotEnd: {
    backgroundColor: colors.danger,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  routeLabels: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routePoint: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  requestFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  declineBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  acceptBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: spacing.md,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sIconBgCompliance: { backgroundColor: '#E3F2FD' },
  sIconBgFleet: { backgroundColor: '#E8F5E9' },
  sIconBgSupport: { backgroundColor: '#FFF3E0' },
  sIcon: {
    fontSize: 20,
  },
  sLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});