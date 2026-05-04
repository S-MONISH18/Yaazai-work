import React from 'react';
import { useAuth } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import FarmerTabNavigator from './FarmerTabNavigator';
import DriverTabNavigator from './DriverNavigator'; // ✅ file is DriverNavigator.tsx
import CustomerStackNavigator from './CustomerStackNavigator';

import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function RootNavigator() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  // 🔐 Not logged in
  if (!currentUser) {
    return <AuthNavigator />;
  }

  // 👨‍🌾 Farmer
  if (currentUser.role === 'farmer') {
    return <FarmerTabNavigator />;
  }

  // 🚜 Driver
  if (currentUser.role === 'driver') {
    return <DriverTabNavigator />;
  }

  // 🛒 Customer (UPDATED → Stack Navigator)
  if (currentUser.role === 'customer') {
    return <CustomerStackNavigator />;
  }

  // fallback
  return <AuthNavigator />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});