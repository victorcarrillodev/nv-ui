// src/components/Button/useButtonStyles.ts
import { computed, watch } from 'vue';
import type { ButtonStylesOptions } from './button';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/newTheme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';
import { updateStyles } from '@/theme/composables/useDynamicStyles';

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const { theme } = themeContext;

  const styles = computed(() => {
    const { variant, size, color, disabled, shape } = options;
    const palette = theme.palette[color];
    const { main, light, dark, contrastText } = palette as PaletteColor;

    const base: Record<string, string | object> = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: theme.typography.button?.fontWeight?.toString() || '600',
      fontFamily: theme.typography.button?.fontFamily || theme.typography.fontFamily,
      fontSize: theme.typography.button?.fontSize || '1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.6' : '1',
      transition: theme.transitions.create('all', { duration: 300 }),
      border: 'none',
      boxShadow: variant === 'filled' ? theme.shadows[1] : 'none',
    };

    if (variant === 'filled') {
      Object.assign(base, {
        backgroundColor: main,
        color: contrastText,
        '&:hover': !disabled && {
          backgroundColor: light,
          filter: 'brightness(1.05)',
        },
      });
    } else if (variant === 'outlined') {
      Object.assign(base, {
        backgroundColor: 'transparent',
        color: main,
        border: `2px solid ${main}`,
        '&:hover': !disabled && {
          backgroundColor: light,
          color: contrastText,
        },
      });
    } else if (variant === 'text') {
      Object.assign(base, {
        backgroundColor: 'transparent',
        color: main,
        '&:hover': !disabled && {
          color: dark,
        },
      });
    }

    const sizeMap: Record<string, Record<string, string>> = {
      sm: { padding: '0.2rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '0.8rem 2rem', fontSize: '1.125rem' },
    };
    Object.assign(base, sizeMap[size]);

    const shapeMap: Record<string, string> = {
      normal: '0.25rem',
      rounded: '1rem',
      pill: '5rem',
    };
    base.borderRadius = shapeMap[shape];

    return convertKeysToKebabCase(base);
  });

  watch(
    () => styles.value,
    (newStyles) => {
      if (options.className && newStyles) {
        updateStyles(`.${options.className}`, newStyles);
      }
    },
    { immediate: true, deep: true },
  );

  return {
    styles,
  };
};
