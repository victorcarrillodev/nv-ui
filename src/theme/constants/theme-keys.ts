// Importación de tipos necesarios
import type { Theme, ThemeMode } from '@/theme/types/theme'; // Tipos personalizados del tema
import type { InjectionKey } from 'vue'; // Tipo de Vue para inyección de dependencias

/**
 * Símbolo único para la inyección del tema en el árbol de componentes
 *
 * - Usa Symbol.for() para garantizar unicidad global (evita colisiones)
 * - 'theme' es el identificador único para este Symbol
 * - InjectionKey<ThemeContext> provee tipado seguro para provide/inject
 *
 * @example
 * provide(ThemeSymbol, themeContext) // En componente padre
 * const theme = inject(ThemeSymbol)  // En componente hijo
 */
export const ThemeSymbol = Symbol.for('theme') as InjectionKey<ThemeContext>;

/**
 * Interfaz que define la estructura del contexto del tema
 *
 * Contiene:
 * 1. El estado actual del tema (reactivo)
 * 2. Métodos para manipular el tema
 *
 * @property {Theme} theme - Objeto reactivo con la configuración actual del tema
 * @property {Function} toggleMode - Alterna entre modos claro/oscuro
 * @property {Function} setMode - Establece un modo específico programáticamente
 *
 * @example
 * interface ThemeContext {
 *   theme: { mode: 'light', colors: {...} },
 *   toggleMode: () => void,
 *   setMode: (mode: 'dark') => void
 * }
 */
export interface ThemeContext {
  theme: Theme; // Estado reactivo del tema
  toggleMode: () => void; // Función sin parámetros
  setMode: (mode: ThemeMode) => void; // Función que acepta 'light'|'dark'|'system'
}
