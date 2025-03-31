import { inject } from 'vue';
import type { Theme, ThemeMode } from '@/theme/types/theme';
import { ThemeSymbol } from '@/theme/constants/theme-keys';

/**
 * Interfaz extendida del contexto del tema
 * @interface ThemeContext
 * @property {Theme} theme - Objeto reactivo con la configuración actual del tema
 * @property {() => void} toggleMode - Alterna entre modos claro/oscuro
 * @property {(mode: ThemeMode) => void} setMode - Establece un modo específico
 */
interface ThemeContext {
  theme: Theme;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

/**
 * Hook personalizado para gestión avanzada del tema
 * @function useTheme
 * @returns {ThemeContext} Objeto con:
 *  - El tema actual
 *  - Función para alternar entre modos
 *  - Función para establecer modo específico
 *
 * @throws {Error} Si se usa fuera de un ThemeProvider
 *
 * @example
 * // Uso básico
 * const { theme, toggleMode, setMode } = useTheme()
 *
 * // Cambiar a modo específico
 * setMode('dark')
 *
 * // Alternar modo actual
 * toggleMode()
 */
export function useTheme(): ThemeContext {
  // Intenta obtener el contexto inyectado por ThemeProvider
  const context = inject(ThemeSymbol); // Ahora usa el Symbol

  // Validación de seguridad para desarrollo
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider. ' + 'Envuelve tu aplicación con <ThemeProvider>');
  }

  return context;
}
