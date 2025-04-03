// src/theme/types/theme-context.ts

import type { Theme, ThemeMode } from '@/theme/types/theme'; // Importa los tipos de tema

/**
 * Interfaz para el contexto del tema
 * @property {Theme} theme - Objeto reactivo con la configuración actual del tema
 * @property {() => void} toggleMode - Alterna entre modos claro/oscuro
 * @property {(mode: ThemeMode) => void} setMode - Establece un modo específico
 */
export interface ThemeContext {
  theme: Theme;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}
