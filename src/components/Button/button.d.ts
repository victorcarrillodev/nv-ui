import type { ThemeColors } from '../../types/theme';
/**
 * Main properties of Button component
 *
 * @property filled - button variant
 * @property outlined - button variant
 * @property text - button variant
 * @property disabled - Disabled state of the Button
 */
export interface ButtonProps {
  filled?: boolean;
  outlined?: boolean;
  text?: boolean;
  disabled?: boolean;
}
/**
 * Options for classes generator
 *
 * Contiene las mismas propiedades que ButtonProps pero sin opcionales
 * ya que se establecen valores por defecto en el componente
 */
export interface ButtonClassesOptions {
  filled?: boolean;
  outlined?: boolean;
  text?: boolean;
  disabled: boolean;
}

/**
 * Opciones para el generador de estilos
 *
 * Extiende las opciones de clases y añade los colores del tema
 */
export interface ButtonStylesOptions extends ButtonClassesOptions {
  colors: ThemeColors;
}

/**
 * Tipo para elementos de clase CSS
 *
 * Puede ser:
 * - string (nombre de clase directo)
 * - Record<string, boolean> (clase condicional)
 */
export type ButtonClassItem = string | Record<string, boolean>;

/**
 * Tipo para el objeto de estilos dinámicos
 *
 * @property [key: string] - Permite cualquier propiedad CSS
 * @property '&:hover' - Estilos para estado hover
 * @property '&:disabled' - Estilos para estado disabled
 */
export type ButtonStyleObject = {
  [key: string]: string | number | ButtonStyleObject;
} & {
  '&:hover'?: Record<string, string>;
  '&:disabled'?: Record<string, string>;
};

/**
 * Resultado del hook useButtonClasses
 *
 * Retorna un ComputedRef con array de clases
 */
export type UseButtonClassesReturn = ComputedRef<ButtonClassItem[]>;

/**
 * Resultado del hook useButtonStyles
 *
 * Retorna un ComputedRef con objeto de estilos
 */
export type UseButtonStylesReturn = ComputedRef<ButtonStyleObject>;
