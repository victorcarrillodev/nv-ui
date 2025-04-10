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
}

type StyleFunction<Props extends object = object> = (theme: Theme, props: Props) => CSSProperties;

// typography
interface TypographyStyle {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize: string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

interface Typography {
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

interface Transitions {
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

interface ZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
  [key: string]: number; // Para permitir valores personalizados
}
interface Theme {
  pallete: Pallete;
  spacing: (value: number) => string;
  shape: {
    borderRadius: 3;
  };
  containerQueries: ContainerQueries;
  applyStyles: <Props extends object = object>(styleFunction: StyleFunction<Props>) => (props: Props) => CSSProperties;
  shadows: [
    'none',
    string,
    string,
    string,
    string,
    string, // 1-5
    string,
    string,
    string,
    string,
    string, // 6-10
    string,
    string,
    string,
    string,
    string, // 11-15
    string,
    string,
    string,
    string,
    string, // 16-20
    string,
    string,
    string,
    string,
    string, // 21-25
  ];
  typography: Typography;
  transitions: Transitions;
  zIndex: ZIndex;
  toRuntimeSource: () => string;
}
