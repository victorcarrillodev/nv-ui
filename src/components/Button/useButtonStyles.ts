import { watchEffect } from 'vue';
import { useDynamicStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';
import type { ThemeColors, PalleteColor } from '@/theme/types/theme';

/**
 * Hook composable para manejar estilos dinámicos de componentes Button
 *
 * Este composable:
 * - Gestiona estilos CSS dinámicos basados en propiedades del botón
 * - Reacciona a cambios en el tema y propiedades
 * - Aplica estilos condicionales para diferentes variantes y estados
 */
export const useButtonStyles = (options: ButtonStylesOptions) => {
  // Inyección de dependencias para estilos dinámicos y tema
  const { updateStyles } = useDynamicStyles();
  const { theme } = useTheme();

  /**
   * Función principal que actualiza todos los estilos del botón
   * Se ejecuta automáticamente cuando cambian las dependencias reactivas
   */
  const updateButtonStyles = () => {
    const { filled, outlined, text, disabled, color } = options;
    const colors = theme.colors; // Accede a la paleta de colores del tema actual

    // Validación del color proporcionado (si es una clave válida de ThemeColors)
    const isValidColor = color && color in colors;

    // Verificamos si el color seleccionado es un PalleteColor
    const colorPalette = isValidColor ? colors[color as keyof ThemeColors] : colors.primary;

    // Comprobamos que colorPalette sea un PalleteColor antes de acceder a sus propiedades
    const buttonColor = (colorPalette as PalleteColor).main;
    const buttonColorDark = (colorPalette as PalleteColor).dark;
    const buttonColorLight = (colorPalette as PalleteColor).light;

    // 1. Estilos base aplicados a todos los botones
    updateStyles('.ui-button', {
      'align-items': 'center',
      borderRadius: '0.375rem', // 6px - border-radius mediano
      cursor: disabled ? 'not-allowed' : 'pointer', // Feedback visual
      display: 'inline-flex',
      'font-weight': '600', // Texto semibold
      'justify-content': 'center',
      opacity: disabled ? '0.7' : '1', // Efecto de deshabilitado
      padding: '0.75rem 1.5rem', // Tamaño estándar
      transition: 'all 0.3s ease', // Transiciones suaves
    });

    // 2. Estilos específicos por variante (filled, outlined, text)
    if (filled) {
      updateStyles('.ui-button--filled', {
        color: '#ffffff',
        'background-color': buttonColor,
        border: 'none',
      });
    }

    if (outlined) {
      updateStyles('.ui-button--outlined', {
        'background-color': 'transparent',
        color: buttonColor,
        border: `2px solid ${buttonColor}`,
      });
    }

    if (text) {
      updateStyles('.ui-button--text', {
        'background-color': 'transparent',
        color: buttonColor,
        border: 'none',
      });
    }

    // 3. Efectos hover (usando color.dark y color.light)
    if (!disabled) {
      updateStyles('.ui-button:hover', {
        'background-color': buttonColorLight,
        filter: 'brightness(1.1)', // Efecto de brillo al hacer hover
      });
    }

    // 4. Efecto de hover en los botones outlined
    if (outlined) {
      updateStyles('.ui-button--outlined:hover', {
        'background-color': buttonColorLight,
        color: '#ffffff',
      });
    }

    // 5. Efecto de hover en los botones text
    if (text) {
      updateStyles('.ui-button--text:hover', {
        color: buttonColorDark,
      });
    }

    // 6. Estilos para tamaños
    updateStyles('.NvButton__size-sm', {
      padding: '0.2rem 1rem',
      'font-size': '0.875rem', // 14px
    });

    updateStyles('.NvButton__size-md', {
      padding: '0.5rem 1.5rem',
      'font-size': '1rem', // 16px
    });

    updateStyles('.NvButton__size-lg', {
      padding: '0.8rem 2rem',
      'font-size': '1.125rem', // 18px
    });
  };

  // Observador reactivo que ejecuta updateButtonStyles cuando:
  // - Cambia el tema
  // - Cambian las opciones (variant, disabled)
  watchEffect(() => {
    updateButtonStyles();
  });

  // Expone la función para actualización manual si es necesario
  return {
    updateButtonStyles,
  };
};
