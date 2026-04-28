import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
        !label && { marginTop: 0 }
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
    marginBottom: spacing.lg,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  inputContainer: {
    minHeight: 56,
    borderWidth: 1.5,
    borderColor: '#EEF2EE',
    borderRadius: 18,
    backgroundColor: '#F7F9F7',
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
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  multilineInput: {
    minHeight: 100,
  },
});

import { Platform } from 'react-native';