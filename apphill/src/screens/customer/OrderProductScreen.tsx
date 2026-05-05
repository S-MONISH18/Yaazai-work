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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';

export default function OrderProductScreen({ route, navigation }: any) {
  const { product } = route.params || {};

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantityStr, setQuantityStr] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');

  const quantity = parseInt(quantityStr, 10) || 0;
  const price = product?.price || 0;
  const totalAmount = quantity * price;

  // Mocked Logistics Calculations
  const distanceKm = 45;
  const driverRatePerKm = 15;
  const totalTransportCost = distanceKm * driverRatePerKm;
  const customerShare = totalTransportCost / 2;

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery', icon: 'cash' },
    { id: 'upi', label: 'UPI / Online', icon: 'cellphone-nfc' },
    { id: 'card', label: 'Credit / Debit Card', icon: 'credit-card' },
  ];

  const handlePlaceOrder = () => {
    if (!name.trim() || !location.trim() || quantity <= 0) {
      Alert.alert('Missing Details', 'Please fill in all required fields and enter a valid quantity.');
      return;
    }
    
    if (quantity > (product?.quantity || 0)) {
      Alert.alert('Invalid Quantity', `You cannot order more than the available stock (${product?.quantity} kg).`);
      return;
    }

    Alert.alert(
      'Order Confirmed ✅',
      `Your order for ${quantity}kg of ${product?.productName} has been placed successfully!\nTotal: ₹${totalAmount + customerShare}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Go back to marketplace or dashboard
            navigation.navigate('Marketplace');
          }
        }
      ]
    );
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Product not found.</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Product Summary */}
          <View style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.farmerName}><Icon name="tractor" /> {product.farmerName}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceValue}>₹{product.price}<Text style={styles.perUnit}>/kg</Text></Text>
                <Text style={styles.stockText}>Avail: {product.quantity} kg</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Delivery Details</Text>
          
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Icon name="account" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Delivery Location</Text>
              <View style={styles.inputWrapper}>
                <Icon name="map-marker" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter full address"
                  placeholderTextColor={colors.textMuted}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity (kg)</Text>
              <View style={styles.inputWrapper}>
                <Icon name="weight-kilogram" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter quantity"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={quantityStr}
                  onChangeText={setQuantityStr}
                />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Logistics Details</Text>
          <View style={styles.logisticsCard}>
            <View style={styles.routeRow}>
              <View style={styles.locationNode}>
                <Icon name="warehouse" size={24} color={colors.primary} />
                <Text style={styles.locationText} numberOfLines={2}>Farmer Location{'\n'}({product.location.split(',')[0]})</Text>
              </View>
              
              <View style={styles.routeLine}>
                <Text style={styles.distanceText}>~{distanceKm} km</Text>
                <Icon name="truck-fast" size={20} color={colors.primary} style={styles.truckIcon} />
                <View style={styles.dashedLine} />
              </View>
              
              <View style={styles.locationNode}>
                <Icon name="home-map-marker" size={24} color={colors.gold} />
                <Text style={styles.locationText} numberOfLines={2}>Your Location{'\n'}({location || '...'})</Text>
              </View>
            </View>
            
            <View style={styles.infoBanner}>
              <Icon name="information" size={20} color={colors.info} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.infoText}>
                  Driver Rate: <Text style={{ fontWeight: '800' }}>₹{driverRatePerKm}/km</Text> • Total Transport: <Text style={{ fontWeight: '800' }}>₹{totalTransportCost}</Text>
                </Text>
                <Text style={styles.infoTextSub}>
                  The transport cost is shared equally (50/50) between the Farmer and Customer.
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            {paymentOptions.map((option) => {
              const isSelected = paymentMethod === option.id;
              return (
                <View key={option.id} style={{ marginBottom: 12 }}>
                  <TouchableOpacity
                    style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
                    onPress={() => setPaymentMethod(option.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.paymentIconRow}>
                      <Icon 
                        name={option.icon} 
                        size={24} 
                        color={isSelected ? colors.primary : colors.textSecondary} 
                      />
                      <Text style={[styles.paymentText, isSelected && styles.paymentTextSelected]}>
                        {option.label}
                      </Text>
                    </View>
                    <Icon 
                      name={isSelected ? "radiobox-marked" : "radiobox-blank"} 
                      size={22} 
                      color={isSelected ? colors.primary : colors.textMuted} 
                    />
                  </TouchableOpacity>
                  
                  {/* Conditional UPI Input */}
                  {isSelected && option.id === 'upi' && (
                    <View style={styles.upiInputContainer}>
                      <Icon name="at" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your UPI ID (e.g. name@bank)"
                        placeholderTextColor={colors.textMuted}
                        value={upiId}
                        onChangeText={setUpiId}
                        autoCapitalize="none"
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.billingCard}>
            <Text style={styles.billingTitle}>Order Summary</Text>
            <View style={styles.billingRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{totalAmount}</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billLabel}>Shared Transport Fee (50%)</Text>
              <Text style={styles.billValue}>₹{customerShare}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billingRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalAmount + customerShare}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={handlePlaceOrder} activeOpacity={0.88}>
            <Text style={styles.confirmBtnText}>Place Order (₹{totalAmount + customerShare})</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginRight: 15, elevation: 2 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  
  productCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 24, marginBottom: 25, elevation: 3 },
  productImage: { width: 80, height: 80, borderRadius: 16, backgroundColor: colors.surfaceSecondary, marginRight: 15 },
  productDetails: { flex: 1, justifyContent: 'center' },
  productName: { fontSize: 18, fontWeight: '800', color: colors.text },
  farmerName: { fontSize: 13, color: colors.textSecondary, fontWeight: '600', marginTop: 4, marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceValue: { fontSize: 16, fontWeight: '900', color: colors.primary },
  perUnit: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  stockText: { fontSize: 12, fontWeight: '700', color: colors.textMuted },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
  formCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25, elevation: 2 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: 12, height: 50 },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: colors.text, height: '100%' },

  logisticsCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25, elevation: 2 },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  locationNode: { flex: 1, alignItems: 'center' },
  locationText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, textAlign: 'center', marginTop: 8 },
  routeLine: { flex: 1, alignItems: 'center', marginHorizontal: 10 },
  distanceText: { fontSize: 12, fontWeight: '800', color: colors.primary, marginBottom: 4 },
  truckIcon: { backgroundColor: '#FFF', paddingHorizontal: 5, zIndex: 1 },
  dashedLine: { position: 'absolute', top: 25, left: 0, right: 0, height: 1, borderWidth: 1, borderColor: colors.primaryLight, borderStyle: 'dashed', zIndex: 0 },
  infoBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceSecondary, padding: 12, borderRadius: 12 },
  infoText: { fontSize: 13, color: colors.text, lineHeight: 18, marginBottom: 2 },
  infoTextSub: { fontSize: 11, color: colors.textSecondary, lineHeight: 16 },

  paymentCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 10, paddingBottom: 0, marginBottom: 25, elevation: 2 },
  paymentOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 16, borderWidth: 1, borderColor: 'transparent' },
  paymentOptionSelected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  paymentIconRow: { flexDirection: 'row', alignItems: 'center' },
  paymentText: { fontSize: 15, fontWeight: '600', color: colors.textSecondary, marginLeft: 12 },
  paymentTextSelected: { color: colors.primary, fontWeight: '700' },
  upiInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 12, paddingHorizontal: 12, height: 45, marginTop: 8, marginHorizontal: 10 },

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
