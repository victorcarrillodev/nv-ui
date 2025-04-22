// src/components/Button/useButtonClasses.ts

import { computed } from 'vue';
import type { ButtonClassesOptions } from './button';
import { generateComponentClasses, generateMuiStyleClasses } from '@/theme/utils/class-utils';
import { resolveResponsiveProp } from '@/theme/utils/responsive';

const STYLE_MODE: 'bem' | 'mui' = 'mui'; // ⬅️ cambia a 'bem' si querés BEM style

export const useButtonClasses = (options: ButtonClassesOptions) => {
  const variant = computed(() => resolveResponsiveProp(options.variant));
  const size = computed(() => resolveResponsiveProp(options.size));
  const color = computed(() => resolveResponsiveProp(options.color));
  const shape = computed(() => resolveResponsiveProp(options.shape));

  return computed(() => {
    const props = {
      variant: variant.value,
      size: size.value,
      color: color.value,
      shape: shape.value,
      disabled: options.disabled,
    };

    return STYLE_MODE === 'mui' ? generateMuiStyleClasses('NvButton', props) : generateComponentClasses('NvButton', props);
  });
};
