// src/components/Button/types.d.ts
import type { Component, ConcreteComponent, ComputedRef } from 'vue';

export type ElementType = keyof HTMLElementTagNameMap | Component | ConcreteComponent;
export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShape = 'normal' | 'rounded' | 'pill';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

export interface ButtonProps {
  component?: ElementType;
  disabled?: boolean;
  disabledElevation?: boolean;
  disableRipple?: boolean;
  endIcon?: Component | ConcreteComponent | null;
  variant?: ResponsiveProp<ButtonVariant>;
  size?: ResponsiveProp<ButtonSize>;
  color?: ResponsiveProp<ButtonColor>;
  shape?: ResponsiveProp<ButtonShape>;
  shadow?: number | string;
  startIcon?: Component | ConcreteComponent | null;
  rippleDuration?: number;
  rippleColor?: string;
  rippleOpacity?: number;

  fullWidth?: boolean;
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
  endIcon: ComputedRef<Component | ConcreteComponent | null | undefined>;
  startIcon: ComputedRef<Component | ConcreteComponent | null | undefined>;

  fullWidth: ComputedRef<boolean>;
}

export interface ButtonStylesOptions extends ButtonClassesOptions {
  className: ComputedRef<string>;
}
