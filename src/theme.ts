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

  // Scotia confirmation green
  green: '#00855A',
  greenWash: '#E6F4EF',
} as const;

// Source Sans 3 is the closest free match to Frutiger, Scotiabank's licensed brand typeface.
// Same humanist classification, open apertures, and organic terminal style.
export const fonts = {
  regular: 'SourceSans3_400Regular',
  medium: 'SourceSans3_500Medium',
  semibold: 'SourceSans3_600SemiBold',
  bold: 'SourceSans3_700Bold',
  extrabold: 'SourceSans3_800ExtraBold',
} as const;

// 7.5px base increments from the Scotia design language
export const space = {
  xs: 8,    // ~1×
  sm: 15,   // 2×
  md: 30,   // 4×
  lg: 45,   // 6×
  xl: 90,   // 12×
} as const;

// Scotia uses tight, utilitarian radii — 4–6px on cards, 5px rect buttons.
// Pill (999) only for marketing CTAs.
export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  card: 14,
  pill: 999,
} as const;

// Subtle, neutral shadows only. No colored glows or dramatic offsets.
export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  sheet: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
} as const;
