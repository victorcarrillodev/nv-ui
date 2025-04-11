<!-- src/components/Button/UIButton.vue -->
<script setup lang="ts">
import { computed, watch } from 'vue';
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

// Clase única por combinación de props (color-variant-size-shape)
const selectorClass = computed(() => `NvButton__${props.color}-${props.variant}-${props.size}-${props.shape}`);

// Hook que genera clases tipo BEM
const buttonClasses = useButtonClasses({
  ...props,
  className: selectorClass.value,
});

// Hook que genera y aplica estilos dinámicos para esa clase única
const { styles } = useButtonStyles(
  {
    ...props,
    className: selectorClass.value,
  },
  themeContext,
);

// Vuelve a aplicar los estilos si cambia la clase o el estilo
watch(
  () => styles.value,
  (newStyles) => {
    if (selectorClass.value && newStyles) {
      import('@/theme/composables/useDynamicStyles').then(({ updateStyles }) => {
        updateStyles(`.${selectorClass.value}`, newStyles);
      });
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <!-- Usa la clase base + modificadores + clase única para los estilos -->
  <button :class="[...buttonClasses, selectorClass]" :disabled="props.disabled">
    <slot />
  </button>
</template>
