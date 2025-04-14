// src/theme/composables/useDynamicStyles/index.ts

import { ref } from 'vue';

const STYLE_MAP = new Map<string, { cssText: string; index: number }>();
const styleElement = ref<HTMLStyleElement | null>(null);
const isServer = typeof window === 'undefined';

const getStyleSheet = (): CSSStyleSheet | null => {
  if (isServer) return null;

  if (!styleElement.value) {
    const style = document.createElement('style');
    style.id = 'nv-dynamic-style';
    style.setAttribute('data-dynamic-styles', 'true');
    document.head.appendChild(style);
    styleElement.value = style;
  }

  return styleElement.value.sheet || null;
};

const generateCssText = (styles: Record<string, string>): string =>
  Object.entries(styles)
    .filter(([, val]) => val !== undefined && val !== null)
    .map(([prop, val]) => `${prop}:${val};`)
    .join('');

export const updateStyles = (selector: string, styles: Record<string, unknown>) => {
  if (isServer || !styles) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  const flatStyles: Record<string, string> = {};
  const nestedStyles: Record<string, Record<string, string>> = {};

  // 🔍 Separa estilos planos y anidados (ej. :hover, :focus)
  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      nestedStyles[key] = value as Record<string, string>;
    } else {
      flatStyles[key] = String(value);
    }
  }

  // 🧼 Eliminar regla anterior si existe
  const existing = STYLE_MAP.get(selector);
  if (existing && existing.index >= 0 && existing.index < sheet.cssRules.length) {
    try {
      sheet.deleteRule(existing.index);
    } catch (e) {
      console.warn(`[updateStyles] Error al eliminar regla base:`, e);
    }
  }

  // ✅ Insertar regla base
  try {
    const cssText = generateCssText(flatStyles);
    const rule = `${selector} { ${cssText} }`;
    const index = sheet.insertRule(rule, sheet.cssRules.length);
    STYLE_MAP.set(selector, { cssText, index });
  } catch (err) {
    console.error('[updateStyles] Error al insertar regla base:', err);
  }

  // ✅ Insertar reglas anidadas (como :hover, :focus)
  for (const [nestedKey, nestedStyle] of Object.entries(nestedStyles)) {
    const nestedSelector = `${selector}${nestedKey}`;
    try {
      const cssText = generateCssText(nestedStyle);
      const rule = `${nestedSelector} { ${cssText} }`;
      const index = sheet.insertRule(rule, sheet.cssRules.length);
      STYLE_MAP.set(nestedSelector, { cssText, index });
    } catch (err) {
      console.error(`[updateStyles] Error al insertar regla anidada (${nestedKey}):`, err);
    }
  }
};

export const resetDynamicStyles = () => {
  if (styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }
  STYLE_MAP.clear();
};
