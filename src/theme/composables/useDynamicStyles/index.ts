import { ref, onUnmounted } from 'vue';
import type { StyleObject, StyleValue } from './types';

type StyleCache = Map<string, { cssText: string; index: number }>;
type StyleSheet = CSSStyleSheet | null;

const styleElement = ref<HTMLStyleElement | null>(null);
const styleCache = ref<StyleCache>(new Map());
const isServer = typeof window === 'undefined';

// Helper functions mejoradas
const isStyleObject = (value: StyleValue): value is Record<string, string> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const createStyleElement = (): HTMLStyleElement | null => {
  if (isServer) return null;

  if (!styleElement.value) {
    const style = document.createElement('style');
    style.id = 'nv-dynamic-style';
    style.setAttribute('data-dynamic-styles', 'true');
    document.head.appendChild(style);
    styleElement.value = style;

    onUnmounted(() => {
      resetDynamicStyles();
    });
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
    // Verificación crítica para evitar el error IndexSizeError
    if (index < 0 || index >= sheet.cssRules.length) {
      return false;
    }
    sheet.deleteRule(index);
    return true;
  } catch (error) {
    console.warn('[useDynamicStyles] Error deleting rule:', error);
    return false;
  }
};

const generateCssText = (styles: Record<string, string>): string =>
  Object.entries(styles)
    .filter(([, val]) => val !== undefined && val !== null)
    .map(([prop, val]) => `${prop}:${val};`)
    .join('');

const cleanUpStyles = (sheet: CSSStyleSheet, selectorPrefix: string): void => {
  const cachedKeys = Array.from(styleCache.value.keys()).filter((key) => key.startsWith(selectorPrefix));

  cachedKeys.forEach((key) => {
    const cached = styleCache.value.get(key);
    if (cached) {
      // Eliminar solo si el índice es válido
      if (cached.index >= 0) {
        safeDeleteRule(sheet, cached.index);
      }
      styleCache.value.delete(key);
    }
  });
};

export const updateStyles = (selector: string, styles: StyleObject): void => {
  if (isServer || !styles) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  try {
    // Limpieza segura con manejo de índices inválidos
    cleanUpStyles(sheet, selector);

    // Procesar estilos principales y anidados
    const flatStyles: Record<string, string> = {};
    const nestedStyles: Record<string, Record<string, string>> = {};

    for (const [key, value] of Object.entries(styles)) {
      if (isStyleObject(value)) {
        nestedStyles[key] = value;
      } else if (typeof value === 'string' || typeof value === 'number') {
        flatStyles[key] = String(value);
      }
    }

    // Insertar estilos principales con verificación
    if (Object.keys(flatStyles).length > 0) {
      const cssText = generateCssText(flatStyles);
      const rule = `${selector} { ${cssText} }`;

      const index = safeInsertRule(sheet, rule);
      if (index >= 0) {
        styleCache.value.set(selector, { cssText, index });
      }
    }

    // Insertar estilos anidados con verificación
    for (const [nestedKey, nestedStyle] of Object.entries(nestedStyles)) {
      const nestedSelector = `${selector}${nestedKey.replace('&', '')}`;
      const cssText = generateCssText(nestedStyle);
      const rule = `${nestedSelector} { ${cssText} }`;

      const index = safeInsertRule(sheet, rule);
      if (index >= 0) {
        styleCache.value.set(nestedSelector, { cssText, index });
      }
    }
  } catch (error) {
    console.error('[useDynamicStyles] Critical error, resetting styles:', error);
    resetDynamicStyles();
  }
};

export const resetDynamicStyles = (): void => {
  if (isServer) return;

  if (styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }
  styleCache.value.clear();
};

export const hasStyle = (selector: string): boolean => {
  return styleCache.value.has(selector);
};

export const useDynamicStyles = () => {
  return {
    updateStyles,
    resetDynamicStyles,
    hasStyle,
    getCacheSize: () => styleCache.value.size,
    getStyleElement: () => styleElement.value,
  };
};
