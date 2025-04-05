import { computed, watchEffect } from 'vue';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';
import type { ThemeColors, PalleteColor } from '@/theme/types/theme';

/**
 * Convierte claves camelCase a kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convierte todas las claves del objeto a kebab-case (recursivo)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertKeysToKebabCase(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = toKebabCase(key);
      acc[newKey] = typeof value === 'object' && !Array.isArray(value) ? convertKeysToKebabCase(value) : value;
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    },
    {} as Record<string, any>,
  );
}

/**
 * Hook para gestionar los estilos dinámicos del botón.
 * Genera un objeto de estilos basado en las propiedades y el tema,
 * y lo inyecta en el DOM mediante updateStyles.
 */
export const useButtonStyles = (options: ButtonStylesOptions) => {
  const { theme } = useTheme();

  const styles = computed(() => {
    const { variant, size, color, disabled } = options;
    const colors = theme.colors;
    const isValidColor = color && color in colors;
    const colorPalette = isValidColor ? colors[color as keyof ThemeColors] : colors.primary;
    const buttonColor = (colorPalette as PalleteColor).main;
    const buttonColorDark = (colorPalette as PalleteColor).dark;
    const buttonColorLight = (colorPalette as PalleteColor).light;

    const buttonStyles: Record<string, string | object> = {
      alignItems: 'center',
      borderRadius: '0.375rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      fontWeight: '600',
      justifyContent: 'center',
      margin: '0.1rem',
      opacity: disabled ? '0.7' : '1',
      padding: '0.75rem 1.5rem',
      transition: 'all 0.4s ease',
      backgroundColor: variant === 'filled' ? buttonColor : 'transparent',
      color: variant === 'filled' ? '#ffffff' : buttonColor,
      border: variant === 'outlined' ? `2px solid ${buttonColor}` : 'none',
    };

    // Hover effects
    if (!disabled) {
      buttonStyles['&:hover'] = {
        backgroundColor: variant === 'filled' ? buttonColorLight : 'transparent',
        filter: variant === 'filled' ? 'brightness(1.1)' : 'none',
      };
    }

    if (variant === 'outlined') {
      buttonStyles['&:hover'] = {
        backgroundColor: buttonColorLight,
        color: '#ffffff',
      };
    }

    if (variant === 'text') {
      buttonStyles['&:hover'] = {
        color: buttonColorDark,
      };
    }

    // Tamaños
    if (size === 'sm') {
      buttonStyles.padding = '0.2rem 1rem';
      buttonStyles.fontSize = '0.875rem';
    } else if (size === 'md') {
      buttonStyles.padding = '0.5rem 1.5rem';
      buttonStyles.fontSize = '1rem';
    } else if (size === 'lg') {
      buttonStyles.padding = '0.8rem 2rem';
      buttonStyles.fontSize = '1.125rem';
    }

    return convertKeysToKebabCase(buttonStyles);
  });

  // Inyecta los estilos en el DOM
  const applyStyles = () => {
    updateStyles(`.${options.className}`, styles.value);
  };

  watchEffect(() => {
    applyStyles();
  });

  return {
    styles,
    applyStyles,
  };
};
