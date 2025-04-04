import { computed } from 'vue';
import { updateStyles } from '@/theme/composables/useDynamicStyles'; // Asegúrate de tener la importación correcta
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';
import type { ThemeColors, PalleteColor } from '@/theme/types/theme';

/**
 * Hook para gestionar los estilos dinámicos del botón
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
      // Estilos base
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

    // Estilos para tamaños
    if (size === 'sm') {
      buttonStyles.padding = '0.2rem 1rem';
      buttonStyles['font-size'] = '0.875rem';
    } else if (size === 'md') {
      buttonStyles.padding = '0.5rem 1.5rem';
      buttonStyles['font-size'] = '1rem';
    } else if (size === 'lg') {
      buttonStyles.padding = '0.8rem 2rem';
      buttonStyles['font-size'] = '1.125rem';
    }

    return buttonStyles;
  });

  // Regeneramos el estilo dinámico cada vez que cambian las propiedades
  const applyStyles = () => {
    updateStyles(
      `.ui-button-${options.color}-${options.variant}`,
      Object.fromEntries(
        Object.entries(styles.value).map(([key, value]) => [key, typeof value === 'string' ? value : JSON.stringify(value)]),
      ),
    );
  };

  return {
    styles,
    applyStyles, // Función para aplicar estilos dinámicos
  };
};
