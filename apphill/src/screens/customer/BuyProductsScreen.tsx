import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';

import { farmerProducts } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

export default function BuyProductsScreen() {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [products, setProducts] = useState(farmerProducts);
  const [currentIP, setCurrentIP] = useState<string | null>(null);

  const LOCAL_IP = '192.168.1.100';

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.details) {
        const ip = (state.details as any).ipAddress || null;
        setCurrentIP(ip);
      } else {
        setCurrentIP(null);
      }
    });

    NetInfo.fetch().then((state) => {
      if (state.isConnected && state.details) {
        const ip = (state.details as any).ipAddress || null;
        setCurrentIP(ip);
      }
    });

    return unsubscribe;
  }, []);

  const getStatusColor = () => {
    if (isOfflineMode) return colors.danger;
    if (currentIP === LOCAL_IP) return colors.success;
    if (currentIP) return colors.gold;
    return colors.textMuted;
  };

  const getStatusLabel = () => {
    if (isOfflineMode) return 'Offline Mode';
    if (currentIP === LOCAL_IP) return 'Local Network';
    if (currentIP) return 'Cloud Sync';
    return 'No Network';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusLabel()}</Text>
          </View>
        </View>
        <View style={styles.offlineToggle}>
          <Text style={styles.toggleLabel}>Offline</Text>
          <Switch
            value={isOfflineMode}
            onValueChange={setIsOfflineMode}
            thumbColor="#FFF"
            trackColor={{ false: colors.borderLight, true: colors.primary }}
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Fresh Produce</Text>
        
        {products.map((item, index) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={styles.topRow}>
                <Text style={styles.productName}>{item.productName}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>
              
              <View style={styles.farmerRow}>
                <Text style={styles.farmerIcon}>👨‍🌾</Text>
                <Text style={styles.farmerName}>{item.farmerName}</Text>
              </View>

              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Stock</Text>
                  <Text style={styles.detailValue}>{item.quantity} kg</Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{item.location}</Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <View>
                  <Text style={styles.priceLabel}>Price</Text>
                  <Text style={styles.priceValue}>₹{item.price}<Text style={styles.perUnit}>/kg</Text></Text>
                </View>
                <TouchableOpacity 
                  style={styles.buyBtn}
                  onPress={() => Alert.alert('Order Placed ✅', `Farmer ${item.farmerName} has been notified!`)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buyBtnText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  offlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  toggleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginRight: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.surfaceSecondary,
  },
  productInfo: {
    padding: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  categoryBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  farmerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  farmerIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  farmerName: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  detailGrid: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  perUnit: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  buyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});