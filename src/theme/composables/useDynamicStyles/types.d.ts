/**
 * Tipos mejorados para estilos dinámicos
 */
export type StyleValue = string | number | Record<string, string | number>;

export interface StyleObject {
  [key: string]: StyleValue;
}

export interface StyleCacheItem {
  cssText: string;
  index: number;
  lastUpdated: number;
}

export interface DynamicStylesAPI {
  updateStyles: (selector: string, styles: StyleObject) => void;
  resetDynamicStyles: () => void;
  getCacheSize: () => number;
  getStyleElement: () => HTMLStyleElement | null;
}
