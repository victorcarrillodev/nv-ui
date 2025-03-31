import { ref, onUnmounted } from 'vue';

/**
 * Tipo para el sistema de caché de estilos:
 * - Almacena el texto CSS y la posición de la regla en el stylesheet
 */
type StyleCache = Map<string, { cssText: string; index: number }>;

/**
 * Composable para gestión dinámica de estilos CSS
 *
 * Características principales:
 * - Inyección programática de estilos CSS
 * - Sistema de caché para evitar duplicados
 * - Manipulación segura del DOM
 * - Funciones para modificación de colores
 * - Soporte para media queries
 * - Limpieza automática al desmontar
 */
export const useDynamicStyles = () => {
  // Referencia reactiva al elemento <style> inyectado en el head
  const styleElement = ref<HTMLStyleElement | null>(null);

  /**
   * Cache de estilos:
   * - Clave: Identificador único (selector + media query)
   * - Valor: { cssText: string, index: number }
   */
  const styleCache = ref<StyleCache>(new Map());

  // Flag para detectar si estamos en entorno SSR (Server-Side Rendering)
  const isServer = typeof window === 'undefined';

  // Limpieza al desmontar el componente que usa este composable
  onUnmounted(() => {
    if (styleElement.value) {
      document.head.removeChild(styleElement.value);
    }
  });

  /**
   * Crea y añade un elemento <style> al documento
   * @returns {HTMLStyleElement} El elemento style creado
   */
  const createStyleElement = (): HTMLStyleElement => {
    // En SSR retornamos un objeto vacío (no hay DOM)
    if (isServer) return {} as HTMLStyleElement;

    const style = document.createElement('style');
    // ID único basado en timestamp para evitar colisiones
    style.id = 'dynamic-styles-' + Date.now();
    document.head.appendChild(style);
    return style;
  };

  /**
   * Actualiza estilos CSS dinámicamente con soporte para media queries
   * @param {string} selector - Selector CSS (ej: '.btn', '#header')
   * @param {Record<string, string>} styles - Objeto con propiedades CSS
   * @param {string} [mediaQuery] - Media query opcional (ej: '(max-width: 768px)')
   */
  const updateStyles = (selector: string, styles: Record<string, string>, mediaQuery?: string): void => {
    // No hacer nada en SSR
    if (isServer) return;

    // Crear elemento style si no existe
    if (!styleElement.value) {
      styleElement.value = createStyleElement();
    }

    // Crear clave única para el cache (combina media query y selector)
    const cacheKey = `${mediaQuery || ''}|${selector}`;

    // Convertir objeto de estilos a texto CSS
    const cssText = Object.entries(styles)
      .map(([prop, value]) => `${prop}:${value};`)
      .join('');

    // Formatear regla CSS completa (con media query si existe)
    const fullCSS = mediaQuery ? `@media ${mediaQuery} { ${selector} { ${cssText} } }` : `${selector} { ${cssText} }`;

    // Verificar si ya existe una regla idéntica en cache
    const cached = styleCache.value.get(cacheKey);
    if (cached && cached.cssText === fullCSS) {
      return; // No hacer nada si los estilos no han cambiado
    }

    try {
      // Eliminar regla anterior si existe
      if (cached) {
        styleElement.value.sheet?.deleteRule(cached.index);
      }

      // Insertar nueva regla CSS
      const index = styleElement.value.sheet?.cssRules.length || 0;
      styleElement.value.sheet?.insertRule(fullCSS, index);

      // Actualizar cache con la nueva regla
      styleCache.value.set(cacheKey, { cssText: fullCSS, index });
    } catch (error) {
      console.error('Error actualizando estilos:', error);
    }
  };

  /**
   * Aclara un color hexadecimal
   * @param {string} color - Color en formato HEX (ej: '#336699')
   * @param {number} percent - Porcentaje de aclarado (0-100)
   * @returns {string} Nuevo color en formato HEX
   */
  const lightenColor = (color: string, percent: number): string => {
    if (!color) return color;

    // No modificar colores RGB/RGBA
    if (color.startsWith('rgb')) {
      return color;
    }

    // Normalizar formato HEX (ej: #abc → #aabbcc)
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }

    // Validar que sea un HEX válido
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      console.warn(`Formato de color inválido: ${color}`);
      return color;
    }

    // Convertir HEX a número RGB
    const num = parseInt(hex, 16);
    // Calcular cantidad de aclarado (2.55 = 255/100)
    const amt = Math.round(2.55 * percent);

    /**
     * Limita un valor al rango 0-255
     * @param {number} value - Valor a limitar
     * @returns {number} Valor entre 0 y 255
     */
    const clamp = (value: number) => Math.min(255, Math.max(0, value));

    // Aplicar aclarado a cada canal RGB
    const r = clamp((num >> 16) + amt);
    const g = clamp(((num >> 8) & 0x00ff) + amt);
    const b = clamp((num & 0x0000ff) + amt);

    // Convertir de vuelta a HEX
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  /**
   * Oscurece un color hexadecimal
   * @param {string} color - Color en formato HEX
   * @param {number} percent - Porcentaje de oscurecimiento (0-100)
   * @returns {string} Nuevo color en formato HEX
   */
  const darkenColor = (color: string, percent: number): string => {
    // Reutiliza lightenColor con porcentaje negativo
    return lightenColor(color, -percent);
  };

  /**
   * Elimina estilos previamente aplicados
   * @param {string} selector - Selector CSS a eliminar
   */
  const removeStyles = (selector: string): void => {
    if (isServer || !styleElement.value) return;

    const cached = styleCache.value.get(selector);
    if (cached) {
      styleElement.value.sheet?.deleteRule(cached.index);
      styleCache.value.delete(selector);
    }
  };

  // Retorna la API pública del composable
  return {
    updateStyles, // Función principal para actualizar estilos
    lightenColor, // Aclara colores HEX
    darkenColor, // Oscurece colores HEX
    removeStyles, // Elimina estilos por selector
    getStyleElement: () => styleElement.value, // Getter para el elemento style
  };
};
