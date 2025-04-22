<script setup lang="ts">
import { computed, watch, toRef } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { resolveResponsiveProp, currentBreakpoint } from '@/theme/utils/responsive';
import type { ButtonProps } from './button';
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

// 🟢 Detectar props actualizadas por breakpoint
const resolvedProps = computed(() => ({
  variant: resolveResponsiveProp(props.variant),
  size: resolveResponsiveProp(props.size),
  color: resolveResponsiveProp(props.color),
  shape: resolveResponsiveProp(props.shape),
  shadow: resolveResponsiveProp(props.shadow),
  disabled: props.disabled,
  component: props.component,
}));

// 🧠 Clase hash única basada en las props (para estilos reutilizables)
const uniqueHash = computed(() => {
  const base = JSON.stringify({
    variant: resolvedProps.value.variant,
    size: resolvedProps.value.size,
    color: resolvedProps.value.color,
    shape: resolvedProps.value.shape,
    shadow: resolvedProps.value.shadow,
    disabled: resolvedProps.value.disabled,
    themeMode: theme.value.palette.mode, // por si cambia light/dark
  });

  return `NvButton-${hashString(base)}`;
});

// ✅ Clases tipo BEM + clase hash
const buttonClasses = computed(() => [
  ...useButtonClasses({
    ...resolvedProps.value,
  }).value,
  uniqueHash.value,
]);

// ✅ Selector CSS para aplicar estilos (usamos solo el hash)
const styleSelector = computed(() => `.${uniqueHash.value}`);

// ✅ Estilos dinámicos
const { styles } = useButtonStyles(
  {
    ...resolvedProps.value,
    className: styleSelector.value,
  },
  themeContext,
);

// ✅ Reaplica estilos cuando cambian los props, el tema o el breakpoint
watch(
  () => [styles.value, theme.value, currentBreakpoint.value],
  () => {
    updateStyles(styleSelector.value, styles.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <component :is="props.component" :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </component>
</template>
