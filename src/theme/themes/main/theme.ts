import { createTheme } from './createTheme';
import { lightThemeColors } from './lightTheme';
import { darkThemeColors } from './darkTheme';

export const lightTheme = createTheme({
  ...lightThemeColors,
  mode: 'light',
});

export const darkTheme = createTheme({
  ...darkThemeColors,
  mode: 'dark',
});
