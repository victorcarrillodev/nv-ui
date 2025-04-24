<script setup lang="ts">
import { computed, watch, toRef } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles, removeStyles } from '@/theme/composables/useDynamicStyles';
import { resolveResponsiveProp, currentBreakpoint } from '@/theme/utils/responsive';
import type { ButtonProps } from './types';
import { hashString } from '@/theme/utils/hash';

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

// 🟢 Resolver props según el breakpoint actual
const resolvedProps = computed(() => ({
  variant: resolveResponsiveProp(props.variant),
  size: resolveResponsiveProp(props.size),
  color: resolveResponsiveProp(props.color),
  shape: resolveResponsiveProp(props.shape),
  shadow: resolveResponsiveProp(props.shadow),
  disabled: props.disabled,
  component: props.component,
}));

// 🎯 Clase hash basada en props + breakpoint
const uniqueHash = computed(() => {
  const base = JSON.stringify({
    variant: resolvedProps.value.variant,
    size: resolvedProps.value.size,
    color: resolvedProps.value.color,
    shape: resolvedProps.value.shape,
    shadow: resolvedProps.value.shadow,
    disabled: resolvedProps.value.disabled,
    themeMode: theme.value.palette.mode,
    breakpoint: currentBreakpoint.value,
  });

  return `NvButton-${hashString(base)}`;
});

// ✅ Clases del componente
const buttonClasses = computed(() => [...useButtonClasses({ ...resolvedProps.value }).value, uniqueHash.value]);

const styleSelector = computed(() => `.${uniqueHash.value}`);

// ✅ Estilos dinámicos
const { styles } = useButtonStyles(
  {
    ...resolvedProps.value,
    className: styleSelector.value,
  },
  themeContext,
);

// 🔁 Limpiar estilos anteriores al cambiar el hash
let previousStyleSelector = '';

watch(
  () => [styleSelector.value, styles.value, theme.value, currentBreakpoint.value],
  () => {
    if (previousStyleSelector && previousStyleSelector !== styleSelector.value) {
      removeStyles(previousStyleSelector);
    }

    updateStyles(styleSelector.value, styles.value);
    previousStyleSelector = styleSelector.value;
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <component :is="props.component" :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </component>
</template>
