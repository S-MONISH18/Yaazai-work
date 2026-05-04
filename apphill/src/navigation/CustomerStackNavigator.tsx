import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerTabNavigator from './CustomerTabNavigator';
import BookVehicleScreen from '../screens/driver/BookVehicleScreen';
import ProductDetailScreen from '../screens/customer/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function CustomerStackNavigator() {
  return (
    <Stack.Navigator id={undefined}>

      {/* Tabs */}
      <Stack.Screen
        name="CustomerTabs"
        component={CustomerTabNavigator}
        options={{ headerShown: false }}
      />

      {/* Booking Screen */}
      <Stack.Screen
        name="BookVehicle"
        component={BookVehicleScreen}
        options={{ title: 'Book Vehicle' }}
      />

      {/* Product Detail Screen */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}