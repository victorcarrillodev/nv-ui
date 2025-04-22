// src/components/Button/useButtonClasses.ts

import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';
import { generateComponentClasses } from '@/theme/utils/class-utils';
import { resolveResponsiveProp } from '@/theme/utils/responsive';

export const useButtonClasses = (options: ButtonClassesOptions) => {
  const variant = resolveResponsiveProp(options.variant);
  const size = resolveResponsiveProp(options.size);
  const color = resolveResponsiveProp(options.color);
  const shape = resolveResponsiveProp(options.shape);

  return computed(() =>
    generateComponentClasses('NvButton', {
      variant,
      size,
      color,
      shape,
      disabled: options.disabled,
    }),
  );
};
