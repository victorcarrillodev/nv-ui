import { Component, ConcreteComponent } from 'vue';

type ElementType = keyof HTMLElementTagNameMap | Component | ConcreteComponent;
export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShape = 'normal' | 'rounded' | 'pill';

export type ResponsiveProp<T> = T | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;

export interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ResponsiveProp<ButtonSize>;
  color?: ResponsiveProp<ButtonColor>;
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
