interface Breakpoints {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'];
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
// TODO revisar mui components interface theme
// export interface ThemeComponents {
//   // Puedes definir propiedades comunes para todos los componentes
//   MuiButton?: {
//     defaultProps?: {
//       variant?: 'text' | 'outlined' | 'contained';
//       size?: 'small' | 'medium' | 'large';
//     };
//     styleOverrides?: {
//       root?: CSSProperties;
//       // ... otras variantes
//     };
//   };
//   // Agrega más componentes según necesites
//   MuiTextField?: {
//     something?: true
//   };
// }
interface PalleteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}
interface PaletteAction {
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

interface ContainerQueries {
  up: (key: string | number) => string;
  down: (key: string | number) => string;
  between: (start: string | number, end: string | number) => string;
  only: (key: string) => string;
  not: (key: string) => string;
}
interface Pallete {
  mode: 'light' | 'dark';
  common: {
    black: string;
    white: string;
  };
  primary: PalleteColor;
  secondary: PalleteColor;
  success: PalleteColor;
  error: PalleteColor;
  warning: PalleteColor;
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
  spacing: (value: number) => string;
  shape: {
    borderRadius: 3;
  };
  containerQueries: ContainerQueries;
}
