import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export default function PageHeader({ title, subtitle, rightElement, onBack, showBack = false }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: back button or spacer */}
      <View style={styles.leftSlot}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Center: title + optional subtitle */}
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {/* Right: custom element or spacer */}
      <View style={styles.rightSlot}>
        {rightElement ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftSlot: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 30,
    lineHeight: 34,
    color: colors.text,
    fontWeight: '300',
    marginTop: -2,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
