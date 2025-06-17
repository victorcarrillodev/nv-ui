// src/components/Button/useButtonStyles.ts
import { computed } from 'vue';
import type { ButtonStylesOptions } from './types';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/theme';
import { convertKeysToKebabCase } from '@/utils/style-utils';
import type { StyleObject } from '@/theme/types/useDynamicStyles';

const sizeMap = {
  sm: { padding: '0.25rem 1rem', fontSize: '0.875rem' },
  md: { padding: '0.5rem 1.25rem', fontSize: '1rem' },
  lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
};

const borderRadiusMap = {
  normal: '0.25rem',
  rounded: '0.75rem',
  pill: '9999px',
};

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = computed(() => themeContext.theme.value);

  const styles = computed<StyleObject>(() => {
    const palette = theme.value.palette[options.color.value] as PaletteColor;

    const base: StyleObject = {
      verticalAlign: 'middle',
      display: 'inline-flex',
      width: options.fullWidth.value ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontFamily: theme.value.typography.fontFamily,
      cursor: options.disabled.value ? 'not-allowed' : 'pointer',
      opacity: options.disabled.value ? '0.5' : '1',
      border: 'none',
      transition: 'all 0.3s ease',
      boxShadow: options.disabledElevation.value ? 'none' : theme.value.shadows[+options.shadow.value] || 'none',
      position: 'relative',
      overflow: 'hidden',
      ...sizeMap[options.size.value],
      borderRadius: borderRadiusMap[options.shape.value],
    };

    const hover: Record<string, string> = {};

    switch (options.variant.value) {
      case 'filled':
        Object.assign(base, {
          backgroundColor: palette.main,
          color: palette.contrastText,
        });
        if (!options.disabled.value) {
          Object.assign(hover, {
            backgroundColor: palette.light,
            filter: 'brightness(1.05)',
          });
        }
        break;

      case 'outlined':
        Object.assign(base, {
          backgroundColor: `${palette.main}20`,
          color: palette.main,
          outline: `2px solid ${palette.main}`,
          // border: `2px solid ${palette.main}`,
        });
        if (!options.disabled.value) {
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
        if (!options.disabled.value) {
          Object.assign(hover, {
            color: palette.dark,
            textDecoration: 'underline',
          });
        }
        break;
    }

    const final: StyleObject = convertKeysToKebabCase(base);

    if (Object.keys(hover).length > 0) {
      final[':hover'] = convertKeysToKebabCase(hover);
    }

    return final;
  });

  return { styles };
};
