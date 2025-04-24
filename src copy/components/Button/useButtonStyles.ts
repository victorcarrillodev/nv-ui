// src/components/Button/useButtonStyles.ts
import { computed, toRef } from 'vue';
import type { ButtonStylesOptions } from './types';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/theme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';
import type { StyleObject } from '@/theme/composables/useDynamicStyles/types';

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = toRef(themeContext, 'theme');

  const styles = computed<StyleObject>(() => {
    const { variant, size, color, shape, shadow, disabled } = options;
    const palette = theme.value.palette[color] as PaletteColor;

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
      transition: 'all 0.3s ease',
      boxShadow: theme.value.shadows[+shadow || 1],
    };

    const sizeMap = {
      sm: { padding: '0.25rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1.25rem', fontSize: '1rem' },
      lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
    };

    Object.assign(base, sizeMap[size]);

    base.borderRadius = {
      normal: '0.25rem',
      rounded: '0.75rem',
      pill: '9999px',
    }[shape];

    const hover: Record<string, string> = {};

    switch (variant) {
      case 'filled':
        Object.assign(base, {
          backgroundColor: palette.main,
          color: palette.contrastText,
        });
        if (!disabled) {
          Object.assign(hover, {
            backgroundColor: palette.light,
            filter: 'brightness(1.05)',
          });
        }
        break;
      case 'outlined':
        Object.assign(base, {
          backgroundColor: 'transparent',
          color: palette.main,
          border: `2px solid ${palette.main}`,
        });
        if (!disabled) {
          Object.assign(hover, {
            backgroundColor: palette.light,
            color: palette.contrastText,
          });
        }
        break;
      case 'text':
        Object.assign(base, {
          backgroundColor: 'transparent',
          color: palette.main,
        });
        if (!disabled) {
          Object.assign(hover, {
            color: palette.dark,
            textDecoration: 'underline',
          });
        }
        break;
    }

    const final: StyleObject = convertKeysToKebabCase(base) as StyleObject;
    if (Object.keys(hover).length) {
      final[':hover'] = convertKeysToKebabCase(hover);
    }

    return final;
  });

  return { styles };
};
