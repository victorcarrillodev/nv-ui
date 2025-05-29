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

useBreakpointListener();

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
  shadow: 1,
  component: 'button',
  disabledElevation: false,
  endIcon: undefined,
  startIcon: undefined,
});

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');

const instanceId = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);

const variant = useResponsiveProp(props.variant);
const size = useResponsiveProp(props.size);
const color = useResponsiveProp(props.color);
const shape = useResponsiveProp(props.shape);
const shadow = useResponsiveProp(props.shadow);
const disabledElevation = useResponsiveProp(props.disabledElevation);
const disabled = computed(() => props.disabled);
const component = computed(() => props.component);
const endIcon = computed(() => props.endIcon);
const startIcon = computed(() => props.startIcon);

// 🎯 Hash único basado en props y contexto
const uniqueHash = computed(
  () =>
    `NvButton-${hashString(
      JSON.stringify({
        variant: variant.value,
        disabledElevation: disabledElevation.value,
        size: size.value,
        color: color.value,
        shape: shape.value,
        shadow: shadow.value,
        disabled: disabled.value,
        themeMode: theme.value.palette.mode,
        breakpoint: currentBreakpoint.value,
        instanceId,
      }),
    )}`,
);

const styleSelector = computed(() => `.${uniqueHash.value}`);

// Estilos CSS-in-JS
const { styles } = useButtonStyles(
  {
    variant,
    size,
    color,
    shape,
    shadow,
    disabled,
    disabledElevation,
    endIcon,
    startIcon,
    className: styleSelector,
  },
  themeContext,
);

// Clases
const buttonClasses = computed(() => [
  ...useButtonClasses({
    variant,
    size,
    color,
    shape,
    shadow,
    disabled,
    disabledElevation,
    endIcon,
    startIcon,
  }).value,
  uniqueHash.value,
]);

// Aplicar estilos dinámicos
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
    <span v-if="startIcon" class="NvButton__start-icon">
      <component :is="startIcon" />
    </span>
    <slot />
    <span v-if="endIcon" class="NvButton__end-icon">
      <component :is="endIcon" />
    </span>
  </component>
</template>

<style scoped>
.NvButton__end-icon {
  margin-left: 0.3rem;
}
.NvButton__start-icon {
  margin-right: 0.3rem;
}
</style>
