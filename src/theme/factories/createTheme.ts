import type { Theme, ThemeColors, ThemeMode } from '@/theme/types/theme';

const DEFAULT_THEMES: Record<ThemeMode, ThemeColors> = {
  light: {
    primary: {
      main: '#3f51b5',
      light: '#3f51b5',
      dark: '#3f51b5',
    },
    secondary: '#ff4081',
    background: {
      paper: '#ffffff',
      default: '#00000',
    },
    surface: '#f5f5f5',
    text: '#212121',
    border: '#e0e0e0',
  },
  dark: {
    primary: {
      main: '#3f51b5',
      light: '#3f51b5',
      dark: '#3f51b5',
    },
    secondary: '#a2c914',
    background: {
      paper: '#00000000',
      default: '#0000',
    },
    surface: '#1e1e1e',
    text: '#e0e0e0',
    border: '#424242',
  },
};

export function createTheme(options: Partial<{ mode: ThemeMode; colors: Partial<ThemeColors> }> = {}): Theme {
  const mode: ThemeMode = options.mode || 'light';

  return {
    mode,
    colors: {
      ...DEFAULT_THEMES[mode],
      ...(options.colors || {}),
    },
  };
}
