import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';

/**
 * Hook para generar clases dinámicas para el componente Button.
 * Retorna un ComputedRef<string[]> con las clases a aplicar.
 */
export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() => {
    const { variant, size, color, disabled, className } = options;
    const classes: string[] = [];

    if (className) {
      classes.push(className);
    }
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
