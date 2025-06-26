import type * as CSS from 'csstype';

export type StyleValue = string | number | null | undefined;

/**
 * Tipado para objetos de estilos dinámicos, con soporte para pseudoclases como :hover, :focus, etc.
 */
export type StyleObject = {
  [K in keyof CSS.Properties<string | number>]?: CSS.Properties<string | number>[K];
} & {
  [pseudoSelector in `:${string}`]?: {
    [K in keyof CSS.Properties<string | number>]?: CSS.Properties<string | number>[K];
  };
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
