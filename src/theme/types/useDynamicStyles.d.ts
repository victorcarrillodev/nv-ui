import type { Properties as CSSProperties } from 'csstype';

type NestedStyles = {
  [K in `:${string}` | `@media ${string}`]?: StyleObject;
};

export type StyleObject = CSSProperties<string | number> & NestedStyles;
/**
 * Tipos mejorados para estilos dinámicos
 */
export type StyleValue = string | number | null | unknown | undefined | Record<string, string>;
export type StyleNestedObject = Record<string, string | number>;

export interface StyleCacheItem {
  cssText: string;
  index: number;
}

export interface DynamicStylesAPI {
  updateStyles: (selector: string, styles: StyleObject) => void;
  resetDynamicStyles: () => void;
  hasStyle: (selector: string) => boolean;
  getCacheSize: () => number;
  getStyleElement: () => HTMLStyleElement | null;
}
