<script setup lang="ts">
import { watch } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import type { ButtonProps } from './button';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
});

// 👇 Hook del theme
const themeContext = useTheme();

// 👇 Generar clases basadas en props (BEM dinámico)
const buttonClasses = useButtonClasses({
  variant: props.variant,
  size: props.size,
  color: props.color,
  shape: props.shape,
  disabled: props.disabled,
  className: 'NvButton', // solo para compatibilidad con estilos si lo necesitas
});

// 👇 Hook de estilos inyectados dinámicamente
const { styles } = useButtonStyles(
  {
    variant: props.variant,
    size: props.size,
    color: props.color,
    shape: props.shape,
    disabled: props.disabled,
    className: 'NvButton', // mismo selector base
  },
  themeContext,
);

// 👇 Reaplicar estilos al cambiar cualquier cosa
watch(
  () => styles.value,
  (newStyles) => {
    if (newStyles) {
      import('@/theme/composables/useDynamicStyles').then(({ updateStyles }) => {
        updateStyles(`.NvButton`, newStyles);
      });
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <!-- Aplica todas las clases generadas -->
  <button :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>
