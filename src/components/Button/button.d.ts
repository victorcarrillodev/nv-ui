// Definiciones de tipos para el componente Button

export type ButtonVariant = 'filled' | 'outlined' | 'text';

export interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
}

export interface ButtonClassesOptions {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
  className?: string;
}

export type ButtonStylesOptions = ButtonClassesOptions;
