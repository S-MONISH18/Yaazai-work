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
      noPadding && styles.noPadding,
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  noPadding: {
    padding: 0,
  },
});