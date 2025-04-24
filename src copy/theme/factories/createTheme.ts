import type { Theme, ThemeColors, ThemeMode } from '@/theme/types/theme';

// Colores predeterminados comunes para light y dark
const DEFAULT_THEME_COLORS: ThemeColors = {
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: {
    main: '#4ADCFF',
    light: '#9CF8FF',
    dark: '#66A4A8',
  },
  secondary: {
    main: '#FFCC57',
    light: '#FFEB57',
    dark: '#F2BC65',
  },
  success: {
    main: '#C4F556',
    light: '#EBFF78',
    dark: '#A0C746',
  },
  info: {
    main: '#AF86F5',
    light: '#C4C5FF',
    dark: '#9087C9',
  },
  error: {
    main: '#FFCC57',
    light: '#FF7300',
    dark: '#C0514F',
  },
  warning: {
    main: '#FF727D',
    light: '#FF8F67',
    dark: '#CF5557',
  },
  background: {
    paper: '#E4E8F7',
    default: '#F5F6FF',
  },
  text: '#9fc700',
};

// Default themes for light and dark mode
const DEFAULT_THEMES: Record<ThemeMode, ThemeColors> = {
  light: DEFAULT_THEME_COLORS,
  dark: DEFAULT_THEME_COLORS, // Se pueden ajustar más adelante si hay diferencias específicas
};

export function createTheme(options: { mode?: ThemeMode; colors?: Partial<ThemeColors> } = {}): Theme {
  const mode: ThemeMode = options.mode ?? 'light'; // Fallback a 'light' si no se especifica el modo

  // Fusión de colores base con las opciones proporcionadas
  const baseColors = DEFAULT_THEMES[mode];

  const colors = {
    common: { ...baseColors.common, ...options.colors?.common },
    primary: { ...baseColors.primary, ...options.colors?.primary },
    secondary: { ...baseColors.secondary, ...options.colors?.secondary },
    success: { ...baseColors.success, ...options.colors?.success },
    info: { ...baseColors.info, ...options.colors?.info },
    error: { ...baseColors.error, ...options.colors?.error },
    warning: { ...baseColors.warning, ...options.colors?.warning },
    background: { ...baseColors.background, ...options.colors?.background },
    text: options.colors?.text ?? baseColors.text,
  };

  return {
    mode,
    colors,
  };
}
