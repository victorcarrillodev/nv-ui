// src/theme/constants/theme-keys.ts

// Importación de tipos necesarios
import type { Theme, ThemeMode } from '@/theme/types/theme'; // Tipos personalizados del tema
import type { InjectionKey } from 'vue'; // Tipo de Vue para inyección de dependencias

/**
 * Símbolo único para la inyección del contexto del tema en el árbol de componentes.
 *
 * Este símbolo es utilizado para proveer e inyectar el contexto del tema de manera global
 * dentro de la aplicación. Usar `Symbol.for()` asegura que el símbolo sea único
 * a nivel global y no cause colisiones con otros símbolos.
 *
 * @example
 * // En un componente padre:
 * provide(ThemeSymbol, themeContext);
 *
 * // En un componente hijo:
 * const theme = inject(ThemeSymbol);
 */
export const ThemeSymbol = Symbol.for('theme') as InjectionKey<ThemeContext>;

/**
 * Interfaz que define la estructura del contexto del tema.
 *
 * Contiene:
 * 1. El estado actual del tema (reactivo).
 * 2. Métodos para manipular el tema (cambiar entre modos y actualizar configuraciones).
 *
 * Se puede extender fácilmente en el futuro para incluir más funcionalidades,
 * como escuchar cambios en el tema o manipular más configuraciones globales.
 *
 * @property {Theme} theme - El objeto reactivo con la configuración actual del tema.
 * @property {Function} toggleMode - Función que alterna entre los modos de tema (light / dark).
 * @property {Function} setMode - Función para establecer el modo de tema (light | dark | system).
 */
export interface ThemeContext {
  theme: Theme; // El objeto reactivo con la configuración actual del tema
  toggleMode: () => void; // Función que alterna entre los modos de tema
  setMode: (mode: ThemeMode) => void; // Función para establecer el modo de tema (light | dark | system)
  // Se pueden agregar más propiedades o métodos si es necesario en el futuro
}
