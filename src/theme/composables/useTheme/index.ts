// src/theme/composables/useTheme/index.ts

import { inject } from 'vue';
import { ThemeSymbol, type ThemeContext } from '@/theme/constants/theme-keys';

/**
 * Hook personalizado para gestión avanzada del tema
 * @returns {ThemeContext} Objeto con:
 *  - El tema actual
 *  - Función para alternar entre modos
 *  - Función para establecer modo específico
 *
 * @throws {Error} Si se usa fuera de un ThemeProvider
 */
export function useTheme(): ThemeContext {
  // Intentamos obtener el contexto inyectado por ThemeProvider
  const context = inject(ThemeSymbol);

  // Si no se inyecta, lanzamos un error
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }

  return context;
}
