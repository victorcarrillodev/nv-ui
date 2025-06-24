import { inject, computed } from 'vue';
import { ThemeInjectionKey } from '../constants/theme-keys';
import { lightTheme } from '../themes/theme';
import type { ThemeContext } from '../types/theme-provider';

/**
 * Hook reactivo para acceder al contexto de tema actual.
 * Si no se encuentra el contexto (uso fuera de <ThemeProvider>), retorna un tema por defecto.
 *
 * ⚠️ No permite cambiar de modo si no hay provider.
 */
export function useTheme(): ThemeContext {
  const context = inject<ThemeContext | null>(ThemeInjectionKey, null);

  if (context) return context;

  console.warn('[useTheme] No se encontró <ThemeProvider>. Usando tema por defecto (light).');

  return {
    theme: computed(() => lightTheme),
    setMode: () => {
      console.warn('[useTheme] setMode no está disponible sin <ThemeProvider>.');
    },
    toggleMode: () => {
      console.warn('[useTheme] toggleMode no está disponible sin <ThemeProvider>.');
    },
  };
}
