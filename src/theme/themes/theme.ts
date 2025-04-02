import type { ThemeColors } from '../types/theme';

export const lightThemeColors: ThemeColors = {
  primary: {
    main: '#3f51b5',
    light: '#3f51b5',
    dark: '#3f51b5',
  },
  secondary: '#ff4081',
  background: {
    paper: '#ffffff',
    default: '#000000',
  },
  surface: '#f5f5f5',
  text: '#9fc700',
  border: '#e0e0e0',
};

export const darkThemeColors: ThemeColors = {
  primary: {
    main: '#000000',
    light: '#7986cb',
    dark: '#7986cb',
  },
  secondary: '#a2c914',
  background: {
    paper: '#4f5052',
    default: '#ffffff',
  },
  surface: '#1e1e1e',
  text: '#ff0000',
  border: '#424242',
};
