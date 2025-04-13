// src/components/Button/useButtonStyles.ts

import { computed, toRef } from 'vue';
import type { ButtonStylesOptions } from './button';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/newTheme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';
import type { StyleObject } from '@/theme/composables/useDynamicStyles/types';

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = toRef(themeContext, 'theme');

  const styles = computed<StyleObject>(() => {
    const { variant, size, color, disabled, shape, shadow = 1 } = options;

    const palette = theme.value.palette[color] as PaletteColor;
    const { main, light, dark, contrastText } = palette;

    const parsedShadow = Number(shadow);
    const safeShadow = isNaN(parsedShadow) ? 1 : Math.max(0, Math.min(parsedShadow, theme.value.shadows.length - 1));

    const base: StyleObject = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '1rem',
      fontFamily: theme.value.typography.fontFamily,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.6' : '1',
      border: 'none',
      boxShadow: theme.value.shadows[safeShadow],
      transition: 'all 0.3s ease',
      margin: '0.1rem',
    };

    // Tamaños
    const sizeStyles = {
      sm: { padding: '0.25rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1.25rem', fontSize: '1rem' },
      lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
    };
    Object.assign(base, sizeStyles[size]);

    // Bordes
    base.borderRadius = {
      normal: '0.25rem',
      rounded: '0.75rem',
      pill: '9999px',
    }[shape];

    const hover: Record<string, string> = {};

    switch (variant) {
      case 'filled':
        Object.assign(base, {
          backgroundColor: main,
          color: contrastText,
        });

        if (!disabled) {
          Object.assign(hover, {
            backgroundColor: light,
            filter: 'brightness(1.05)',
          });
        }
        break;

      case 'outlined':
        Object.assign(base, {
          backgroundColor: 'transparent',
          color: main,
          border: `2px solid ${main}`,
        });

        if (!disabled) {
          Object.assign(hover, {
            backgroundColor: light,
            color: contrastText,
          });
        }
        break;

      case 'text':
        Object.assign(base, {
          backgroundColor: 'transparent',
          color: main,
        });

        if (!disabled) {
          Object.assign(hover, {
            color: dark,
            textDecoration: 'underline',
          });
        }
        break;
    }

    const final: StyleObject = convertKeysToKebabCase(base) as StyleObject;

    // Agregar estilo hover como regla anidada
    if (Object.keys(hover).length > 0) {
      final[':hover'] = convertKeysToKebabCase(hover);
    }

    return final;
  });

  return { styles };
};
