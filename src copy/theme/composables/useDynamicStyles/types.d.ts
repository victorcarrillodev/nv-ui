/**
 * Tipos mejorados para estilos dinámicos
 */
export type StyleValue = string | number | null | unknown | undefined | Record<string, string>;
export type StyleNestedObject = Record<string, string | number>;

export interface StyleObject {
  [key: string]: StyleValue;
}

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
