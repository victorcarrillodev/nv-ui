import { Component, ConcreteComponent } from 'vue';

type ElementType =
  | keyof HTMLElementTagNameMap // Elementos HTML ('div', 'span', etc.)
  | Component // Componentes Vue (options API o composition API)
  | ConcreteComponent; // Componentes con más tipado específico
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
  component?: ElementType;
}

export interface ButtonClassesOptions {
  disabled: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  className?: string;
  shape: ButtonShape;
  shadow: number | string;
  component: ElementType;
}

export type ButtonStylesOptions = ButtonClassesOptions;
