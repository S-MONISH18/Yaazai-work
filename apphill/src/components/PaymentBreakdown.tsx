import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface PaymentBreakdownProps {
  amount: number;
  status?: string;
}

export default function PaymentBreakdown({ amount, status }: PaymentBreakdownProps) {
  const platformFee = amount * 0.10;
  const driverRent = amount * 0.60;
  const farmerPayout = amount * 0.30;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Distribution</Text>
        <View style={[styles.statusBadge, { backgroundColor: status === 'Released' ? colors.success : colors.warning }]}>
          <Text style={styles.statusText}>{status || 'IN ESCROW'}</Text>
        </View>
      </View>

      <View style={styles.list}>
        <View style={styles.row}>
          <Text style={styles.label}>Driver Earnings (60%)</Text>
          <Text style={styles.value}>₹{driverRent.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Farmer Payout (30%)</Text>
          <Text style={styles.value}>₹{farmerPayout.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Platform Service Fee</Text>
          <Text style={styles.value}>₹{platformFee.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.dashedLine} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Grand Total</Text>
        <Text style={styles.totalValue}>₹{amount.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 24,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
  },
  dashedLine: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
});
