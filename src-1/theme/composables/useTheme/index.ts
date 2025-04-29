// src/theme/composables/useTheme/index.ts

import { inject } from 'vue';
import { ThemeInjectionKey } from '@/theme/constants/theme-keys';
import type { ThemeContext } from '@/theme/types/theme-provider';

/**
 * Hook para acceder al tema actual desde cualquier componente.
 * Debe ser usado dentro de ThemeProvider.
 */
export function useTheme(): ThemeContext {
  const context = inject(ThemeInjectionKey);

  if (!context) {
    throw new Error('[useTheme] debe usarse dentro de un <ThemeProvider>');
  }

  return context;
}
