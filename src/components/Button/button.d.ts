export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShape = 'normal' | 'rounded' | 'pill';

export interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  shadow?: number | string;
}

export interface ButtonClassesOptions {
  disabled: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  className?: string;
  shape: ButtonShape;
  shadow: number | string;
}

export type ButtonStylesOptions = ButtonClassesOptions;
