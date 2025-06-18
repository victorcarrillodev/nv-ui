// src/theme/composables/useDynamicStyles.ts
import { ref } from 'vue';

const STYLE_MAP = new Map<string, StyleCacheItem>();
const styleElement = ref<HTMLStyleElement | null>(null);

const isServer = typeof window === 'undefined';

interface StyleCacheItem {
  cssText: string;
  index: number;
}

/**
 * Obtiene (o crea si no existe) el <style> dinámico y su hoja de estilos.
 */
const getStyleSheet = (): CSSStyleSheet | null => {
  if (isServer) return null;

  try {
    if (!styleElement.value) {
      const style = document.createElement('style');
      style.id = 'nv-dynamic-style';
      style.setAttribute('data-dynamic-styles', 'true');
      document.head.appendChild(style);
      styleElement.value = style;
    }

    return styleElement.value.sheet ?? null;
  } catch (err) {
    console.error('[useDynamicStyles/getStyleSheet] Error creando stylesheet:', err);
    return null;
  }
};

/**
 * Convierte un objeto de estilo plano en una cadena CSS válida.
 */
const generateCssText = (styles: Record<string, string>): string => {
  return Object.entries(styles)
    .filter(([, val]) => val !== undefined && val !== null)
    .map(([prop, val]) => `${prop}:${val};`)
    .join('');
};

/**
 * Inserta o reemplaza reglas CSS dinámicamente.
 */
export const updateStyles = (selector: string, styles: Record<string, unknown>): void => {
  if (isServer || !styles) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  const flat: Record<string, string> = {};
  const nested: Record<string, Record<string, string>> = {};

  // Clasifica entre propiedades planas y anidadas (:hover, etc.)
  for (const [prop, val] of Object.entries(styles)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      nested[prop] = val as Record<string, string>;
    } else if (val !== undefined && val !== null) {
      flat[prop] = String(val);
    }
  }

  // 💥 Reemplazar regla base si ya existe
  const existing = STYLE_MAP.get(selector);
  if (existing && existing.index >= 0 && existing.index < sheet.cssRules.length) {
    try {
      sheet.deleteRule(existing.index);
    } catch (err) {
      console.warn(`[useDynamicStyles/updateStyles] No se pudo eliminar la regla existente (${selector})`, err);
    }
  }

  // ✅ Insertar nueva regla base
  try {
    const cssText = generateCssText(flat);
    const rule = `${selector} { ${cssText} }`;
    const index = sheet.insertRule(rule, sheet.cssRules.length);
    STYLE_MAP.set(selector, { cssText, index });
  } catch (err) {
    console.error(`[useDynamicStyles/updateStyles] Error insertando regla base (${selector})`, err);
  }

  // 🎯 Insertar reglas anidadas (:hover, :focus, etc.)
  Object.entries(nested).forEach(([pseudo, nestedStyle]) => {
    const nestedSelector = `${selector}${pseudo}`;
    try {
      const cssText = generateCssText(nestedStyle);
      const rule = `${nestedSelector} { ${cssText} }`;
      const index = sheet.insertRule(rule, sheet.cssRules.length);
      STYLE_MAP.set(nestedSelector, { cssText, index });
    } catch (err) {
      console.error(`[useDynamicStyles/updateStyles] Error insertando regla anidada (${nestedSelector})`, err);
    }
  });
};

/**
 * Elimina todas las reglas asociadas a un selector base y sus variantes.
 */
export const removeStyles = (selector: string): void => {
  const sheet = getStyleSheet();
  if (!sheet) return;

  for (const [key, entry] of [...STYLE_MAP.entries()]) {
    const isMatch = key === selector || key.startsWith(`${selector}:`) || key.startsWith(`${selector}.`);
    if (!isMatch) continue;

    try {
      if (entry.index >= 0 && entry.index < sheet.cssRules.length) {
        sheet.deleteRule(entry.index);
      }
    } catch (err) {
      console.warn(`[useDynamicStyles/removeStyles] Error eliminando regla (${key})`, err);
    }

    STYLE_MAP.delete(key);
  }
};

/**
 * Elimina el elemento <style> del DOM y limpia la caché.
 */
export const resetDynamicStyles = (): void => {
  if (!isServer && styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }

  STYLE_MAP.clear();
};

/**
 * Devuelve el número de reglas actualmente activas.
 */
export const getCacheSize = (): number => STYLE_MAP.size;

/**
 * Devuelve el elemento <style> dinámico.
 */
export const getStyleElement = (): HTMLStyleElement | null => styleElement.value;
