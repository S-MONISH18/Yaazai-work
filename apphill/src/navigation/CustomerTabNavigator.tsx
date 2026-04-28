import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';

import CustomerDashboardScreen from '../screens/customer/CustomerDashboardScreen';
import BuyProductsScreen from '../screens/customer/BuyProductsScreen';
import RentVehicleScreen from '../screens/customer/RentVehicleScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ symbol, color, focused }: { symbol: string; color: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Text style={{ fontSize: 20, color }}>{symbol}</Text>
  </View>
);

export default function CustomerTabNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="CustomerHome"
        component={CustomerDashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <TabIcon symbol="🏠" {...props} />,
        }}
      />

      <Tab.Screen
        name="BuyProducts"
        component={BuyProductsScreen}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: (props) => <TabIcon symbol="🛍️" {...props} />,
        }}
      />

      <Tab.Screen
        name="CustomerRentVehicle"
        component={RentVehicleScreen}
        options={{
          tabBarLabel: 'Logistics',
          tabBarIcon: (props) => <TabIcon symbol="🚚" {...props} />,
        }}
      />

      <Tab.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (props) => <TabIcon symbol="👤" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  iconContainer: {
    width: 44,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  activeIconContainer: {
    backgroundColor: colors.primarySoft,
  },
});