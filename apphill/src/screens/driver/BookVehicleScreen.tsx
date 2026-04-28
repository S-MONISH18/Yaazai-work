import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

export default function BookVehicleScreen({ route, navigation }: any) {
  const vehicle = route?.params?.vehicle || {
    model: 'N/A',
    dailyRate: 0,
    hourlyRate: 0,
  };

  const [fromDateTime, setFromDateTime] = useState<Date | null>(null);
  const [toDateTime, setToDateTime] = useState<Date | null>(null);

  const [showFromDate, setShowFromDate] = useState(false);
  const [showFromTime, setShowFromTime] = useState(false);

  const [showToDate, setShowToDate] = useState(false);
  const [showToTime, setShowToTime] = useState(false);

  const formatDateTime = (date: Date | null) =>
    date
      ? `${date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • ${date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      : 'Select Time';

  const onChangeFromDate = (e: any, selected?: Date) => {
    setShowFromDate(false);
    if (selected) {
      const updated = new Date(selected);
      setFromDateTime(prev =>
        prev ? new Date(updated.setHours(prev.getHours(), prev.getMinutes())) : updated
      );
      setShowFromTime(true);
    }
  };

  const onChangeFromTime = (e: any, selected?: Date) => {
    setShowFromTime(false);
    if (selected && fromDateTime) {
      const updated = new Date(fromDateTime);
      updated.setHours(selected.getHours(), selected.getMinutes());
      setFromDateTime(updated);
    }
  };

  const onChangeToDate = (e: any, selected?: Date) => {
    setShowToDate(false);
    if (selected) {
      const updated = new Date(selected);
      setToDateTime(prev =>
        prev ? new Date(updated.setHours(prev.getHours(), prev.getMinutes())) : updated
      );
      setShowToTime(true);
    }
  };

  const onChangeToTime = (e: any, selected?: Date) => {
    setShowToTime(false);
    if (selected && toDateTime) {
      const updated = new Date(toDateTime);
      updated.setHours(selected.getHours(), selected.getMinutes());
      setToDateTime(updated);
    }
  };

  const calculateHours = () => {
    if (!fromDateTime || !toDateTime) return 0;
    const diff = (toDateTime.getTime() - fromDateTime.getTime()) / (1000 * 60 * 60);
    return diff > 0 ? Math.ceil(diff) : 0;
  };

  const hours = calculateHours();
  const hourlyRate = vehicle.hourlyRate ? parseInt(String(vehicle.hourlyRate)) : Math.round(parseInt(String(vehicle.dailyRate || 0)) / 8);
  const dailyRate = parseInt(String(vehicle.dailyRate || 0));

  const total = hours > 0 ? (hours > 8 ? Math.ceil(hours / 24) * dailyRate : hours * hourlyRate) : 0;

  const handleBooking = () => {
    if (!fromDateTime || !toDateTime) {
      Alert.alert('Selection Required', 'Please select both start and end times.');
      return;
    }
    if (hours <= 0) {
      Alert.alert('Invalid Duration', 'End time must be after start time.');
      return;
    }
    Alert.alert('Booking Confirmed ✅', `Vehicle: ${vehicle.model}\nDuration: ${hours} hours\nTotal: ₹${total}`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backEmoji}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rent Vehicle</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleIconBg}>
            <Text style={styles.vehicleIcon}>🚜</Text>
          </View>
          <View>
            <Text style={styles.vehicleName}>{vehicle.model}</Text>
            <Text style={styles.vehicleRates}>₹{dailyRate}/day • ₹{hourlyRate}/hr</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Duration</Text>
        
        <View style={styles.timeSection}>
          <TouchableOpacity style={styles.timePicker} onPress={() => setShowFromDate(true)}>
            <View style={styles.timeLabelRow}>
              <Text style={styles.timeIcon}>🕒</Text>
              <Text style={styles.timeLabel}>Start Date & Time</Text>
            </View>
            <Text style={[styles.timeValue, !fromDateTime && { color: colors.textMuted }]}>
              {formatDateTime(fromDateTime)}
            </Text>
          </TouchableOpacity>

          <View style={styles.timeConnector}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity style={styles.timePicker} onPress={() => setShowToDate(true)}>
            <View style={styles.timeLabelRow}>
              <Text style={styles.timeIcon}>🏁</Text>
              <Text style={styles.timeLabel}>End Date & Time</Text>
            </View>
            <Text style={[styles.timeValue, !toDateTime && { color: colors.textMuted }]}>
              {formatDateTime(toDateTime)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.billingCard}>
          <Text style={styles.billingTitle}>Fare Details</Text>
          <View style={styles.billingRow}>
            <Text style={styles.billLabel}>Total Duration</Text>
            <Text style={styles.billValue}>{hours} Hours</Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billLabel}>Base Fare</Text>
            <Text style={styles.billValue}>₹{total}</Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billLabel}>Service Fee</Text>
            <Text style={styles.billValue}>₹50</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.billingRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{total > 0 ? total + 50 : 0}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleBooking} activeOpacity={0.88}>
          <Text style={styles.confirmBtnText}>Confirm Rental</Text>
        </TouchableOpacity>
      </ScrollView>

      {showFromDate && <DateTimePicker value={fromDateTime || new Date()} mode="date" onChange={onChangeFromDate} />}
      {showFromTime && <DateTimePicker value={fromDateTime || new Date()} mode="time" onChange={onChangeFromTime} />}
      {showToDate && <DateTimePicker value={toDateTime || new Date()} mode="date" onChange={onChangeToDate} />}
      {showToTime && <DateTimePicker value={toDateTime || new Date()} mode="time" onChange={onChangeToTime} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginRight: 15, elevation: 2 },
  backEmoji: { fontSize: 18 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  vehicleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 24, marginBottom: 25, elevation: 3 },
  vehicleIconBg: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 18 },
  vehicleIcon: { fontSize: 28 },
  vehicleName: { fontSize: 18, fontWeight: '800', color: colors.text },
  vehicleRates: { fontSize: 13, color: colors.textSecondary, fontWeight: '600', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
  timeSection: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25, elevation: 2 },
  timePicker: { flex: 1 },
  timeLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  timeIcon: { fontSize: 16, marginRight: 8 },
  timeLabel: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase' },
  timeValue: { fontSize: 17, fontWeight: '800', color: colors.primary },
  timeConnector: { height: 40, justifyContent: 'space-between', paddingLeft: 6, marginVertical: 8 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.borderLight },
  line: { width: 1, flex: 1, backgroundColor: colors.borderLight, marginLeft: 1.5 },
  billingCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 30, elevation: 2 },
  billingTitle: { fontSize: 15, fontWeight: '800', color: colors.text, marginBottom: 15 },
  billingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  billLabel: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  billValue: { fontSize: 14, color: colors.text, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: colors.text },
  totalValue: { fontSize: 20, fontWeight: '900', color: colors.primary },
  confirmBtn: { backgroundColor: colors.primary, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  confirmBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
});