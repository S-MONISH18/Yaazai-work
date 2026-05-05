/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

import CustomerDashboardScreen from '../screens/customer/CustomerDashboardScreen';
import BuyProductsScreen from '../screens/customer/BuyProductsScreen';
import RentVehicleScreen from '../screens/customer/RentVehicleScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';
import OrderProductScreen from '../screens/customer/OrderProductScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MarketStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Marketplace" component={BuyProductsScreen} />
      <Stack.Screen name="OrderProduct" component={OrderProductScreen} />
    </Stack.Navigator>
  );
}

const TabIcon = ({ name, color, focused }: { name: string; color: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Icon name={name} size={22} color={color} />
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
          tabBarIcon: (props) => <TabIcon name="home" {...props} />,
        }}
      />

      <Tab.Screen
        name="BuyProductsStack"
        component={MarketStack}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: (props) => <TabIcon name="store" {...props} />,
        }}
      />

      <Tab.Screen
        name="CustomerRentVehicle"
        component={RentVehicleScreen}
        options={{
          tabBarLabel: 'Logistics',
          tabBarIcon: (props) => <TabIcon name="truck" {...props} />,
        }}
      />

      <Tab.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (props) => <TabIcon name="account" {...props} />,
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
  tabIconText: {
    fontSize: 20,
  },
});