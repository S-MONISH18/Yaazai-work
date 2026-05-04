import { StyleSheet } from 'react-native';
import colors from './colors';
import spacing from './spacing';

export const globalStyles = StyleSheet.create({
  // ─── Layout ────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentPadding: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Elevation ─────────────────────────────────────────────────────
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  // ─── Input ─────────────────────────────────────────────────────────
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  // ─── Sections ──────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

  // ─── Dividers ──────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerMd: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },

  // ─── Buttons ───────────────────────────────────────────────────────
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ─── List row (Ola-style) ───────────────────────────────────────────
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  listRowText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    marginLeft: spacing.md,
  },
});

export default globalStyles;
