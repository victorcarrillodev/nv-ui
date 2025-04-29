// src/components/Button/useButtonClasses.ts
import { computed } from 'vue';
import type { ButtonClassesOptions } from './types';
import { generateComponentClasses } from '@/utils/class-utils';

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
