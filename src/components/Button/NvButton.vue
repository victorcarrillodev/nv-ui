<script setup lang="ts">
// === Global styles ===
import { useButtonGlobalStyles } from './useButtonGlobalStyles';
useButtonGlobalStyles();

// === Imports ===
import { computed, toRef, watch, getCurrentInstance, h } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useResponsiveProp } from '@/theme/composables/props/useResponsiveProp';
import { currentBreakpoint, useBreakpointListener } from '@/utils/responsive';
import { hashString } from '@/utils/hash';
import { useRipple } from './useRipple'; // 👈 nuevo import

import type { ButtonProps } from './types';
import type { PaletteColor } from '@/theme/types/theme';

// === Spinner por defecto ===
const DefaultSpinner = {
  name: 'DefaultSpinner',
  render() {
    return h('span', { class: 'NvButton__default-spinner' });
  },
};

useBreakpointListener();

// === Props y responsive props ===
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
  shadow: 1,
  component: 'button',
  disabledElevation: false,
  rippleDuration: 600,
  rippleColor: undefined,
  rippleOpacity: 0.3,
  fullWidth: false,
  href: undefined,
  target: '_self',
  loading: false,
  loadingIndicator: null,
  loadingPosition: 'center',
});

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');
const instanceId = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);

const variant = useResponsiveProp(props.variant);
const size = useResponsiveProp(props.size);
const color = useResponsiveProp(props.color);
const shape = useResponsiveProp(props.shape);
const shadow = useResponsiveProp(props.shadow);
const fullWidth = useResponsiveProp(props.fullWidth);
const disabledElevation = useResponsiveProp(props.disabledElevation);
const loading = useResponsiveProp(props.loading);
const loadingIndicator = useResponsiveProp(props.loadingIndicator);
const loadingPosition = useResponsiveProp(props.loadingPosition);
const rippleDuration = useResponsiveProp(props.rippleDuration);
const rippleOpacity = useResponsiveProp(props.rippleOpacity);
const rippleColorProp = useResponsiveProp(props.rippleColor);
const component = computed(() => (props.href ? 'a' : useResponsiveProp(props.component).value));
const startIcon = computed(() => useResponsiveProp(props.startIcon).value ?? null);
const endIcon = computed(() => useResponsiveProp(props.endIcon).value ?? null);
const target = computed(() => useResponsiveProp(props.target).value ?? '_self');
const href = computed(() => useResponsiveProp(props.href).value ?? '');
const disableRipple = computed(() => !!useResponsiveProp(props.disableRipple).value);
const disabled = computed(() => useResponsiveProp(props.disabled).value || loading.value);

// === Cálculo del color del ripple ===
const getRippleColor = computed(() => {
  if (rippleColorProp.value) return rippleColorProp.value;
  const palette = theme.value.palette[color.value] as PaletteColor;
  if (variant.value === 'filled') return `rgba(0, 0, 0, ${rippleOpacity.value})`;
  const hex = palette.main.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${rippleOpacity.value})`;
});

// === Composable para el ripple ===
const { ripples, createRipple, rippleStyle } = useRipple({
  disabled: disabled.value,
  disableRipple: disableRipple.value,
  duration: rippleDuration.value,
  color: getRippleColor.value,
  opacity: rippleOpacity.value,
});

// === Mostrar iconos e indicador ===
const showStartIcon = computed(() => (loading.value ? loadingPosition.value === 'start' : !!startIcon.value));
const showEndIcon = computed(() => (loading.value ? loadingPosition.value === 'end' : !!endIcon.value));
const showCenterIndicator = computed(() => loading.value && loadingPosition.value === 'center');

// === Generación de hash único para los estilos ===
const uniqueHash = computed(() => {
  return `NvButton-${hashString(
    JSON.stringify({
      variant: variant.value,
      size: size.value,
      color: color.value,
      shape: shape.value,
      shadow: shadow.value,
      disabled: disabled.value,
      disabledElevation: disabledElevation.value,
      themeMode: theme.value.palette.mode,
      breakpoint: currentBreakpoint.value,
      fullWidth: fullWidth.value,
      instanceId,
    }),
  )}`;
});

const styleSelector = computed(() => `.${uniqueHash.value}`);

// === Estilos y clases ===
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
    fullWidth,
    component,
    disableRipple,
    href,
    loading,
    loadingIndicator,
    loadingPosition,
    rippleDuration,
    rippleOpacity,
    rippleColor: getRippleColor,
    target,
  },
  themeContext,
);

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
    fullWidth,
    component,
    disableRipple,
    href,
    loading,
    loadingIndicator,
    loadingPosition,
    rippleDuration,
    rippleOpacity,
    rippleColor: getRippleColor,
    target,
  }).value,
  uniqueHash.value,
  'NvButton',
  loading.value ? 'NvButton--loading' : '',
]);

// === Inyección de estilos ===
watch(
  [styleSelector, styles, theme, currentBreakpoint],
  () => {
    updateStyles(styleSelector.value, styles.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <component
    :is="component"
    :class="buttonClasses"
    :href="href"
    :target="href ? target : undefined"
    :disabled="!href && disabled"
    role="button"
    @click="createRipple"
  >
    <span v-if="showStartIcon" class="NvButton__start-icon">
      <component v-if="!loading" :is="startIcon" />
      <component v-else :is="loadingIndicator || DefaultSpinner" />
    </span>

    <span v-if="!showCenterIndicator" class="NvButton__content">
      <slot />
    </span>

    <span v-if="showCenterIndicator" class="NvButton__center-loader">
      <component :is="loadingIndicator || DefaultSpinner" />
    </span>

    <span v-if="showEndIcon" class="NvButton__end-icon">
      <component v-if="!loading" :is="endIcon" />
      <component v-else :is="loadingIndicator || DefaultSpinner" />
    </span>

    <transition-group name="ripple">
      <span v-for="r in ripples" :key="r.id" class="NvButton__ripple" :style="rippleStyle(r)" />
    </transition-group>
  </component>
</template>
