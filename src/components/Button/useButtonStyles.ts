import { watchEffect, computed, toRefs } from 'vue';
import { useDynamicStyles } from '@/theme/composables/useDynamicStyles';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonStylesOptions } from './button';

export const useButtonStyles = (options: ButtonStylesOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateStyles, lightenColor } = useDynamicStyles();
  const { theme } = useTheme();

  // Convertir las props a referencias reactivas
  const refs = toRefs(options);

  // Forzar valores booleanos para evitar "undefined"
  const filled = computed(() => !!refs.filled?.value);
  const outlined = computed(() => !!refs.outlined?.value);
  const text = computed(() => !!refs.text?.value);
  const disabled = computed(() => !!refs.disabled?.value);

  // Obtener colores del tema
  const colors = computed(() => theme.colors);

  const updateButtonStyles = () => {
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

    updateStyles('.ui-button--filled', filled.value ? {
      'background-color': colors.value.primary.main,
      color: '#ffffff',
    } : {});

    updateStyles('.ui-button--outlined', outlined.value ? {
      'background-color': 'transparent',
      color: colors.value.primary.main,
      border: `1px solid ${colors.value.primary.main}`,
    } : {});

    updateStyles('.ui-button--text', text.value ? {
      'background-color': 'transparent',
      color: colors.value.primary.main,
    } : {});

    if (!disabled.value) {
      updateStyles('.ui-button:hover', { filter: 'brightness(1.1)' });
    }
  };

  watchEffect(updateButtonStyles);

  return {
    updateButtonStyles,
  };
};
