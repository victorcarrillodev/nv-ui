<script setup lang="ts">
import { computed, watch, toRef } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { resolveResponsiveProp, currentBreakpoint } from '@/theme/utils/responsive';
import type { ButtonProps } from './button';

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

// ✅ Clases tipo BEM: NvButton, NvButton__variant-filled, etc.
const buttonClasses = computed(
  () =>
    useButtonClasses({
      ...resolvedProps.value,
      className: '', // opcional, lo podés usar si querés forzar una clase base
    }).value,
);

// ✅ Selector CSS para aplicar estilos
const styleSelector = computed(() => {
  return '.' + buttonClasses.value.filter(Boolean).join('.');
});

// ✅ Estilos dinámicos
const { styles } = useButtonStyles(
  {
    ...resolvedProps.value,
    className: styleSelector.value,
  },
  themeContext,
);

// ✅ Reaplica estilos cuando cambia el breakpoint o el tema
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
