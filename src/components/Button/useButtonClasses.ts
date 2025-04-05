import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';

/**
 * Hook para generar las clases dinámicas del botón
 */
export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() => {
    const { variant, size, color, disabled, className, shape } = options;
    const classes: string[] = [className || ''];
    const Nv = 'NvButton__';

    if (variant) {
      classes.push(Nv + `variant-${variant}`);
    }
    if (size) {
      classes.push(Nv + `size-${size}`);
    }
    if (color) {
      classes.push(Nv + `color-${color}`);
    }
    if (disabled) {
      classes.push(Nv + 'disabled');
    }
    if (shape) {
      classes.push(Nv + `shape-${shape}`);
    }
    return classes;
  });
};
