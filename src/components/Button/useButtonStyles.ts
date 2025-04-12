/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, toRef } from 'vue';
import type { ButtonStylesOptions } from './button';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/newTheme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';
import type { StyleObject } from '@/theme/composables/useDynamicStyles/types';

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = toRef(themeContext, 'theme');

  const styles = computed<StyleObject>(() => {
    const { variant, size, color, disabled, shape } = options;
    const palette = theme.value.palette[color] as PaletteColor;
    const { main, light, dark, contrastText } = palette;

    const baseStyles: StyleObject = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: theme.value.typography.button?.fontWeight || '600',
      fontFamily: theme.value.typography.button?.fontFamily || theme.value.typography.fontFamily,
      fontSize: theme.value.typography.button?.fontSize || '1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.6' : '1',
      transition: 'all 0.3s ease',
      border: 'none',
    };

    switch (variant) {
      case 'filled':
        Object.assign(baseStyles, {
          backgroundColor: main,
          color: contrastText,
          boxShadow: theme.value.shadows[1],
        });
        break;

      case 'outlined':
        Object.assign(baseStyles, {
          backgroundColor: 'transparent',
          color: main,
          border: `2px solid ${main}`,
        });
        break;

      case 'text':
        Object.assign(baseStyles, {
          backgroundColor: 'transparent',
          color: main,
        });
        break;
    }

    const sizeStyles = {
      sm: { padding: '0.2rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '0.8rem 2rem', fontSize: '1.125rem' },
    };
    Object.assign(baseStyles, sizeStyles[size]);

    baseStyles.borderRadius = {
      normal: '0.25rem',
      rounded: '1rem',
      pill: '5rem',
    }[shape];

    return convertKeysToKebabCase(baseStyles) as StyleObject;
  });

  return { styles };
};
