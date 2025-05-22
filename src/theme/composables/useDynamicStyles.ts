import { ref } from 'vue';

const STYLE_MAP = new Map<string, { cssText: string; index: number }>();
const styleElement = ref<HTMLStyleElement | null>(null);
const isServer = typeof window === 'undefined';

/**
 * Crea o recupera el stylesheet dinámico.
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
    console.error('[getStyleSheet] Error creando stylesheet:', err);
    return null;
  }
};

/**
 * Convierte un objeto de estilo en string CSS.
 */
const generateCssText = (styles: Record<string, string>): string =>
  Object.entries(styles)
    .filter(([, val]) => val !== undefined && val !== null)
    .map(([prop, val]) => `${prop}:${val};`)
    .join('');

/**
 * Inserta o reemplaza reglas CSS dinámicamente en el DOM.
 */
export const updateStyles = (selector: string, styles: Record<string, unknown>) => {
  if (isServer || !styles) return;

  const sheet = getStyleSheet();
  if (!sheet) return;

  const flatStyles: Record<string, string> = {};
  const nestedStyles: Record<string, Record<string, string>> = {};

  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      nestedStyles[key] = value as Record<string, string>;
    } else if (value !== undefined && value !== null) {
      flatStyles[key] = String(value);
    }
  }

  // Eliminar regla base existente
  const existing = STYLE_MAP.get(selector);
  if (existing && existing.index >= 0 && existing.index < sheet.cssRules.length) {
    try {
      sheet.deleteRule(existing.index);
    } catch (e) {
      console.warn(`[updateStyles] No se pudo eliminar la regla existente (${selector}):`, e);
    }
  }

  // Insertar nueva regla base
  try {
    const cssText = generateCssText(flatStyles);
    const rule = `${selector} { ${cssText} }`;
    const index = sheet.insertRule(rule, sheet.cssRules.length);
    STYLE_MAP.set(selector, { cssText, index });
  } catch (err) {
    console.error(`[updateStyles] Error insertando regla base (${selector}):`, err);
  }

  // Insertar reglas anidadas como :hover, :focus, etc.
  for (const [nestedKey, nestedStyle] of Object.entries(nestedStyles)) {
    const nestedSelector = `${selector}${nestedKey}`;
    try {
      const cssText = generateCssText(nestedStyle);
      const rule = `${nestedSelector} { ${cssText} }`;
      const index = sheet.insertRule(rule, sheet.cssRules.length);
      STYLE_MAP.set(nestedSelector, { cssText, index });
    } catch (err) {
      console.error(`[updateStyles] Error insertando regla anidada (${nestedSelector}):`, err);
    }
  }
};

/**
 * Elimina estilos previamente insertados.
 */
export const removeStyles = (selector: string) => {
  const sheet = getStyleSheet();
  if (!sheet) return;

  for (const [key, entry] of STYLE_MAP.entries()) {
    if (key === selector || key.startsWith(`${selector}:`) || key.startsWith(`${selector}.`)) {
      try {
        if (entry.index >= 0 && entry.index < sheet.cssRules.length) {
          sheet.deleteRule(entry.index);
        }
      } catch (e) {
        console.warn(`[removeStyles] Error eliminando regla (${key}):`, e);
      }
      STYLE_MAP.delete(key);
    }
  }
};

/**
 * Limpia completamente los estilos dinámicos del DOM.
 */
export const resetDynamicStyles = () => {
  if (styleElement.value && document.head.contains(styleElement.value)) {
    document.head.removeChild(styleElement.value);
    styleElement.value = null;
  }
  STYLE_MAP.clear();
};
