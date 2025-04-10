import { createTheme } from './createTheme';
import { lightThemeColors } from './newLightTheme';
import { darkThemeColors } from './newDarkTheme';

export const lightTheme = createTheme({
  ...lightThemeColors,
  mode: 'light',
});

export const darkTheme = createTheme({
  ...darkThemeColors,
  mode: 'dark',
});
