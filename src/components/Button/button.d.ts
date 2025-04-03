/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ThemeColors } from '../../types/theme';

/**
 * #Main properties of Button component
 *
 * @property disabled - Disabled state of the Button
 * @property filled - Button variant
 * @property outlined - Button variant
 * @property text - Button variant
 */
export interface ButtonProps {
  disabled?: boolean;
  filled?: boolean;
  outlined?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: boolean;
  color?: 'primary' | 'secondary';
}
/**
 * #Options for the classes generator
 *
 * Contain the same properties than ButtonProps but without optionals
 * since default values ​​are set in the component
 */
export interface ButtonClassesOptions {
  disabled: boolean;
  filled: boolean;
  outlined: boolean;
  size: 'sm' | 'md' | 'lg';
  text: boolean;
  color: 'primary' | 'secondary';
}

/**
 * Opciones para el generador de estilos
 *
 * Extiende las opciones de clases y añade los colores del tema
 */
export type ButtonStylesOptions = ButtonClassesOptions;

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
