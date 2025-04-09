/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, watchEffect } from 'vue';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';
import type { ThemeColors, PalleteColor } from '@/theme/types/theme';
import { convertKeysToKebabCase } from '@/theme/utils/style-utils';

/**
 * Composable para generar y aplicar estilos dinámicos de botón
 */
export const useButtonStyles = (options: ButtonStylesOptions) => {
  const { theme } = useTheme();

  const styles = computed(() => {
    const { variant, size, color, disabled, shape, className } = options;
    const colors = theme.colors;
    const isValidColor = color && color in colors;
    const palette = isValidColor ? colors[color as keyof ThemeColors] : colors.primary;
    const { main, light, dark } = palette as PalleteColor;

    const baseStyles: Record<string, string | object> = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      margin: '0.1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.7' : '1',
      transition: 'all 0.4s ease',
      border: 'none',
    };

    // Variante
    switch (variant) {
      case 'filled':
        Object.assign(baseStyles, {
          backgroundColor: main,
          color: '#ffffff',
          '&:hover': !disabled && {
            backgroundColor: light,
            filter: 'brightness(1.1)',
          },
        });
        break;

      case 'outlined':
        Object.assign(baseStyles, {
          backgroundColor: 'transparent',
          color: main,
          border: `2px solid ${main}`,
          '&:hover': !disabled && {
            backgroundColor: light,
            color: '#ffffff',
          },
        });
        break;

      case 'text':
        Object.assign(baseStyles, {
          backgroundColor: 'transparent',
          color: main,
          '&:hover': !disabled && {
            color: dark,
          },
        });
        break;
    }

    // Tamaño
    const sizeStyles: Record<string, string> = {
      sm: {
        padding: '0.2rem 1rem',
        fontSize: '0.875rem',
      },
      md: {
        padding: '0.5rem 1.5rem',
        fontSize: '1rem',
      },
      lg: {
        padding: '0.8rem 2rem',
        fontSize: '1.125rem',
      },
    }[size ?? 'md'];

    Object.assign(baseStyles, sizeStyles);

    // Forma
    const shapeStyles: Record<string, string> = {
      normal: '0.2rem',
      rounded: '1rem',
      pill: '5rem',
    };

    baseStyles.borderRadius = shapeStyles[shape ?? 'normal'];

    return convertKeysToKebabCase(baseStyles);
  });

  const applyStyles = () => {
    if (options.className) {
      updateStyles(`.${options.className}`, styles.value);
    }
  };

  watchEffect(() => {
    applyStyles();
  });

  return {
    styles,
    applyStyles,
  };
};
