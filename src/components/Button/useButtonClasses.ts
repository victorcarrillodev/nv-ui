import { computed } from 'vue';
import type { ButtonClassesOptions } from './types';
import { generateComponentClasses } from '@/utils/class-utils';

/**
 * Genera las clases del botón en base a sus props reactivas.
 */
export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() =>
    generateComponentClasses('NvButton', {
      variant: options.variant.value,
      size: options.size.value,
      color: options.color.value,
      shape: options.shape.value,
      disabled: options.disabled.value,
    }),
  );
};
