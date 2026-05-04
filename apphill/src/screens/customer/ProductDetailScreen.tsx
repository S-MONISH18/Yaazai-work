import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import colors from '../../theme/colors';

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  'Freshly Harvested': { bg: '#E8F5E9', color: '#2E7D32' },
  'In Stock':          { bg: '#E3F2FD', color: '#1565C0' },
  'Limited Stock':     { bg: '#FFF8E1', color: '#F57F17' },
  'Out of Stock':      { bg: '#FFEBEE', color: '#C62828' },
};

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = (route.params as any);

  const [requiredQty, setRequiredQty] = useState('');
  const [qtyError, setQtyError] = useState('');

  const statusStyle = STATUS_CONFIG[product.status] ?? { bg: '#F5F5F5', color: '#666' };

  const totalCost =
    requiredQty && !isNaN(Number(requiredQty))
      ? Number(requiredQty) * product.price
      : 0;

  const handleQtyChange = (val: string) => {
    setRequiredQty(val);
    const num = parseFloat(val);
    if (!val) {
      setQtyError('');
    } else if (isNaN(num) || num < 25) {
      setQtyError('Minimum order is 25 kg');
    } else if (num > product.quantity) {
      setQtyError(`Only ${product.quantity} ${product.unit} available`);
    } else {
      setQtyError('');
    }
  };

  const handleOrder = () => {
    const num = parseFloat(requiredQty);
    if (!requiredQty || isNaN(num)) {
      setQtyError('Please enter required quantity');
      return;
    }
    if (num < 25) {
      setQtyError('Minimum order is 25 kg');
      return;
    }
    if (num > product.quantity) {
      setQtyError(`Only ${product.quantity} ${product.unit} available`);
      return;
    }
    Alert.alert(
      '✅ Order Placed!',
      `Your order for ${num} ${product.unit} of ${product.productName} has been placed.\n\nTotal: ₹${totalCost.toLocaleString()}\nFarmer: ${product.farmerName}\nLocation: ${product.location}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* ── Hero Card ── */}
          <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View style={styles.heroEmoji}>
                <Text style={styles.heroEmojiText}>{product.emoji}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                  {product.status}
                </Text>
              </View>
            </View>
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>

            {/* Price highlight */}
            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>₹{product.price}</Text>
              <Text style={styles.priceUnit}>/ {product.unit}</Text>
            </View>
          </Animated.View>

          {/* ── Info Grid ── */}
          <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📦</Text>
              <Text style={styles.infoLabel}>Available</Text>
              <Text style={styles.infoValue}>{product.quantity} {product.unit}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>District</Text>
              <Text style={styles.infoValue}>{product.district}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🌱</Text>
              <Text style={styles.infoLabel}>Harvested</Text>
              <Text style={styles.infoValue}>{product.harvestedOn}</Text>
            </View>
          </Animated.View>

          {/* ── Farmer & Location Card ── */}
          <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>📋 Farmer & Location</Text>

            <View style={styles.detailRow}>
              <View style={styles.detailIconWrap}>
                <Text style={styles.detailRowIcon}>🧑‍🌾</Text>
              </View>
              <View>
                <Text style={styles.detailRowLabel}>Farmer Name</Text>
                <Text style={styles.detailRowValue}>{product.farmerName}</Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconWrap}>
                <Text style={styles.detailRowIcon}>📍</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailRowLabel}>Farm Location</Text>
                <Text style={styles.detailRowValue}>{product.location}</Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconWrap}>
                <Text style={styles.detailRowIcon}>🗺️</Text>
              </View>
              <View>
                <Text style={styles.detailRowLabel}>District</Text>
                <Text style={styles.detailRowValue}>{product.district}</Text>
              </View>
            </View>
          </Animated.View>

          {/* ── Stock Info Card ── */}
          <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>📊 Stock Information</Text>

            {/* Stock Bar */}
            <View style={styles.stockBarRow}>
              <Text style={styles.stockBarLabel}>Stock Level</Text>
              <Text style={styles.stockBarPct}>
                {product.status === 'Limited Stock' ? '30%' :
                 product.status === 'Freshly Harvested' ? '100%' :
                 product.status === 'Out of Stock' ? '0%' : '70%'}
              </Text>
            </View>
            <View style={styles.stockBarBg}>
              <View style={[
                styles.stockBarFill,
                {
                  width: product.status === 'Limited Stock' ? '30%' :
                         product.status === 'Freshly Harvested' ? '100%' :
                         product.status === 'Out of Stock' ? '0%' : '70%',
                  backgroundColor: product.status === 'Limited Stock' ? colors.warning :
                                   product.status === 'Out of Stock' ? colors.error : colors.accent,
                }
              ]} />
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.stockStatsRow}>
              <View style={styles.stockStat}>
                <Text style={styles.stockStatNum}>{product.quantity}</Text>
                <Text style={styles.stockStatLabel}>{product.unit} Available</Text>
              </View>
              <View style={styles.stockStat}>
                <Text style={styles.stockStatNum}>25</Text>
                <Text style={styles.stockStatLabel}>Min Order (kg)</Text>
              </View>
              <View style={styles.stockStat}>
                <Text style={styles.stockStatNum}>₹{product.price}</Text>
                <Text style={styles.stockStatLabel}>Per {product.unit}</Text>
              </View>
            </View>
          </Animated.View>

          {/* ── Order Section ── */}
          {product.available ? (
            <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.orderCard}>
              <Text style={styles.orderCardTitle}>🛒 Place Your Order</Text>
              <Text style={styles.orderCardSub}>Enter the quantity you need (min. 25 kg)</Text>

              <View style={[styles.qtyInputWrap, qtyError ? styles.qtyInputError : null]}>
                <Text style={styles.qtyInputIcon}>⚖️</Text>
                <TextInput
                  style={styles.qtyInput}
                  placeholder="Enter quantity (e.g. 100)"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={requiredQty}
                  onChangeText={handleQtyChange}
                />
                <Text style={styles.qtyUnit}>{product.unit}</Text>
              </View>

              {/* Error message */}
              {qtyError ? (
                <View style={styles.errorRow}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorText}>{qtyError}</Text>
                </View>
              ) : null}

              {/* Cost Preview */}
              {totalCost > 0 && !qtyError ? (
                <View style={styles.costPreview}>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Quantity</Text>
                    <Text style={styles.costVal}>{requiredQty} {product.unit}</Text>
                  </View>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Price per {product.unit}</Text>
                    <Text style={styles.costVal}>₹{product.price}</Text>
                  </View>
                  <View style={styles.costDivider} />
                  <View style={styles.costRow}>
                    <Text style={styles.costTotalLabel}>Total Cost</Text>
                    <Text style={styles.costTotalVal}>₹{totalCost.toLocaleString()}</Text>
                  </View>
                </View>
              ) : null}

              <TouchableOpacity
                style={[styles.orderBtn, (!requiredQty || !!qtyError) && styles.orderBtnDisabled]}
                onPress={handleOrder}
                disabled={!requiredQty || !!qtyError}
              >
                <Text style={styles.orderBtnText}>Confirm Order</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.unavailCard}>
              <Text style={styles.unavailIcon}>❌</Text>
              <Text style={styles.unavailTitle}>Product Unavailable</Text>
              <Text style={styles.unavailSub}>
                This product is currently out of stock. Check back later or contact the farmer directly.
              </Text>
            </Animated.View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Hero
  heroCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  heroEmoji: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmojiText: {
    fontSize: 40,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  productName: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Info Grid
  infoGrid: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  infoIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  infoDivider: {
    width: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 14,
  },

  // Detail Card
  detailCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  detailCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailRowIcon: {
    fontSize: 18,
  },
  detailRowLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailRowValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 14,
  },

  // Stock
  stockBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stockBarLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  stockBarPct: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  stockBarBg: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  stockBarFill: {
    height: 8,
    borderRadius: 8,
  },
  stockStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stockStat: {
    alignItems: 'center',
  },
  stockStatNum: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },
  stockStatLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 3,
    textAlign: 'center',
  },

  // Order Card
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  orderCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  orderCardSub: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
    marginBottom: 18,
  },
  qtyInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 8,
    gap: 10,
  },
  qtyInputError: {
    borderColor: colors.error,
    backgroundColor: '#FFF5F5',
  },
  qtyInputIcon: {
    fontSize: 18,
  },
  qtyInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  qtyUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  errorIcon: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.error,
  },
  costPreview: {
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  costVal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  costDivider: {
    height: 1,
    backgroundColor: colors.primaryLight,
    marginVertical: 8,
  },
  costTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  costTotalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  orderBtn: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  orderBtnDisabled: {
    backgroundColor: colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  orderBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // Unavailable
  unavailCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFCDD2',
    marginBottom: 14,
  },
  unavailIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  unavailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.error,
    marginBottom: 8,
  },
  unavailSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
  },
});
