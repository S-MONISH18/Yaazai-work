import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import AppCard from '../../components/AppCard';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import Badge from '../../components/Badge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegisterVehicleScreen() {
  const [available, setAvailable] = useState(true);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    vehicleModel: '',
    vehicleNumber: '',
    horsepower: '',
    fuelType: '',
    hourlyRate: '',
    dailyRate: '',
  });

  const handleSubmit = () => {
    const requiredFields = [
      'ownerName',
      'email',
      'phone',
      'location',
      'vehicleModel',
      'vehicleNumber',
      'horsepower',
      'fuelType',
      'hourlyRate',
      'dailyRate',
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Registration Successful',
      'Your vehicle has been registered and is now available for rent!',
      [{ text: 'OK' }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[typography.h1, styles.pageTitle]}>Register Your Vehicle</Text>
          <Text style={[typography.body, styles.pageSubtitle]}>
            List your vehicle for rent and start earning money
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Owner Information</Text>
          <AppCard>
            <InputField
              label="Full Name *"
              placeholder="Enter your full name"
              value={formData.ownerName}
              onChangeText={value => updateFormData('ownerName', value)}
            />
            <InputField
              label="Email Address *"
              placeholder="your.email@example.com"
              value={formData.email}
              onChangeText={value => updateFormData('email', value)}
              icon={<Icon name="email" size={20} color={colors.textSecondary} />}
            />
            <InputField
              label="Phone Number *"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChangeText={value => updateFormData('phone', value)}
              icon={<Icon name="phone" size={20} color={colors.textSecondary} />}
            />
            <InputField
              label="Location *"
              placeholder="City, State"
              value={formData.location}
              onChangeText={value => updateFormData('location', value)}
              icon={<Icon name="map-marker" size={20} color={colors.textSecondary} />}
            />
          </AppCard>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Vehicle Details</Text>
          <AppCard>
            <InputField
              label="Vehicle Model *"
              placeholder="e.g. Mahindra 575 DI"
              value={formData.vehicleModel}
              onChangeText={value => updateFormData('vehicleModel', value)}
              icon={<Icon name="tractor" size={20} color={colors.textSecondary} />}
            />
            <InputField
              label="Registration Number *"
              placeholder="e.g. TN-36K-8077"
              value={formData.vehicleNumber}
              onChangeText={value => updateFormData('vehicleNumber', value)}
              icon={<Icon name="card-account-details" size={20} color={colors.textSecondary} />}
            />
            <View style={styles.row}>
              <View style={styles.halfField}>
                <InputField
                  label="Horsepower *"
                  placeholder="47"
                  value={formData.horsepower}
                  onChangeText={value => updateFormData('horsepower', value)}
                  icon={<Icon name="lightning-bolt" size={20} color={colors.textSecondary} />}
                />
              </View>
              <View style={styles.halfField}>
                <InputField
                  label="Fuel Type *"
                  placeholder="Diesel"
                  value={formData.fuelType}
                  onChangeText={value => updateFormData('fuelType', value)}
                  icon={<Icon name="gas-station" size={20} color={colors.textSecondary} />}
                />
              </View>
            </View>
          </AppCard>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Rental Pricing</Text>
          <AppCard>
            <View style={styles.row}>
              <View style={styles.halfField}>
                <InputField
                  label="Hourly Rate (₹) *"
                  placeholder="500"
                  value={formData.hourlyRate}
                  onChangeText={value => updateFormData('hourlyRate', value)}
                  keyboardType="numeric"
                  icon={<Icon name="clock-outline" size={20} color={colors.textSecondary} />}
                />
              </View>
              <View style={styles.halfField}>
                <InputField
                  label="Daily Rate (₹) *"
                  placeholder="3500"
                  value={formData.dailyRate}
                  onChangeText={value => updateFormData('dailyRate', value)}
                  keyboardType="numeric"
                  icon={<Icon name="calendar" size={20} color={colors.textSecondary} />}
                />
              </View>
            </View>

            {formData.hourlyRate && formData.dailyRate ? (
              <View style={styles.pricePreview}>
                <Text style={[typography.bodySmall, styles.previewLabel]}>Price Preview</Text>
                <View style={styles.previewRow}>
                  <View style={styles.previewItem}>
                    <Text style={[typography.caption, styles.previewType]}>Hourly</Text>
                    <Text style={[typography.h4, styles.previewPrice]}>₹{formData.hourlyRate}</Text>
                  </View>
                  <View style={styles.previewItem}>
                    <Text style={[typography.caption, styles.previewType]}>Daily</Text>
                    <Text style={[typography.h4, styles.previewPrice]}>₹{formData.dailyRate}</Text>
                  </View>
                </View>
              </View>
            ) : null}
          </AppCard>
        </View>

        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Availability</Text>
          <AppCard>
            <View style={styles.availabilityRow}>
              <View style={styles.availabilityInfo}>
                <Text style={[typography.label, styles.availabilityLabel]}>
                  Make vehicle available for rent
                </Text>
                <Text style={[typography.caption, styles.availabilityHint]}>
                  Turn this off if you want to pause rentals temporarily
                </Text>
              </View>
              <Switch
                value={available}
                onValueChange={setAvailable}
                trackColor={{ false: colors.textMuted, true: colors.successLight }}
                thumbColor={available ? colors.success : colors.surface}
              />
            </View>

            <View style={styles.statusIndicator}>
              <Badge
                text={available ? 'Available for Rent' : 'Not Available'}
                variant={available ? 'success' : 'default'}
              />
            </View>
          </AppCard>
        </View>

        <View style={styles.submitSection}>
          <PrimaryButton
            title="Register Vehicle"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
          <Text style={[typography.caption, styles.disclaimer]}>
            By registering, you agree to our terms and conditions. All rentals are subject to verification.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  pageTitle: {
    marginBottom: spacing.sm,
    color: colors.primary,
  },
  pageSubtitle: {
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  pricePreview: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surfaceSecondary || '#F5F7F6',
    borderRadius: 12,
  },
  previewLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewItem: {
    flex: 1,
    alignItems: 'center',
  },
  previewType: {
    color: colors.textMuted,
    marginBottom: spacing.xs / 2,
  },
  previewPrice: {
    color: colors.primary,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  availabilityInfo: {
    flex: 1,
    marginRight: spacing.lg,
  },
  availabilityLabel: {
    marginBottom: spacing.xs / 2,
  },
  availabilityHint: {
    color: colors.textMuted,
  },
  statusIndicator: {
    alignItems: 'flex-start',
  },
  submitSection: {
    marginTop: spacing.xl,
  },
  submitButton: {
    marginBottom: spacing.md,
  },
  disclaimer: {
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});