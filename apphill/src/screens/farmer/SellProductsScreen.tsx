import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Alertttt } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import AppCard from '../../components/AppCard';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

export default function SellProductsScreen() {
  const [form, setForm] = useState({
    productName: '',
    category: '',
    quantity: '',
    price: '',
    location: '',
    description: '',
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpload = () => {
    const required = ['productName', 'category', 'quantity', 'price', 'location'];
    const missing = required.some(key => !form[key]);

    if (missing) {
      Alert.alert('Missing Information', 'Please fill all required fields marked with *');
      return;
    }

    Alert.alert('Success ✅', 'Your product listing has been created and is now live on the marketplace.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sell Your Produce</Text>
          <Text style={styles.subtitle}>
            Reach thousands of customers by listing your farm-fresh items.
          </Text>
        </View>

        <AppCard style={styles.formCard}>
          <InputField
            label="Product Name *"
            placeholder="e.g. Ooty Carrots"
            value={form.productName}
            onChangeText={value => updateField('productName', value)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <InputField
                label="Category *"
                placeholder="Vegetable"
                value={form.category}
                onChangeText={value => updateField('category', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <InputField
                label="Stock (kg) *"
                placeholder="500"
                keyboardType="numeric"
                value={form.quantity}
                onChangeText={value => updateField('quantity', value)}
              />
            </View>
          </View>

          <InputField
            label="Price per kg (₹) *"
            placeholder="e.g. 45"
            keyboardType="numeric"
            value={form.price}
            onChangeText={value => updateField('price', value)}
          />
          <InputField
            label="Farm Location *"
            placeholder="e.g. Pollachi, Tamil Nadu"
            value={form.location}
            onChangeText={value => updateField('location', value)}
          />
          <InputField
            label="Additional Details"
            placeholder="e.g. Organic, freshly harvested"
            multiline
            value={form.description}
            onChangeText={value => updateField('description', value)}
          />

          <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload} activeOpacity={0.8}>
            <Text style={styles.uploadBtnText}>Publish Listing</Text>
          </TouchableOpacity>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  content: { 
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 120 
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: { 
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  formCard: {
    padding: spacing.xl,
  },
  row: {
    flexDirection: 'row',
  },
  uploadBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  uploadBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});