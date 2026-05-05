/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import FarmerDashboardScreen from '../screens/farmer/FarmerDashboardScreen';

import AvailableVehiclesScreen from '../screens/farmer/AvailableVehiclesScreen';
import SellProductsScreen from '../screens/farmer/SellProductsScreen';
import FarmerProfileScreen from '../screens/farmer/FarmerProfileScreen';
import BookVehicleScreen from '../screens/driver/BookVehicleScreen';
import MyProductsScreen from '../screens/farmer/MyProductsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ name, color, focused }: { name: string; color: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Icon name={name} size={22} color={color} />
  </View>
);

function VehicleStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AvailableVehicles"
        component={AvailableVehiclesScreen}
      />
      <Stack.Screen
        name="BookVehicle"
        component={BookVehicleScreen}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={FarmerDashboardScreen}
      />
      <Stack.Screen
        name="MyProducts"
        component={MyProductsScreen}
      />
    </Stack.Navigator>
  );
}

export default function FarmerTabNavigator() {
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
        name="FarmerHome"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <TabIcon name="home" {...props} />,
        }}
      />


      <Tab.Screen
        name="Vehicles"
        component={VehicleStack}
        options={{
          tabBarLabel: 'Logistics',
          tabBarIcon: (props) => <TabIcon name="tractor" {...props} />,
        }}
      />

      <Tab.Screen
        name="SellProducts"
        component={SellProductsScreen}
        options={{
          tabBarLabel: 'Sell',
          tabBarIcon: (props) => <TabIcon name="cash" {...props} />,
        }}
      />

      <Tab.Screen
        name="FarmerProfile"
        component={FarmerProfileScreen}
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
  iconText: {
    fontSize: 20,
  },
});