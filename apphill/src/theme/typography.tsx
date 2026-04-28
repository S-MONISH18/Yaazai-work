import { Platform, TextStyle } from 'react-native';
import colors from './colors';

const baseFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: 'System',
});

const baseFontBold = Platform.select({
  ios: 'AvenirNext-Bold',
  android: 'sans-serif-condensed',
  default: 'System',
});

type TypographyMap = {
  [key: string]: TextStyle;
};

const typography: TypographyMap = {
  h1: {
    fontFamily: baseFontBold,
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: baseFontBold,
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: baseFontBold,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontFamily: baseFont,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: baseFont,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  label: {
    fontFamily: baseFontBold,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  caption: {
    fontFamily: baseFont,
    fontSize: 12,
    color: colors.textMuted,
  },
  price: {
    fontFamily: baseFontBold,
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
};

export default typography;