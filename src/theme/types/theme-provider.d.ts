// src/theme/types/theme-provider.ts
import type { ComputedRef } from 'vue';
import type { Theme } from './theme';

export interface ThemeContext {
  theme: ComputedRef<Theme>;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
}
