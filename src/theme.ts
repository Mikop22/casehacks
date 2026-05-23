// Scotia design tokens for React Native, derived from scotia-tokens.css
// Public-site-aligned palette. Keep red decisive and sparse; white/light-gray base.

export const colors = {
  red: '#EC111A',
  redAlt: '#ED0722',
  redDark: '#AD0000',
  redHover: '#BB061B',

  ink: '#333333',
  inkStrong: '#1A1919',
  black: '#1F1F1F',

  white: '#FFFFFF',
  canvas: '#FAFBFD',
  surface: '#F6F6F6',
  surfaceAlt: '#F5F6FC',

  gray700: '#4A4A4A',
  gray600: '#555555',
  gray500: '#747474',
  gray400: '#A8A8A8',
  gray300: '#D6D6D6',
  gray200: '#EEEEEE',

  border: '#E2E8EE',
  focus: '#009DD6',
  linkBlue: '#157DB9',

  // Soft red wash for badges / accents on white
  redWash: '#FDECEC',
  redWashBorder: '#F7C9CB',
} as const;

// Geometric sans approximating Scotia's Sharp Sans-based typeface.
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  extrabold: 'Poppins_800ExtraBold',
} as const;

// 7.5px base increments from the design language
export const space = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 44,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: '#1A1919',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  hero: {
    shadowColor: colors.redDark,
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
  cta: {
    shadowColor: '#1A1919',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
} as const;
