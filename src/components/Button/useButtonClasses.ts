import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';
import { generateComponentClasses } from '@/theme/utils/class-utils';

/**
 * Hook para generar clases dinámicas del botón usando BEM por props.
 */
export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() =>
    generateComponentClasses('NvButton', {
      variant: options.variant,
      size: options.size,
      color: options.color,
      shape: options.shape,
      disabled: options.disabled,
    }),
  );
};
