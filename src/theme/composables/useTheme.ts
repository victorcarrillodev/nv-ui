import { inject } from 'vue';
import { ThemeInjectionKey } from '../constants/theme-keys';
import type { ThemeContext } from '../types/theme-provider';

/**
 * Hook reactivo para acceder al contexto de tema actual.
 * Este hook debe usarse **únicamente** dentro de un componente envuelto por <ThemeProvider>.
 *
 * @throws Error si no se encuentra el ThemeContext (uso fuera de <ThemeProvider>)
 * @returns {ThemeContext} Objeto reactivo con el tema, setMode y toggleMode
 */
export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(ThemeInjectionKey);

  if (!context) {
    throw new Error('[useTheme] Este hook debe usarse dentro de un <ThemeProvider>');
  }

  return context;
}
