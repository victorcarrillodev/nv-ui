<!-- src/components/Button/UIButton.vue -->
<script setup lang="ts">
import { computed, watchEffect } from 'vue';
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

// Clase única para identificar estilos por combinación de props
const selectorClass = computed(() => `NvButton__${props.color}-${props.variant}-${props.size}-${props.shape}`);

// Hook para generar clases BEM
const buttonClasses = useButtonClasses({
  ...props,
  className: selectorClass.value,
});

// Hook para obtener estilos dinámicos según props y theme
const { styles } = useButtonStyles(
  {
    ...props,
    className: selectorClass.value,
  },
  themeContext,
);

// Aplica estilos dinámicos cuando cambian props o el theme
watchEffect(async () => {
  if (selectorClass.value && styles.value) {
    const { updateStyles } = await import('@/theme/composables/useDynamicStyles');
    updateStyles(`.${selectorClass.value}`, styles.value);
  }
});
</script>

<template>
  <button :class="[...buttonClasses, selectorClass]" :disabled="props.disabled">
    <slot />
  </button>
</template>
