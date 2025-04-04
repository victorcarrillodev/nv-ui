// src/theme/composables/useDynamicStyles.ts
import { ref, onUnmounted, getCurrentInstance } from 'vue';

type StyleCache = Map<string, { cssText: string; index: number }>;

const styleElement = ref<HTMLStyleElement | null>(null);
const styleCache = ref<StyleCache>(new Map());
const isServer = typeof window === 'undefined';

// Verificamos si hay una instancia activa y, de ser así, registramos onUnmounted.
if (getCurrentInstance()) {
  onUnmounted(() => {
    if (styleElement.value) {
      document.head.removeChild(styleElement.value);
    }
  });
}

const createStyleElement = (): HTMLStyleElement => {
  if (isServer) return {} as HTMLStyleElement;
  const style = document.createElement('style');
  style.id = 'dynamic-styles-' + Date.now();
  document.head.appendChild(style);
  return style;
};

export const updateStyles = (selector: string, styles: Record<string, string>) => {
  if (isServer) return;
  if (!styleElement.value) {
    styleElement.value = createStyleElement();
  }
  const cssText = Object.entries(styles)
    .map(([prop, value]) => `${prop}:${value};`)
    .join('');

  // Si existe la regla, eliminarla primero.
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
};

export const resetDynamicStyles = () => {
  if (styleElement.value) {
    document.head.removeChild(styleElement.value);
  }
  styleElement.value = null;
  styleCache.value.clear();
};
