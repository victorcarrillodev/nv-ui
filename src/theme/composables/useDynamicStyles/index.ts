import { ref, onUnmounted } from 'vue';
import type { StyleObject } from './types';

type StyleCache = Map<string, { cssText: string; index: number }>;

const styleElement = ref<HTMLStyleElement | null>(null);
const styleCache = ref<StyleCache>(new Map());
const isServer = typeof window === 'undefined';

/**
 * Crea e inyecta un <style> en el <head> si no existe aún
 */
const createStyleElement = (): HTMLStyleElement | null => {
  if (isServer) return null;
  if (styleElement.value) return styleElement.value;

  const style = document.createElement('style');
  style.id = 'nv-dynamic-style';
  document.head.appendChild(style);
  styleElement.value = style;
  return style;
};

/**
 * Inserta una regla CSS al <style> dinámico
 */
const insertRule = (selector: string, cssText: string): number => {
  const sheet = styleElement.value?.sheet;
  if (!sheet) return -1;

  try {
    const index = sheet.cssRules.length;
    sheet.insertRule(`${selector} { ${cssText} }`, index);
    return index;
  } catch (err) {
    console.error(`[useDynamicStyles] Error inserting rule for "${selector}":`, err);
    return -1;
  }
};

/**
 * Aplica estilos dinámicos a un selector, incluyendo reglas anidadas
 */
export const updateStyles = (selector: string, styles: StyleObject) => {
  if (isServer) return;

  const styleEl = createStyleElement();
  if (!styleEl || !styleEl.sheet) return;

  // Estilos planos
  const flatStyles = Object.entries(styles).filter(([, v]) => typeof v === 'string');
  const cssText = flatStyles.map(([prop, val]) => `${prop}:${val};`).join('');

  // Elimina estilos anteriores si existen
  const cached = styleCache.value.get(selector);
  if (cached && cached.index >= 0) {
    try {
      styleEl.sheet.deleteRule(cached.index);
    } catch (err) {
      console.warn(`[useDynamicStyles] Error deleting rule for "${selector}":`, err);
    }
  }

  const index = insertRule(selector, cssText);
  if (index >= 0) {
    styleCache.value.set(selector, { cssText, index });
  }

  // Estilos anidados (ej: &:hover, &:focus)
  Object.entries(styles)
    .filter(([, v]) => typeof v === 'object')
    .forEach(([nestedKey, nestedValue]) => {
      const nestedSelector = selector + ' ' + nestedKey.replace('&', '');
      const nestedCss = Object.entries(nestedValue as Record<string, string>)
        .map(([k, v]) => `${k}:${v};`)
        .join('');
      const nestedIndex = insertRule(nestedSelector, nestedCss);
      if (nestedIndex >= 0) {
        styleCache.value.set(nestedSelector, { cssText: nestedCss, index: nestedIndex });
      }
    });
};

/**
 * Elimina todos los estilos dinámicos insertados
 */
export const resetDynamicStyles = () => {
  if (styleElement.value) {
    document.head.removeChild(styleElement.value);
  }
  styleElement.value = null;
  styleCache.value.clear();
};

/**
 * Limpieza automática al desmontar el componente que lo usa
 */
onUnmounted(() => {
  resetDynamicStyles();
});
