import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';

/**
 * Hook para generar las clases dinámicas del botón
 */
export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() => {
    const { variant, size, color, disabled, className } = options;
    const classes: string[] = [className || ''];

    if (variant) {
      classes.push(`btn-${variant}`);
    }
    if (size) {
      classes.push(`btn-${size}`);
    }
    if (color) {
      classes.push(`btn-${color}`);
    }
    if (disabled) {
      classes.push('btn-disabled');
    }
    return classes;
  });
};
