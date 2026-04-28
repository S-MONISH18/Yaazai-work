// Centralized types for Yaazai Platform

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Vehicle {
  id: string;
  driverId: string;
  ownerName: string;
  phone: string;
  vehicleType: string;
  vehicleModel: string;
  registrationNumber: string;
  capacityKg: number;
  availability: boolean;
  estimatedPrice: number;
  location: Location;
  image: string;
  rating: number;
}

export interface Product {
  id: string;
  farmerName: string;
  location: string;
  productName: string;
  category: string;
  quantity: number; // in kg
  price: number;
  image: string;
}

export type RootStackParamList = {
  Auth: undefined;
  FarmerTabs: undefined;
  DriverTabs: undefined;
  CustomerTabs: undefined;
};

// We use 'any' for parametric navigation for broad compatibility initially
// You can refine these further per screen stack later.
export type NavigationProps = any;
export type RouteProps = any;
