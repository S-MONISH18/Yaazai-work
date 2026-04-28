import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  noPadding?: boolean;
}

export default function AppCard({ children, style, noPadding = false }: AppCardProps) {
  return (
    <View style={[
      styles.card, 
      noPadding && { padding: 0 }, 
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});