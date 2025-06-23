// src/components/Button/useButtonClasses.ts
import { computed } from 'vue';
import type { ButtonClassesOptions } from './types';
import { generateComponentClasses } from '@/utils/class-utils';

export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() =>
    generateComponentClasses('NvButton', {
      variant: options.variant.value,
      disabledElevation: options.disabledElevation.value,
      size: options.size.value,
      color: options.color.value,
      shape: options.shape.value,
      disabled: options.disabled.value,
    }),
  );
};
