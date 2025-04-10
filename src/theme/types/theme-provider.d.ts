// src/theme/types/theme-provider.ts
import type { Theme } from './newTheme';

export interface ThemeContext {
  theme: Theme;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
}
