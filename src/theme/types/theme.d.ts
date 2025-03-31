/**
 * Tipo que define los modos de tema disponibles
 * @enum
 * @property {string} light - Tema claro
 * @property {string} dark - Tema oscuro
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Interfaz que describe la paleta de colores del tema
 * @interface
 * @property {string} primary - Color primario de la aplicación
 * @property {string} secondary - Color secundario/acento
 * @property {string} background - Color de fondo general
 * @property {string} surface - Color de superficies (cards, paneles)
 * @property {string} text - Color principal del texto
 * @property {string} border - Color para bordes y divisiones
 *
 * @example
 * const colors: ThemeColors = {
 *   primary: '#3b82f6',
 *   secondary: '#10b981',
 *   background: '#ffffff',
 *   surface: '#f9fafb',
 *   text: '#111827',
 *   border: '#e5e7eb'
 * }
 */

export interface PalleteColor {
  main: string;
  light: string;
  dark: string;
}
export interface ThemeColors {
  primary: PalleteColor;
  secondary: string;
  background: {
    paper: string;
    default: string;
  };
  surface: string;
  text: string;
  border: string;
}

/**
 * Interfaz principal del tema de la aplicación
 * @interface
 * @property {ThemeMode} mode - Modo actual del tema (light/dark)
 * @property {ThemeColors} colors - Configuración de colores
 *
 * @example
 * const defaultTheme: Theme = {
 *   mode: 'light',
 *   colors: {
 *     primary: '#3b82f6',
 *     secondary: '#10b981',
 *     background: '#ffffff',
 *     surface: '#f9fafb',
 *     text: '#111827',
 *     border: '#e5e7eb'
 *   }
 * }
 */
export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  // Agrega aquí cualquier otra propiedad que necesites
}
