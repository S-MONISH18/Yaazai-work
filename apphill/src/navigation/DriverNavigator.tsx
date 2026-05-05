/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

// Screens
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import RegisterVehicleScreen from '../screens/driver/RegisterVehicleScreen';
import MyVehiclesScreen from '../screens/driver/MyVehiclesScreen';
import TripRequestsScreen from '../screens/driver/TripRequestsScreen';
import DriverProfileScreen from '../screens/driver/DriverProfileScreen';
import ActiveTripScreen from '../screens/driver/ActiveTripScreen';
import BookVehicleScreen from '../screens/driver/BookVehicleScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ name, color, focused }: { name: string; color: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <Icon name={name} size={22} color={color} />
  </View>
);

function DriverHomeStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
    </Stack.Navigator>
  );
}

function DriverVehicleStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyVehiclesList" component={MyVehiclesScreen} />
      <Stack.Screen name="BookVehicle" component={BookVehicleScreen} />
    </Stack.Navigator>
  );
}

export default function DriverNavigator() {
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
        name="DriverHome"
        component={DriverHomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <TabIcon name="home" {...props} />,
        }}
      />

      <Tab.Screen
        name="TripRequests"
        component={TripRequestsScreen}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: (props) => <TabIcon name="email" {...props} />,
        }}
      />

      <Tab.Screen
        name="Vehicles"
        component={DriverVehicleStack}
        options={{
          tabBarLabel: 'Fleet',
          tabBarIcon: (props) => <TabIcon name="truck" {...props} />,
        }}
      />

      <Tab.Screen
        name="RegisterVehicle"
        component={RegisterVehicleScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: (props) => <TabIcon name="plus" {...props} />,
        }}
      />

      <Tab.Screen
        name="DriverProfile"
        component={DriverProfileScreen}
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