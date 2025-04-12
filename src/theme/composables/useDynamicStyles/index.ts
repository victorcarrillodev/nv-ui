// src/theme/composables/useDynamicStyles/index.ts

import { ref } from 'vue';
// import type { StyleObject } from './types';

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

export const updateStyles = (selector: string, styles: Record<string, string>) => {
  if (isServer || !styles) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  const cssText = generateCssText(styles);
  const rule = `${selector} { ${cssText} }`;

  const existing = STYLE_MAP.get(selector);

  if (existing && existing.index >= 0 && existing.index < sheet.cssRules.length) {
    try {
      sheet.deleteRule(existing.index);
      const newIndex = sheet.insertRule(rule, existing.index);
      STYLE_MAP.set(selector, { cssText, index: newIndex });
    } catch (err) {
      console.error('[updateStyles] Error replacing style rule:', err);
    }
    return;
  }

  try {
    const index = sheet.insertRule(rule, sheet.cssRules.length);
    STYLE_MAP.set(selector, { cssText, index });
  } catch (err) {
    console.error('[updateStyles] Error inserting style rule:', err);
  }
};

export const resetDynamicStyles = () => {
  if (styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }
  STYLE_MAP.clear();
};
