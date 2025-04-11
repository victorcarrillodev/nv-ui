// src/components/Button/useButtonClasses.ts
import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';
import { generateComponentClasses } from '@/theme/utils/class-utils';

/**
 * Genera clases dinámicas tipo BEM basado en las props del botón.
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
