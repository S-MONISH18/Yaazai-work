import React, { useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import { colors, typography } from '../theme';

interface BookingBottomSheetProps {
  onBook: () => void;
  weight: string;
  setWeight: (w: string) => void;
  estimatedPrice: number;
  vehicleCount: number;
}

export default function BookingBottomSheet({
  onBook,
  weight,
  setWeight,
  estimatedPrice,
  vehicleCount,
}: BookingBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['30%', '55%'];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={[typography.h3, styles.title]}>🚜 Book Transport</Text>

        <InputField
          label="Load Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Min 25kg"
        />

        {parseInt(weight || '0', 10) > 0 && parseInt(weight || '0', 10) < 25 && (
          <Text style={styles.errorText}>⚠️ Minimum load weight is 25kg.</Text>
        )}

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>🚛 Vehicles</Text>
            <Text style={styles.infoValue}>{vehicleCount}</Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>💰 Est. Price</Text>
            <Text style={[styles.infoValue, { color: colors.primary }]}>₹{estimatedPrice}</Text>
          </View>
        </View>

        <PrimaryButton
          title="Confirm Booking"
          onPress={() => {
            if (parseInt(weight || '0', 10) < 25) {
              Alert.alert('Invalid Weight', 'Load weight must be at least 25kg.');
              return;
            }
            onBook();
          }}
          style={styles.btnSpacing}
          disabled={parseInt(weight || '0', 10) < 25}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  handleIndicator: {
    backgroundColor: colors.borderLight,
    width: 48,
    height: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 16,
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: -8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 4,
    alignItems: 'center',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  dividerV: {
    width: 1,
    height: 36,
    backgroundColor: colors.borderLight,
    marginHorizontal: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  btnSpacing: {
    marginTop: 12,
  },
});
