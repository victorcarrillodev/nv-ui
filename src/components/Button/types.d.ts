import type { Component, ConcreteComponent, ComputedRef } from 'vue';

export type ElementType = keyof HTMLElementTagNameMap | Component | ConcreteComponent;
export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShape = 'normal' | 'rounded' | 'pill';

export type ResponsiveProp<T> = T | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;

export interface ButtonProps {
  component?: ElementType;
  disabled?: boolean;
  disabledElevation?: boolean;
  variant?: ResponsiveProp<ButtonVariant>;
  size?: ResponsiveProp<ButtonSize>;
  color?: ResponsiveProp<ButtonColor>;
  shape?: ResponsiveProp<ButtonShape>;
  shadow?: number | string;
}

export interface ButtonClassesOptions {
  component?: ElementType;
  disabled: ComputedRef<boolean>;
  disabledElevation: ComputedRef<boolean>;
  variant: ComputedRef<ButtonVariant>;
  size: ComputedRef<ButtonSize>;
  color: ComputedRef<ButtonColor>;
  shape: ComputedRef<ButtonShape>;
  shadow: ComputedRef<number | string>;
}

export interface ButtonStylesOptions extends ButtonClassesOptions {
  className: ComputedRef<string>;
}
