<script setup lang="ts">
import { computed, watch, toRef } from 'vue';
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

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');

// Clase única basada en las props del botón
const selectorClass = computed(() => `NvButton__${props.color}-${props.variant}-${props.size}-${props.shape}`);

// Hook para generar clases BEM
const buttonClasses = useButtonClasses({
  ...props,
  className: selectorClass.value,
});

// Hook para obtener estilos dinámicos
const { styles } = useButtonStyles(
  {
    ...props,
    className: selectorClass.value,
  },
  themeContext,
);

// Watcher optimizado para cambios en estilos y tema
watch(
  [styles, () => theme.value.palette],
  ([newStyles]) => {
    if (selectorClass.value && newStyles) {
      import('@/theme/composables/useDynamicStyles').then(({ updateStyles }) => {
        // Actualización forzada de estilos
        updateStyles(`.${selectorClass.value}`, {});
        updateStyles(`.${selectorClass.value}`, newStyles);
      });
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <button :class="[...buttonClasses, selectorClass]" :disabled="props.disabled">
    <slot />
  </button>
</template>
