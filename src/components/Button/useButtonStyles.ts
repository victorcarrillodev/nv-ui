import { watchEffect, computed, toRefs, nextTick } from 'vue';
import { useDynamicStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';

export const useButtonStyles = (options: ButtonStylesOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateStyles, lightenColor } = useDynamicStyles();
  const { theme } = useTheme();

  // Convertir las props a referencias reactivas
  const refs = toRefs(options);

  // Asegurar valores booleanos válidos para evitar "undefined"
  const filled = computed(() => !!refs.filled?.value);
  const outlined = computed(() => !!refs.outlined?.value);
  const text = computed(() => !!refs.text?.value);
  const disabled = computed(() => !!refs.disabled?.value);

  // Verifica si el tema ya está cargado
  const isThemeReady = computed(() => !!theme.colors?.primary?.main);

  // Obtener colores del tema cuando estén listos
  const colors = computed(() => theme.colors);

  const updateButtonStyles = async () => {
    if (!isThemeReady.value) return; // Esperar hasta que el tema esté listo
    await nextTick(); // Asegurar que Vue haya procesado los valores reactivos

    // Estilos base para el botón
    updateStyles('.ui-button', {
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '0.75rem 1.5rem',
      'border-radius': '0.375rem',
      border: 'none',
      cursor: disabled.value ? 'not-allowed' : 'pointer',
      'font-weight': '600',
      transition: 'all 0.3s ease',
      opacity: disabled.value ? '0.7' : '1',
    });

    // Estilos específicos para cada variante
    updateStyles(
      '.ui-button--filled',
      filled.value
        ? {
            'background-color': colors.value.primary.main,
            color: '#ffffff',
          }
        : {},
    );

    updateStyles(
      '.ui-button--outlined',
      outlined.value
        ? {
            'background-color': 'transparent',
            color: colors.value.primary.main,
            border: `0.2rem solid ${colors.value.primary.main}`,
          }
        : {},
    );

    updateStyles(
      '.ui-button--text',
      text.value
        ? {
            'background-color': 'transparent',
            color: colors.value.primary.main,
          }
        : {},
    );

    // Efectos de hover
    if (!disabled.value) {
      updateStyles('.ui-button:hover', { filter: 'brightness(1.1)' });

      updateStyles(
        '.ui-button--outlined:hover',
        outlined.value
          ? {
              'background-color': colors.value.primary.main,
              color: 'white',
            }
          : {},
      );

      updateStyles(
        '.ui-button--text:hover',
        text.value
          ? {
              'text-decoration': 'underline',
            }
          : {},
      );
    }
  };

  // Observar cambios en el tema y actualizar estilos cuando esté listo
  watchEffect(updateButtonStyles);

  return {
    updateButtonStyles,
  };
};
