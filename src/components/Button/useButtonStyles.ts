import { watchEffect } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { updateStyles, resetDynamicStyles } from '@/theme/composables/useDynamicStyles';
import type { ButtonStylesOptions } from './button';
import type { ThemeColors, PalleteColor } from '@/theme/types/theme';

export const useButtonStyles = (options: ButtonStylesOptions) => {
  const { theme } = useTheme();

  const updateButtonStyles = () => {
    const { variant, color, disabled, className } = options;
    const colors: ThemeColors = theme.colors;

    // Se obtiene la paleta de color: si el color solicitado no existe, se usa primary.
    const colorPalette = (color && colors[color as keyof ThemeColors]) || colors.primary;
    const mainColor = (colorPalette as PalleteColor).main;
    const lightColor = (colorPalette as PalleteColor).light;
    const darkColor = (colorPalette as PalleteColor).dark;

    updateStyles(`.${className}`, {
      backgroundColor: variant === 'filled' ? mainColor : 'transparent',
      color: variant === 'filled' ? '#ffffff' : mainColor,
      border: variant === 'outlined' ? `2px solid ${mainColor}` : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.7' : '1',
      transition: 'all 0.4s ease',
    });

    if (!disabled) {
      if (variant === 'filled') {
        updateStyles(`.${className}:hover`, {
          backgroundColor: lightColor,
          filter: 'brightness(1.1)',
        });
      }
      if (variant === 'outlined') {
        updateStyles(`.${className}:hover`, {
          backgroundColor: lightColor,
          color: '#ffffff',
        });
      }
      if (variant === 'text') {
        updateStyles(`.${className}:hover`, {
          color: darkColor,
        });
      }
    }
  };

  watchEffect(() => {
    // Reiniciamos la hoja de estilos y actualizamos los estilos cuando cambien las dependencias
    resetDynamicStyles();
    updateButtonStyles();
  });

  return { updateButtonStyles };
};
