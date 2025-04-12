import { computed, watch, toRef } from 'vue';
import type { ButtonStylesOptions } from './button';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/newTheme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import type { StyleObject } from '@/theme/composables/useDynamicStyles/types';

export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = toRef(themeContext, 'theme');

  // Definición explícita del tipo de retorno
  const styles = computed<StyleObject>(() => {
    const { variant, size, color, disabled, shape } = options;
    const palette = theme.value.palette[color] as PaletteColor;
    const { main, light, dark, contrastText } = palette;

    // Creamos el objeto base con el tipo correcto
    const baseStyles: StyleObject = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: theme.value.typography.button?.fontWeight?.toString() || '600',
      fontFamily: theme.value.typography.button?.fontFamily || theme.value.typography.fontFamily,
      fontSize: theme.value.typography.button?.fontSize || '1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.6' : '1',
      transition: theme.value.transitions.create('all', { duration: 300 }) as string,
      border: 'none',
      boxShadow: variant === 'filled' ? (theme.value.shadows[1] as string) : 'none',
    };

    // Añadimos propiedades condicionales con el tipo correcto
    if (variant === 'filled') {
      Object.assign(baseStyles, {
        backgroundColor: main,
        color: contrastText,
        '&:hover': !disabled
          ? {
              backgroundColor: light,
              filter: 'brightness(1.05)',
            }
          : undefined,
      });
    } else if (variant === 'outlined') {
      Object.assign(baseStyles, {
        backgroundColor: 'transparent',
        color: main,
        border: `2px solid ${main}`,
        '&:hover': !disabled
          ? {
              backgroundColor: light,
              color: contrastText,
            }
          : undefined,
      });
    } else if (variant === 'text') {
      Object.assign(baseStyles, {
        backgroundColor: 'transparent',
        color: main,
        '&:hover': !disabled
          ? {
              color: dark,
            }
          : undefined,
      });
    }

    // Añadimos tamaños
    const sizeMap: Record<string, StyleObject> = {
      sm: { padding: '0.2rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '0.8rem 2rem', fontSize: '1.125rem' },
    };
    Object.assign(baseStyles, sizeMap[size]);

    // Añadimos formas
    baseStyles.borderRadius = {
      normal: '0.25rem',
      rounded: '1rem',
      pill: '5rem',
    }[shape];

    return convertKeysToKebabCase(baseStyles) as StyleObject;
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
