import type { Component, ConcreteComponent, ComputedRef } from 'vue';

export type ElementType = keyof HTMLElementTagNameMap | Component | ConcreteComponent;
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning';
export type ButtonShape = 'normal' | 'rounded' | 'pill';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'filled' | 'outlined' | 'text';

export type EndIcon = Component | ConcreteComponent | null;
export type LoadingIndicator = Component | ConcreteComponent | null;
export type LoadingPosition = 'start' | 'end' | 'center';

export type StartIcon = Component | ConcreteComponent | null;

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

export interface ButtonProps {
  color?: ResponsiveProp<ButtonColor>;
  component?: ResponsiveProp<ElementType>;
  disabled?: ResponsiveProp<boolean>;
  disabledElevation?: ResponsiveProp<boolean>;
  disableRipple?: ResponsiveProp<boolean>;
  endIcon?: ResponsiveProp<EndIcon>;
  fullWidth?: ResponsiveProp<boolean>;
  href?: ResponsiveProp<string>;
  loading?: ResponsiveProp<boolean>;
  loadingIndicator?: ResponsiveProp<LoadingIndicator>;
  loadingPosition?: ResponsiveProp<LoadingPosition>;
  rippleColor?: ResponsiveProp<string>;
  rippleDuration?: ResponsiveProp<number>;
  rippleOpacity?: ResponsiveProp<number>;
  size?: ResponsiveProp<ButtonSize>;
  shape?: ResponsiveProp<ButtonShape>;
  shadow?: ResponsiveProp<number | string>;
  startIcon?: ResponsiveProp<StartIcon>;
  target?: ResponsiveProp<'_blank' | '_self' | '_parent' | '_top'>;
  variant?: ResponsiveProp<ButtonVariant>;
}

export interface ButtonClassesOptions {
  color?: ComputedRef<ButtonColor>;
  component?: ComputedRef<ElementType>;
  disabled?: ComputedRef<boolean>;
  disabledElevation?: ComputedRef<boolean>;
  disableRipple?: ComputedRef<boolean>;
  endIcon?: ComputedRef<EndIcon>;
  fullWidth?: ComputedRef<boolean>;
  href?: ComputedRef<string>;
  loading?: ComputedRef<boolean>;
  loadingIndicator?: ComputedRef<LoadingIndicator>;
  loadingPosition?: ComputedRef<LoadingPosition>;
  rippleColor?: ComputedRef<string>;
  rippleDuration?: ComputedRef<number>;
  rippleOpacity?: ComputedRef<number>;
  size?: ComputedRef<ButtonSize>;
  shape?: ComputedRef<ButtonShape>;
  shadow?: ComputedRef<number | string>;
  startIcon?: ComputedRef<StartIcon>;
  target?: ComputedRef<'_blank' | '_self' | '_parent' | '_top'>;
  variant?: ComputedRef<ButtonVariant>;
}

export interface ButtonStylesOptions extends ButtonClassesOptions {
  className: ComputedRef<string>;
}
