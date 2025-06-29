import type * as CSS from 'csstype';

export type StyleValue = string | number | null | undefined;

/**
 * Tipado para objetos de estilos dinámicos, con soporte para:
 * - propiedades CSS
 * - pseudoclases (':hover', etc.)
 * - selectores arbitrarios ('.my-class', '#id', etc.)
 */
export type StyleObject = {
  [K in keyof CSS.Properties<string | number>]?: CSS.Properties<string | number>[K];
} & {
  [pseudo in `:${string}`]?: StyleObject;
} & {
  // ==== Índice genérico: permite cualquier selector de nivel superior ====
  [selector: string]: StyleObject | StyleValue | undefined;
};

export interface StyleCacheItem {
  cssText: string;
  index: number;
}

export interface DynamicStylesAPI {
  updateStyles(selector: string, styles: StyleObject): void;
  resetDynamicStyles(): void;
  hasStyle(selector: string): boolean;
  getCacheSize(): number;
  getStyleElement(): HTMLStyleElement | null;
}
