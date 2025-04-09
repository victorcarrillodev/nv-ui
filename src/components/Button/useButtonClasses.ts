import { computed } from 'vue';
import { buildClass, joinClasses } from '@/theme/utils/class-utils';
import type { ButtonClassesOptions } from './button';

export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() => {
    const { variant, size, color, disabled, shape, className } = options;
    const base = 'NvButton';

    return joinClasses(
      className,
      buildClass(base, 'variant', variant),
      buildClass(base, 'size', size),
      buildClass(base, 'color', color),
      buildClass(base, 'shape', shape),
      disabled && buildClass(base, 'disabled', true),
    );
  });
};
