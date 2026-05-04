import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import colors from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

// ─── Menu Row ─────────────────────────────────────────────────────────────────
const MenuOption = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuLeft}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

export default function CustomerProfileScreen() {
  const { currentUser, logout } = useAuth();

  const joinFormatted = currentUser?.joinDate
    ? new Date(currentUser.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Jan 2024';

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'C';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{currentUser?.name || 'Customer'}</Text>
          <View style={styles.roleTag}>
            <Text style={styles.roleTagText}>🛒 Customer</Text>
          </View>
        </View>

        {/* ── Account Info ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}><Text style={styles.infoIconText}>📱</Text></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{currentUser?.phone || 'Not Available'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}><Text style={styles.infoIconText}>📧</Text></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{currentUser?.email || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}><Text style={styles.infoIconText}>📍</Text></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{currentUser?.location || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}><Text style={styles.infoIconText}>📅</Text></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>{joinFormatted}</Text>
            </View>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <MenuOption icon="✏️" label="Edit Profile" onPress={() => Alert.alert('Coming Soon', 'Edit profile coming soon.')} />
          <View style={styles.divider} />
          <MenuOption icon="📦" label="My Orders" onPress={() => Alert.alert('Coming Soon', 'Order history coming soon.')} />
          <View style={styles.divider} />
          <MenuOption icon="❤️" label="Favourites" onPress={() => Alert.alert('Coming Soon', 'Favourites coming soon.')} />
          <View style={styles.divider} />
          <MenuOption icon="🗺️" label="Saved Addresses" onPress={() => Alert.alert('Coming Soon', 'Addresses coming soon.')} />
        </View>

        {/* ── Settings ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Settings & Support</Text>
          <MenuOption icon="🔔" label="Notifications" onPress={() => Alert.alert('Coming Soon', 'Notifications coming soon.')} />
          <View style={styles.divider} />
          <MenuOption icon="🔒" label="Privacy & Security" onPress={() => Alert.alert('Coming Soon', 'Privacy settings coming soon.')} />
          <View style={styles.divider} />
          <MenuOption icon="❓" label="Help & Support" onPress={() => Alert.alert('Support', 'Contact: support@smarthill.in')} />
          <View style={styles.divider} />
          <MenuOption icon="ℹ️" label="About App" onPress={() => Alert.alert('SmartHill', 'Version 1.0.0\nPremium Agri-Logistics Platform')} />
        </View>

        {/* ── Buttons ── */}
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>🚪 Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>SmartHill v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },

  profileHeader: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: '800' },
  name: { fontSize: 22, fontWeight: '900', color: colors.text, marginBottom: 8 },
  roleTag: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleTagText: { fontSize: 13, fontWeight: '700', color: colors.primary },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  infoIconWrap: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center', alignItems: 'center',
  },
  infoIconText: { fontSize: 18 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: colors.text },

  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 2 },

  menuOption: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 12,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIcon: { fontSize: 20 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  menuArrow: { fontSize: 22, color: colors.textMuted, fontWeight: '300' },

  btnGroup: { marginHorizontal: 16, marginTop: 6 },
  logoutBtn: {
    backgroundColor: colors.danger,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },

  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginTop: 20, fontWeight: '500' },
});