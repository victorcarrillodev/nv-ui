// src/theme/composables/useTheme/index.ts
import { inject } from 'vue';
import { ThemeSymbol } from '@/theme/constants/theme-keys';
import type { ThemeContext } from '@/theme/types/theme-provider';

export function useTheme(): ThemeContext {
  const context = inject(ThemeSymbol);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
}
