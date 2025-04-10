// theme.d.ts

import type { CSSProperties } from 'vue';

// ========== Breakpoints ==========
export interface Breakpoints {
  keys: readonly ['xs', 'sm', 'md', 'lg', 'xl'];
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  unit: string;
  up: (key: keyof Breakpoints['values'] | number) => string;
  down: (key: keyof Breakpoints['values'] | number) => string;
  between: (start: keyof Breakpoints['values'] | number, end: keyof Breakpoints['values'] | number) => string;
  only: (key: keyof Breakpoints['values']) => string;
  not: (key: keyof Breakpoints['values']) => string;
}

// ========== Palette ==========
export interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface PaletteAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledBackground: string;
  disabledOpacity: number;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

export interface Palette {
  mode: 'light' | 'dark';
  common: {
    black: string;
    white: string;
  };
  primary: PaletteColor;
  secondary: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  grey: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  contrastThreshold: number;
  tonalOffset: number;
  getContrastText: (background: string) => string;
  augmentColor: (options: { color: string; name?: string }) => PaletteColor;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  background: {
    paper: string;
    default: string;
  };
  action: PaletteAction;
}

// ========== Container Queries ==========
export interface ContainerQueries {
  up: (key: string | number) => string;
  down: (key: string | number) => string;
  between: (start: string | number, end: string | number) => string;
  only: (key: string) => string;
  not: (key: string) => string;
}

// ========== Typography ==========
export interface TypographyStyle {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize: string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

export interface Typography {
  htmlFontSize: number;
  pxToRem: (px: number) => string;
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  body1: TypographyStyle;
  body2: TypographyStyle;
  button: TypographyStyle;
  caption: TypographyStyle;
  overline: TypographyStyle;
  inherit: TypographyStyle;
}

// ========== Transitions ==========
export interface Transitions {
  getAutoHeightDuration: (height: number) => number;
  create: (
    props: string | string[],
    options?: {
      duration?: number;
      easing?: string;
      delay?: number;
    },
  ) => string;
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
}

// ========== Z-Index ==========
export interface ZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
  [key: string]: number;
}

// ========== Per-Component Overrides ==========
export interface ThemeComponents {
  NvButton?: {
    defaultProps?: {
      variant?: 'filled' | 'outlined' | 'text';
      size?: 'sm' | 'md' | 'lg';
    };
    styleOverrides?: {
      root?: CSSProperties;
    };
  };
  // Agrega más overrides aquí: NvCard, NvInput, etc.
}

// ========== Dynamic Styles Helper ==========
export type StyleFunction<Props extends object = object> = (theme: Theme, props: Props) => CSSProperties;
// ========== Theme Interface ==========
export interface Theme {
  palette: Palette;
  spacing: (...values: number[]) => string;
  shape: {
    borderRadius: number | string;
  };
  breakpoints: Breakpoints;
  containerQueries: ContainerQueries;
  typography: Typography;
  transitions: Transitions;
  zIndex: ZIndex;
  shadows: string[]; // de 0 a 25 niveles
  components?: ThemeComponents;
  cssVarPrefix?: string;
  toCSSVars?: () => Record<string, string>; // Opcional, para exportar variables CSS
  toRuntimeSource?: () => string; // Para serializar tema si se requiere
  applyStyles: <Props extends object = object>(styleFunction: StyleFunction<Props>) => (props: Props) => CSSProperties;
}
