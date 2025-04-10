import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';
import { buildClass, joinClasses } from '@/theme/utils/class-utils';

export const useButtonClasses = (options: ButtonClassesOptions) => {
  return computed(() => {
    const { variant, size, color, disabled, shape, className } = options;

    const base = 'NvButton';

    // Generar clase única basada en color + variant
    const uniqueClass = `${base}__${color}-${variant}`;

    return joinClasses(
      className,
      uniqueClass,
      buildClass(base, 'variant', variant),
      buildClass(base, 'size', size),
      buildClass(base, 'color', color),
      buildClass(base, 'shape', shape),
      disabled && buildClass(base, 'disabled', true),
    );
  });
};
