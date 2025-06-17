import type { Theme, Typography, ZIndex, Transitions, Breakpoints, ContainerQueries, Palette, StyleFunction } from '@/theme/types/theme';
import type { CSSProperties } from 'vue';

// ========== px → rem ==========
const pxToRem = (px: number) => `${px / 16}rem`;

// ========== TYPOGRAPHY ==========
const defaultTypography: Typography = {
  htmlFontSize: 16,
  pxToRem,
  fontFamily: '"Inter", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: pxToRem(32) },
  h2: { fontSize: pxToRem(28) },
  h3: { fontSize: pxToRem(24) },
  h4: { fontSize: pxToRem(20) },
  h5: { fontSize: pxToRem(18) },
  h6: { fontSize: pxToRem(16) },
  subtitle1: { fontSize: pxToRem(16) },
  subtitle2: { fontSize: pxToRem(14) },
  body1: { fontSize: pxToRem(16) },
  body2: { fontSize: pxToRem(14) },
  button: { fontSize: pxToRem(14), textTransform: 'uppercase' },
  caption: { fontSize: pxToRem(12) },
  overline: { fontSize: pxToRem(10), textTransform: 'uppercase' },
  inherit: { fontSize: 'inherit' },
};

// ========== Z-INDEX ==========
const defaultZIndex: ZIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ========== TRANSITIONS ==========
const defaultTransitions: Transitions = {
  create: (props: string | string[], options = {}) => {
    const propStr = Array.isArray(props) ? props.join(', ') : props;
    const duration = options.duration ?? 300;
    const easing = options.easing ?? 'ease-in-out';
    const delay = options.delay ?? 0;
    return `${propStr} ${duration}ms ${easing} ${delay}ms`;
  },
  getAutoHeightDuration: (height) => Math.round((height / 36) * 300),
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

// ========== BREAKPOINTS ==========
const defaultBreakpoints: Breakpoints = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  unit: 'px',
  up: (key) => `@media (min-width:${typeof key === 'number' ? key : defaultBreakpoints.values[key]}px)`,
  down: (key) => `@media (max-width:${typeof key === 'number' ? key : defaultBreakpoints.values[key]}px)`,
  between: (start, end) =>
    `@media (min-width:${typeof start === 'number' ? start : defaultBreakpoints.values[start]}px) and (max-width:${
      typeof end === 'number' ? end : defaultBreakpoints.values[end]
    }px)`,
  only: (key) => {
    const keys = Object.keys(defaultBreakpoints.values) as Array<keyof typeof defaultBreakpoints.values>;
    const nextKeyIndex = keys.indexOf(key) + 1;
    const nextKey = keys[nextKeyIndex];
    return nextKey
      ? `@media (min-width:${defaultBreakpoints.values[key]}px) and (max-width:${defaultBreakpoints.values[nextKey] - 0.05}px)`
      : `@media (min-width:${defaultBreakpoints.values[key]}px)`;
  },
  not: (key) => `@media not all and (min-width:${defaultBreakpoints.values[key]}px)`,
};

// ========== CONTAINER QUERIES ==========
const defaultContainerQueries: ContainerQueries = {
  up: (value) => `@container (min-width: ${value})`,
  down: (value) => `@container (max-width: ${value})`,
  between: (start, end) => `@container (min-width: ${start}) and (max-width: ${end})`,
  only: (value) => `@container (min-width: ${value})`,
  not: (value) => `@container not all and (min-width: ${value})`,
};

// ========== SOMBRAS ==========
const defaultShadows = Array.from({ length: 25 }, (_, i) => (i === 0 ? 'none' : `0px ${i}px ${i * 2}px rgba(0, 0, 0, 0.5)`));

// ========== CREACIÓN DEL TEMA ==========
export const createTheme = (palette: Palette): Theme => {
  // Base sin `applyStyles` para evitar problemas de referencia circular
  const baseTheme = {
    palette,
    spacing: (...values: number[]) => values.map((v) => `${v * 8}px`).join(' '),
    shape: { borderRadius: 6 },
    typography: defaultTypography,
    zIndex: defaultZIndex,
    transitions: defaultTransitions,
    breakpoints: defaultBreakpoints,
    containerQueries: defaultContainerQueries,
    shadows: defaultShadows,
    toRuntimeSource: () => JSON.stringify(palette),
  };

  // Cast al tipo completo de Theme
  const theme = baseTheme as Theme;

  // ✅ Definir applyStyles después
  theme.applyStyles = function <Props extends object = object>(styleFn: StyleFunction<Props>): (props: Props) => CSSProperties {
    return (props) => styleFn(theme, props);
  };

  return theme;
};
