<script setup lang="ts">
import { computed, toRef, watch, getCurrentInstance } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useResponsiveProp } from '@/theme/composables/props/useResponsiveProp';
import { currentBreakpoint, useBreakpointListener } from '@/utils/responsive';
import type { ButtonProps } from './types';
import { hashString } from '@/utils/hash';

useBreakpointListener(); // Escucha cambios de tamaño

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
  shadow: 1,
  component: 'button',
});

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');

const instanceId = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);

// Props como computed reactivas
const variant = useResponsiveProp(props.variant);
const size = useResponsiveProp(props.size);
const color = useResponsiveProp(props.color);
const shape = useResponsiveProp(props.shape);
const shadow = useResponsiveProp(props.shadow);
const disabled = computed(() => props.disabled);
const component = computed(() => props.component);

// Generar clase única
const uniqueHash = computed(() => {
  return `NvButton-${hashString(
    JSON.stringify({
      variant: variant.value,
      size: size.value,
      color: color.value,
      shape: shape.value,
      shadow: shadow.value,
      disabled: disabled.value,
      themeMode: theme.value.palette.mode,
      breakpoint: currentBreakpoint.value,
      instanceId,
    }),
  )}`;
});

const styleSelector = computed(() => `.${uniqueHash.value}`);

// Estilos dinámicos
const { styles } = useButtonStyles(
  {
    variant,
    size,
    color,
    shape,
    shadow,
    disabled,
    className: styleSelector,
  },
  themeContext,
);

// Clases CSS
const buttonClasses = computed(() => [
  ...useButtonClasses({
    variant,
    size,
    color,
    shape,
    shadow,
    disabled,
  }).value,
  uniqueHash.value,
]);

// Aplicar estilos sin borrar (evita conflicto entre botones)
watch(
  () => [styleSelector.value, styles.value, theme.value, currentBreakpoint.value],
  () => {
    updateStyles(styleSelector.value, styles.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <component :is="component" :class="buttonClasses" :disabled="disabled">
    <slot />
  </component>
</template>
