import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { farmerProducts } from '../../data/mockData';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function MyProductsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.h2, styles.title]}>My Products</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>

        {farmerProducts.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.name}>{item.productName}</Text>
            <Text style={styles.text}>Category: {item.category}</Text>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>
            <Text style={styles.text}>Price: ₹{item.price}</Text>
            <Text style={styles.text}>Location: {item.location}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.lg, marginBottom: spacing.lg },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  title: { color: colors.primary, marginBottom: 0 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  name: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
});