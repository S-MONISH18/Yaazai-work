import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from '../theme/colors';

// Screens
import FarmerDashboardScreen from '../screens/farmer/FarmerDashboardScreen';
import FarmDataScreen from '../screens/farmer/FarmDataScreen';
import AvailableVehiclesScreen from '../screens/farmer/AvailableVehiclesScreen';
import SellProductsScreen from '../screens/farmer/SellProductsScreen';
import FarmerProfileScreen from '../screens/farmer/FarmerProfileScreen';
import BookVehicleScreen from '../screens/driver/BookVehicleScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ symbol, color, focused }: { symbol: string; color: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Text style={{ fontSize: 20, color }}>{symbol}</Text>
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
        component={FarmerDashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <TabIcon symbol="🏠" {...props} />,
        }}
      />

      <Tab.Screen
        name="FarmData"
        component={FarmDataScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: (props) => <TabIcon symbol="📊" {...props} />,
        }}
      />

      <Tab.Screen
        name="Vehicles"
        component={VehicleStack}
        options={{
          tabBarLabel: 'Logistics',
          tabBarIcon: (props) => <TabIcon symbol="🚜" {...props} />,
        }}
      />

      <Tab.Screen
        name="SellProducts"
        component={SellProductsScreen}
        options={{
          tabBarLabel: 'Sell',
          tabBarIcon: (props) => <TabIcon symbol="💰" {...props} />,
        }}
      />

      <Tab.Screen
        name="FarmerProfile"
        component={FarmerProfileScreen}
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