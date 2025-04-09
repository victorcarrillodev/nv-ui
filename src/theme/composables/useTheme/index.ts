// src/theme/composables/useTheme/index.ts

import { inject } from 'vue';
import { ThemeSymbol } from '@/theme/constants/theme-keys';
import type { ThemeContext } from '@/theme/types/theme-provider';

/**
 * Composable para consumir el contexto del tema actual.
 * Debe usarse dentro de un ThemeProvider.
 *
 * @returns Objeto reactivo del contexto de tema
 */
export function useTheme(): ThemeContext {
  const context = inject(ThemeSymbol);

  if (!context) {
    throw new Error('[useTheme] must be used within a <ThemeProvider>');
  }

  return context;
}
