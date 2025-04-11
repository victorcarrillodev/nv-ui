import { ref } from 'vue';
import type { StyleObject, StyleValue } from './types';

type StyleCache = Map<string, { cssText: string; index: number }>;
type StyleSheet = CSSStyleSheet | null;

const styleElement = ref<HTMLStyleElement | null>(null);
const styleCache = ref<StyleCache>(new Map());
const isServer = typeof window === 'undefined';

// Helper functions
const isStyleObject = (value: StyleValue): value is Record<string, string> => typeof value === 'object' && value !== null;

const createStyleElement = (): HTMLStyleElement | null => {
  if (isServer) return null;

  if (!styleElement.value) {
    const style = document.createElement('style');
    style.id = 'nv-dynamic-style';
    style.setAttribute('data-dynamic-styles', 'true');
    document.head.appendChild(style);
    styleElement.value = style;
  }

  return styleElement.value;
};

const getStyleSheet = (): StyleSheet => {
  const styleEl = createStyleElement();
  return styleEl?.sheet || null;
};

const safeInsertRule = (sheet: CSSStyleSheet, rule: string): number => {
  try {
    const index = sheet.cssRules.length;
    sheet.insertRule(rule, index);
    return index;
  } catch (error) {
    console.error('[useDynamicStyles] Error inserting rule:', error);
    return -1;
  }
};

const safeDeleteRule = (sheet: CSSStyleSheet, index: number): boolean => {
  try {
    sheet.deleteRule(index);
    return true;
  } catch (error) {
    console.warn('[useDynamicStyles] Error deleting rule:', error);
    return false;
  }
};

const generateCssText = (styles: Record<string, string>): string =>
  Object.entries(styles)
    .map(([prop, val]) => `${prop}:${val};`)
    .join('');

export const updateStyles = (selector: string, styles: StyleObject): void => {
  if (isServer) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  // Limpiar estilos anteriores
  const cleanUpStyles = (selectorPrefix: string) => {
    const cachedKeys = Array.from(styleCache.value.keys()).filter((key) => key.startsWith(selectorPrefix));

    cachedKeys.forEach((key) => {
      const cached = styleCache.value.get(key);
      if (cached && cached.index >= 0) {
        safeDeleteRule(sheet, cached.index);
      }
      styleCache.value.delete(key);
    });
  };

  // Limpiar tanto el selector principal como los anidados
  cleanUpStyles(selector);

  // Procesar estilos principales
  const flatStyles: Record<string, string> = {};
  const nestedStyles: Record<string, Record<string, string>> = {};

  Object.entries(styles).forEach(([key, value]) => {
    if (isStyleObject(value)) {
      nestedStyles[key] = value;
    } else if (typeof value === 'string') {
      flatStyles[key] = value;
    }
  });

  // Insertar estilos principales
  if (Object.keys(flatStyles).length > 0) {
    const cssText = generateCssText(flatStyles);
    const index = safeInsertRule(sheet, `${selector} { ${cssText} }`);

    if (index >= 0) {
      styleCache.value.set(selector, { cssText, index });
    }
  }

  // Insertar estilos anidados
  Object.entries(nestedStyles).forEach(([nestedKey, nestedStyles]) => {
    const nestedSelector = `${selector}${nestedKey.replace('&', '')}`;
    const cssText = generateCssText(nestedStyles);
    const index = safeInsertRule(sheet, `${nestedSelector} { ${cssText} }`);

    if (index >= 0) {
      styleCache.value.set(nestedSelector, { cssText, index });
    }
  });
};

export const resetDynamicStyles = (): void => {
  if (isServer) return;

  if (styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }
  styleCache.value.clear();
};

export const useDynamicStyles = () => {
  return {
    updateStyles,
    resetDynamicStyles,
    getCacheSize: () => styleCache.value.size,
    getStyleElement: () => styleElement.value,
  };
};
