import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { farmerProducts } from '../../data/mockData';
import colors from '../../theme/colors';

// ─── Category Filter Pills ────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Root Crops', 'Grains', 'Spices'];

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  'Freshly Harvested': { bg: '#E8F5E9', color: '#2E7D32' },
  'In Stock':          { bg: '#E3F2FD', color: '#1565C0' },
  'Limited Stock':     { bg: '#FFF8E1', color: '#F57F17' },
  'Out of Stock':      { bg: '#FFEBEE', color: '#C62828' },
};

export default function CustomerDashboardScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = farmerProducts.filter(p => {
    const matchSearch =
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchAvailable = showAvailableOnly ? p.available : true;
    return matchSearch && matchCategory && matchAvailable;
  });

  const availableCount = farmerProducts.filter(p => p.available).length;
  const totalQty = farmerProducts
    .filter(p => p.available)
    .reduce((sum, p) => sum + p.quantity, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* ── Top Header ── */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.topHeader}>
          <View>
            <Text style={styles.greeting}><Icon name="leaf" size={12} /> Good Morning!</Text>
            <Text style={styles.headerTitle}>Farm Marketplace</Text>
            <Text style={styles.headerSub}>Fresh produce available near you</Text>
          </View>
          <View style={styles.statsBadge}>
            <Text style={styles.statsBadgeNum}>{availableCount}</Text>
            <Text style={styles.statsBadgeLabel}>Products{'\n'}Available</Text>
          </View>
        </Animated.View>

        {/* ── Sticky Search + Filter Bar ── */}
        <View style={styles.stickyBar}>
          {/* Search */}
          <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.searchBox}>
            <Icon name="magnify" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search product, location, farmer..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Icon name="close" style={styles.clearText} />
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Available Only Toggle */}
          <TouchableOpacity
            style={[styles.availToggle, showAvailableOnly && styles.availToggleActive]}
            onPress={() => setShowAvailableOnly(v => !v)}
          >
            <Text style={[styles.availToggleText, showAvailableOnly && styles.availToggleTextActive]}>
              <Icon name="check-circle-outline" size={12} /> Available
            </Text>
          </TouchableOpacity>

          {/* Category Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryPillText, activeCategory === cat && styles.categoryPillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Summary Stats Row ── */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{availableCount}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalQty.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Qty (units)</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNum}>
              {[...new Set(farmerProducts.filter(p => p.available).map(p => p.district))].length}
            </Text>
            <Text style={styles.statLabel}>Districts</Text>
          </View>
        </Animated.View>

        {/* ── Result Count ── */}
        <View style={styles.resultCountRow}>
          <Text style={styles.resultCount}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* ── Product Cards ── */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="tractor" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>Try a different search or category</Text>
          </View>
        ) : (
          filtered.map((item, index) => {
            const statusStyle = STATUS_CONFIG[item.status] ?? { bg: '#F5F5F5', color: '#666' };
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => (navigation as any).navigate('ProductDetail', { product: item })}
              >
                <Animated.View
                  entering={FadeInDown.delay(index * 60).springify()}
                  style={[styles.productCard, !item.available && styles.productCardUnavailable]}
                >
                {/* Top Row: Emoji + Name + Status */}
                <View style={styles.productTop}>
                  <View style={styles.emojiWrap}>
                    <Icon name={item.iconName || 'food-apple'} size={26} color={colors.primary} />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                {/* Location Row */}
                <View style={styles.locationRow}>
                  <Icon name="map-marker-outline" style={styles.locationIcon} />
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationText}>{item.location}</Text>
                    <Text style={styles.farmerText}>by {item.farmerName}</Text>
                  </View>
                  <View style={styles.harvestBadge}>
                    <Icon name="sprout" style={styles.harvestIcon} />
                    <Text style={styles.harvestText}>{item.harvestedOn}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                {/* Price + Quantity Row */}
                <View style={styles.priceQtyRow}>
                  <View style={styles.priceBlock}>
                    <Text style={styles.priceLabel}>PRICE</Text>
                    <Text style={styles.priceValue}>₹{item.price}<Text style={styles.priceUnit}>/{item.unit}</Text></Text>
                  </View>
                  <View style={styles.qtyBlock}>
                    <Text style={styles.qtyLabel}>AVAILABLE QTY</Text>
                    <Text style={[styles.qtyValue, !item.available && styles.qtyUnavailable]}>
                      {item.available ? `${item.quantity} ${item.unit}` : 'Unavailable'}
                    </Text>
                  </View>
                  <View style={styles.districtBlock}>
                    <Text style={styles.districtLabel}>DISTRICT</Text>
                    <Text style={styles.districtValue}>{item.district}</Text>
                  </View>
                </View>

                {/* Availability indicator bar */}
                {item.available && (
                  <View style={styles.availBar}>
                    <View style={[
                      styles.availBarFill,
                      {
                        width: item.status === 'Limited Stock' ? '30%'
                          : item.status === 'Freshly Harvested' ? '100%'
                          : '70%',
                        backgroundColor: item.status === 'Limited Stock' ? colors.warning
                          : item.status === 'Freshly Harvested' ? colors.accent
                          : colors.info,
                      }
                    ]} />
                  </View>
                )}
                </Animated.View>
              </TouchableOpacity>
            );
          })
        )}

        <View style={{ height: 100 }} />
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

  // Top Header
  topHeader: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
    fontWeight: '500',
  },
  statsBadge: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 72,
  },
  statsBadgeNum: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  statsBadgeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryLight,
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 2,
  },

  // Sticky bar
  stickyBar: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  clearText: {
    fontSize: 14,
    color: colors.textMuted,
    paddingLeft: 8,
  },
  availToggle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  availToggleActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  availToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  availToggleTextActive: {
    color: colors.primary,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  categoryPillTextActive: {
    color: '#FFF',
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
  },

  // Result count
  resultCountRow: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 4,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },

  // Product Card
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  productCardUnavailable: {
    opacity: 0.6,
  },
  productTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  emojiWrap: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productEmoji: {
    fontSize: 26,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  productCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },

  cardDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 14,
  },

  // Location
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  farmerText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 1,
  },
  harvestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  harvestIcon: {
    fontSize: 12,
  },
  harvestText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },

  // Price + Qty
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceBlock: {
    flex: 1,
  },
  qtyBlock: {
    flex: 1,
    alignItems: 'center',
  },
  districtBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 3,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  qtyLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 3,
  },
  qtyValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  qtyUnavailable: {
    color: colors.error,
  },
  districtLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 3,
  },
  districtValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'right',
  },

  // Availability bar
  availBar: {
    height: 4,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  availBarFill: {
    height: 4,
    borderRadius: 4,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
});