<script setup lang="ts">
import { computed, watch, toRef } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import type { ButtonProps } from './button';
import { updateStyles } from '@/theme/composables/useDynamicStyles';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
  shadow: 1,
});

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');

// ✅ Clases tipo BEM: NvButton, NvButton__variant-filled, etc.
const buttonClasses = useButtonClasses(props);

// ✅ Selector dinámico para aplicar estilos (sin clase aleatoria)
const styleSelector = computed(() => {
  // Convierte ['NvButton', 'NvButton__variant-filled', 'NvButton__color-primary'] a:
  // ".NvButton.NvButton__variant-filled.NvButton__color-primary"
  return '.' + buttonClasses.value.filter(Boolean).join('.');
});

// ✅ Obtener estilos dinámicos
const { styles } = useButtonStyles(
  {
    ...props,
    className: styleSelector.value,
  },
  themeContext,
);

// ✅ Aplicar estilos por clase semántica
watch(
  () => [styles.value, theme.value],
  () => {
    updateStyles(styleSelector.value, styles.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <button :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>
