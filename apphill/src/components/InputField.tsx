import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  secureTextEntry?: boolean;
  icon?: React.ReactNode;
  multiline?: boolean;
  style?: any;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  icon,
  multiline = false,
  style,
}: InputFieldProps) {
  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[
        styles.inputContainer,
        multiline && styles.multilineContainer,
        !label && styles.noLabel,
      ]}>
        {icon && <View style={styles.iconWrap}>{icon}</View>}

        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginLeft: 2,
  },
  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  multilineContainer: {
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  multilineInput: {
    minHeight: 100,
  },
  noLabel: {
    marginTop: 0,
  },
});