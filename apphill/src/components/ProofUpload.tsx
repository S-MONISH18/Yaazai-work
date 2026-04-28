import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface ProofUploadProps {
  label: string;
  isUploaded: boolean;
  onPress: () => void;
}

export default function ProofUpload({ label, isUploaded, onPress }: ProofUploadProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.uploadBox, isUploaded && styles.uploadedBox]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconCircle, isUploaded && styles.uploadedIconCircle]}>
          <Text style={styles.iconText}>{isUploaded ? '✓' : '📷'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, isUploaded && styles.uploadedTitle]}>
            {isUploaded ? 'Verification Complete' : 'Upload Visual Proof'}
          </Text>
          <Text style={[styles.subtitle, isUploaded && styles.uploadedSubtitle]}>
            {isUploaded ? 'Image successfully captured' : 'Tap to open camera or gallery'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    ...typography.label,
    marginBottom: 10,
    color: colors.textSecondary,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  uploadedBox: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    borderStyle: 'solid',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  uploadedIconCircle: {
    backgroundColor: colors.primary,
  },
  iconText: {
    fontSize: 20,
    color: colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  uploadedTitle: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  uploadedSubtitle: {
    color: colors.textSecondary,
  },
});
