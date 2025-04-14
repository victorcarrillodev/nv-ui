// Props definitions for button component
export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSizes = 'sm' | 'md' | 'lg';
export type ButtonColors = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShapes = 'normal' | 'rounded' | 'pill';
// Main Button interface
export interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSizes;
  color?: ButtonColors;
  shape?: ButtonShapes;
  shadow?: number | string;
}
// Button interface for styles
export interface ButtonClassesOptions {
  disabled: boolean;
  variant: ButtonVariant;
  size: ButtonSizes;
  color: ButtonColors;
  className?: string;
  shape: ButtonShapes;
  shadow: number | string;
}
// Button type for classes
export type ButtonStylesOptions = ButtonClassesOptions;
