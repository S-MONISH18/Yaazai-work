import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { farmerRequests } from '../../data/mockData';
import colors from '../../theme/colors';
export default function BookVehicleScreen({ route, navigation }: any) {
  const vehicle = route?.params?.vehicle || {
    model: 'N/A',
    dailyRate: 1500,
  };

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [loadDetails, setLoadDetails] = useState('');
  const [transportDate, setTransportDate] = useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);

  const fetchCurrentLocation = () => {
    setPickupLocation('Current Location (Pollachi Farm)');
  };

  const formatDateTime = (date: Date | null) =>
    date
      ? `${date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • ${date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      : 'Select Date & Time';

  const onChangeDate = (e: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      const updated = new Date(selected);
      setTransportDate(prev =>
        prev ? new Date(updated.setHours(prev.getHours(), prev.getMinutes())) : updated
      );
      setShowTimePicker(true);
    }
  };

  const onChangeTime = (e: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected && transportDate) {
      const updated = new Date(transportDate);
      updated.setHours(selected.getHours(), selected.getMinutes());
      setTransportDate(updated);
    }
  };

  // Flat estimated fare calculation (mocked based on vehicle rate)
  const baseFare = parseInt(String(vehicle.dailyRate || 1500), 10);
  const serviceFee = 50;
  const totalFare = baseFare + serviceFee;

  const handleBooking = () => {
    if (!pickupLocation.trim() || !dropoffLocation.trim() || !loadDetails.trim() || !transportDate) {
      Alert.alert('Incomplete Details', 'Please fill in all transport details including date and time.');
      return;
    }
    Alert.alert(
      'Transport Confirmed ✅',
      `Vehicle: ${vehicle.model}\nFrom: ${pickupLocation}\nTo: ${dropoffLocation}\nLoad: ${loadDetails}\nTotal Estimate: ₹${totalFare}`
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Transport</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleIconBg}>
              <Icon name="tractor" size={28} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.vehicleName}>{vehicle.model}</Text>
              <Text style={styles.vehicleRates}>Estimated Flat Rate: ₹{baseFare}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Transport Details</Text>
          
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pickup Location</Text>
              <View style={styles.inputWrapper}>
                <Icon name="map-marker" size={20} color={colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter pickup location (e.g., Farm)"
                  placeholderTextColor={colors.textMuted}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                />
                <TouchableOpacity onPress={fetchCurrentLocation} style={styles.locationBtn}>
                  <Icon name="crosshairs-gps" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.inputGroup, { zIndex: 10 }]}>
              <Text style={styles.label}>Drop-off Location</Text>
              <TouchableOpacity 
                style={[styles.inputWrapper, { justifyContent: 'space-between' }]}
                onPress={() => setShowRequestDropdown(!showRequestDropdown)}
                activeOpacity={0.8}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Icon name="flag-checkered" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                  <Text style={[styles.input, { color: dropoffLocation ? colors.text : colors.textMuted, marginTop: 15 }]}>
                    {dropoffLocation || 'Select Request'}
                  </Text>
                </View>
                <Icon name={showRequestDropdown ? "chevron-up" : "chevron-down"} size={20} color={colors.textMuted} />
              </TouchableOpacity>
              
              {showRequestDropdown && (
                <View style={styles.dropdownContainer}>
                  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {farmerRequests.map((req) => {
                      const isMatch = req.requestedQuantity === req.availableQuantity;
                      return (
                        <TouchableOpacity 
                          key={req.id} 
                          style={styles.dropdownItem}
                          onPress={() => {
                            setDropoffLocation(req.destination);
                            setLoadDetails(`${req.requestedQuantity}${req.unit} ${req.productName}`);
                            setShowRequestDropdown(false);
                          }}
                        >
                          <View style={styles.reqMain}>
                            <Text style={styles.reqDest}>{req.destination}</Text>
                            <Text style={styles.reqProduct}>
                              {req.requestedQuantity}{req.unit} {req.productName} 
                              <Text style={styles.reqAvail}> (Avail: {req.availableQuantity}{req.unit})</Text>
                            </Text>
                          </View>
                          {isMatch && (
                            <Icon name="check-circle" size={20} color="#4CAF50" style={styles.reqTick} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vegetable Type & Weight</Text>
              <View style={styles.inputWrapper}>
                <Icon name="package-variant" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 500kg Tomatoes"
                  placeholderTextColor={colors.textMuted}
                  value={loadDetails}
                  onChangeText={setLoadDetails}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Transport Date & Time</Text>
              <TouchableOpacity style={styles.timePickerBtn} onPress={() => setShowDatePicker(true)}>
                <Icon name="clock-outline" size={20} color={colors.primary} style={styles.inputIcon} />
                <Text style={[styles.timeValue, !transportDate && styles.timeValuePlaceholder]}>
                  {formatDateTime(transportDate)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.billingCard}>
            <Text style={styles.billingTitle}>Fare Estimate</Text>
            <View style={styles.billingRow}>
              <Text style={styles.billLabel}>Base Fare</Text>
              <Text style={styles.billValue}>₹{baseFare}</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billLabel}>Service Fee</Text>
              <Text style={styles.billValue}>₹{serviceFee}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billingRow}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalValue}>₹{totalFare}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={handleBooking} activeOpacity={0.88}>
            <Text style={styles.confirmBtnText}>Confirm Transport</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {showDatePicker && <DateTimePicker value={transportDate || new Date()} mode="date" onChange={onChangeDate} />}
      {showTimePicker && <DateTimePicker value={transportDate || new Date()} mode="time" onChange={onChangeTime} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginRight: 15, elevation: 2 },
  backEmoji: { fontSize: 18 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  vehicleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 24, marginBottom: 25, elevation: 3 },
  vehicleIconBg: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 18 },
  vehicleIcon: { fontSize: 28 },
  vehicleName: { fontSize: 18, fontWeight: '800', color: colors.text },
  vehicleRates: { fontSize: 13, color: colors.textSecondary, fontWeight: '600', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
  formCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25, elevation: 2 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: 12, height: 50 },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: colors.text, height: '100%' },
  timePickerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: 12, height: 50 },
  timeValue: { fontSize: 15, fontWeight: '700', color: colors.primary },
  timeValuePlaceholder: { color: colors.textMuted, fontWeight: 'normal' },
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
  locationBtn: { padding: 5 },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  reqMain: {
    flex: 1,
  },
  reqDest: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  reqProduct: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  reqAvail: {
    color: colors.primary,
    fontWeight: '600',
  },
  reqTick: {
    marginLeft: 10,
  },
});