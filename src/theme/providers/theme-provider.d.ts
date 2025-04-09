import type { Theme, ThemeMode } from './theme';

/**
 * Interfaz para el contexto que provee ThemeProvider
 */
export interface ThemeContext {
  /**
   * Estado reactivo del tema actual (modo y colores)
   */
  theme: Theme;

  /**
   * Cambia entre modo claro y oscuro
   */
  toggleMode: () => void;

  /**
   * Establece un modo de tema específico ('light' | 'dark')
   */
  setMode: (mode: ThemeMode) => void;
}
