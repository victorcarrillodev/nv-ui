import { ref, onUnmounted } from 'vue';

type StyleCache = Map<string, { cssText: string; index: number }>;

const styleElement = ref<HTMLStyleElement | null>(null);
const styleCache = ref<StyleCache>(new Map());
const isServer = typeof window === 'undefined';

onUnmounted(() => {
  if (styleElement.value) {
    document.head.removeChild(styleElement.value);
  }
});

const createStyleElement = (): HTMLStyleElement => {
  if (isServer) return {} as HTMLStyleElement;
  const style = document.createElement('style');
  style.id = 'dynamic-styles-' + Date.now();
  document.head.appendChild(style);
  return style;
};

export const updateStyles = (selector: string, styles: Record<string, string | object>) => {
  if (isServer) return;
  if (!styleElement.value) {
    styleElement.value = createStyleElement();
  }

  // Convertir el objeto de estilos a una cadena CSS.
  // Para propiedades anidadas (por ejemplo, &:hover), se ignoran en esta función.
  const cssText = Object.entries(styles)
    .filter(([, value]) => typeof value === 'string')
    .map(([prop, value]) => `${prop}:${value};`)
    .join('');

  // Si existe una regla para ese selector, la eliminamos primero.
  const cached = styleCache.value.get(selector);
  if (cached) {
    styleElement.value.sheet?.deleteRule(cached.index);
  }
  const index = styleElement.value.sheet?.cssRules.length || 0;
  try {
    styleElement.value.sheet?.insertRule(`${selector} { ${cssText} }`, index);
    styleCache.value.set(selector, { cssText, index });
  } catch (error) {
    console.error('Error updating styles:', error);
  }

  // Procesar reglas anidadas, por ejemplo para &:hover.
  Object.entries(styles)
    .filter(([, value]) => typeof value === 'object')
    .forEach(([prop, value]) => {
      // Convertir "&:hover" en selector completo
      const nestedSelector = selector + ' ' + prop.replace('&', '');
      const nestedCssText = Object.entries(value as object)
        .map(([p, v]) => `${p}:${v};`)
        .join('');
      try {
        const nestedIndex = styleElement.value!.sheet?.cssRules.length || 0;
        styleElement.value!.sheet?.insertRule(`${nestedSelector} { ${nestedCssText} }`, nestedIndex);
        styleCache.value.set(nestedSelector, { cssText: nestedCssText, index: nestedIndex });
      } catch (error) {
        console.error('Error updating nested styles:', error);
      }
    });
};

export const resetDynamicStyles = () => {
  if (styleElement.value) {
    document.head.removeChild(styleElement.value);
  }
  styleElement.value = null;
  styleCache.value.clear();
};
