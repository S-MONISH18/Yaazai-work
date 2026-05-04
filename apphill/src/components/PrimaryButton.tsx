import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}

export default function PrimaryButton({ title, onPress, style, textStyle, disabled = false }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.55,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});