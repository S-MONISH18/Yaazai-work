import React, { createContext, useContext, useState } from 'react';
interface User {
  name: string;
  phone: string;
  role: string;
  location?: string;
  joinDate?: string;
  email?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (params: { phone: string; password: string; role: string }) => { success: boolean; message?: string };
  signup: (data: User & { password?: string }) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: false,
  login: () => ({ success: false, message: 'Not initialized' }),
  signup: () => ({ success: false, message: 'Not initialized' }),
  logout: () => {},
});

// Mock Database
const MOCK_USERS = [
  { name: 'Siva Kumar', phone: '9876543210', password: '1234', role: 'farmer', location: 'Coimbatore' },
  { name: 'Arun Prakash', phone: '9876500000', password: '1234', role: 'driver', location: 'Salem' },
  { name: 'Mani Ratnam', phone: '9000000000', password: '1234', role: 'customer', location: 'Erode' },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = ({ phone, password, role }: { phone: string; password: string; role: string }) => {
    setIsLoading(true);
    
    // Simulate API delay
    const userMatch = MOCK_USERS.find(u => u.phone === phone && u.password === password && u.role === role);
    
    if (userMatch) {
      const userData = {
        name: userMatch.name,
        phone: userMatch.phone,
        role: userMatch.role,
        location: userMatch.location,
        joinDate: new Date().toISOString(),
      };
      setCurrentUser(userData);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, message: 'Invalid credentials or role' };
  };

  const signup = (data: any) => {
    setIsLoading(true);
    // Add to mock DB (just in memory for this session)
    const newUser = {
      name: data.name,
      phone: data.phone,
      role: data.role,
      location: data.location,
      joinDate: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);