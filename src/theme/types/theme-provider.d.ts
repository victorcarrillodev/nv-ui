// src/theme/types/theme-provider.d.ts

import type { Theme, ThemeMode } from './theme';

/**
 * Contexto del sistema de temas (modo, colores y métodos).
 */
export interface ThemeContext {
  /**
   * Objeto reactivo con la configuración actual del tema.
   */
  theme: Theme;

  /**
   * Alterna entre modo claro y oscuro.
   */
  toggleMode: () => void;

  /**
   * Establece un modo específico ('light' | 'dark').
   */
  setMode: (mode: ThemeMode) => void;
}
