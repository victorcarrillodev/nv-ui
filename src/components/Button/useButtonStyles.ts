import { watchEffect } from 'vue';
import { useDynamicStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateStyles, lightenColor } = useDynamicStyles();
  const { theme } = useTheme();

  /**
   * Función principal que actualiza todos los estilos del botón
   * Se ejecuta automáticamente cuando cambian las dependencias reactivas
   */
  const updateButtonStyles = () => {
    const { filled, outlined, text, disabled } = options;
    const colors = theme.colors; // Accede a la paleta de colores del tema actual

    // 1. Estilos base aplicados a todos los botones
    updateStyles('.ui-button', {
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '0.75rem 1.5rem', // Tamaño estándar
      'border-radius': '0.375rem', // 6px - border-radius mediano
      border: 'none', // Reset de estilos
      cursor: disabled ? 'not-allowed' : 'pointer', // Feedback visual
      'font-weight': '600', // Texto semibold
      transition: 'all 0.3s ease', // Transiciones suaves
      opacity: disabled ? '0.7' : '1', // Efecto de deshabilitado
    });

    // 2. Estilos específicos por variante (primary, secondary, etc.)
    if (filled) {
      updateStyles('.ui-button--filled', {
        'background-color': colors.primary.main,
        color: '#ffffff',
      });
    }

    if (outlined) {
      updateStyles('.ui-button--outlined', {
        'background-color': 'transparent',
        color: colors.primary.main,
        border: `1px solid ${colors.primary.main}`,
      });
    }

    if (text) {
      updateStyles('.ui-button--text', {
        'background-color': 'transparent',
        color: colors.primary.main,
      });
    }
    // updateStyles(`.ui-button--${variant}`, {
    //   'background-color':
    //     variant === 'primary' ? colors.primary :
    //     variant === 'secondary' ? colors.surface :
    //     'transparent',
    //   color:
    //     variant === 'primary' ? '#ffffff' :
    //     variant === 'secondary' ? colors.text :
    //     colors.primary,
    //   ...(variant === 'secondary' && {
    //     border: `1px solid ${colors.border}`
    //   }),
    // })

    // 3. Efectos hover (solo si no está deshabilitado)
    if (!disabled) {
      updateStyles('.ui-button:hover', {
        filter: 'brightness(1.1)',
      });
    }
    // if (!disabled) {
    //   updateStyles(`.ui-button--${variant}:hover`, {
    //     filter: 'brightness(1.1)', // Efecto de brillo general
    //     ...(variant === 'secondary' && {
    //       'background-color': lightenColor(colors.surface, 15),
    //     }),
    //     ...(variant === 'text' && {
    //       'text-decoration': 'underline', // Subrayado para variante texto
    //     }),
    //   })
    // }
    /**
     * ?added */
    updateStyles('.ui-button--sm', {
      padding: '0.5rem 1rem',
      'font-size': '0.875rem', // 14px
    });

    updateStyles('.ui-button--md', {
      padding: '0.75rem 1.5rem',
      'font-size': '1rem', // 16px
    });

    updateStyles('.ui-button--lg', {
      padding: '1rem 2rem',
      'font-size': '1.125rem', // 18px
    });
  };

  // Observador reactivo que ejecuta updateButtonStyles cuando:
  // - Cambia el tema
  // - Cambian las opciones (variant, disabled)
  watchEffect(updateButtonStyles);

  // Expone la función para actualización manual si es necesario
  return {
    updateButtonStyles,
  };
};
