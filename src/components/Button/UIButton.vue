<script setup lang="ts">
import { computed, toRef, watch, getCurrentInstance, ref, h } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useResponsiveProp } from '@/theme/composables/props/useResponsiveProp';
import { currentBreakpoint, useBreakpointListener } from '@/utils/responsive';
import { hashString } from '@/utils/hash';
import type { ButtonProps } from './types';
import type { PaletteColor } from '@/theme/types/theme';

const DefaultSpinner = {
  name: 'DefaultSpinner',
  render() {
    return h('span', { class: 'NvButton__default-spinner' });
  },
};

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
const fullWidth = useResponsiveProp(props.fullWidth);
const color = useResponsiveProp(props.color);
const shape = useResponsiveProp(props.shape);
const shadow = useResponsiveProp(props.shadow);
const disabledElevation = useResponsiveProp(props.disabledElevation);
const disabled = computed(() => useResponsiveProp(props.disabled).value || useResponsiveProp(props.loading).value);
const startIcon = computed(() => useResponsiveProp(props.startIcon).value ?? null);
const endIcon = computed(() => useResponsiveProp(props.endIcon).value ?? null);
const loading = useResponsiveProp(props.loading);
const loadingIndicator = useResponsiveProp(props.loadingIndicator);
const loadingPosition = useResponsiveProp(props.loadingPosition);
const rippleDuration = useResponsiveProp(props.rippleDuration);
const rippleOpacity = useResponsiveProp(props.rippleOpacity);
const rippleColor = useResponsiveProp(props.rippleColor);
const component = computed(() => (props.href ? 'a' : useResponsiveProp(props.component).value));

const showStartIcon = computed(() => (loading.value ? loadingPosition.value === 'start' : !!startIcon.value));
const showEndIcon = computed(() => (loading.value ? loadingPosition.value === 'end' : !!endIcon.value));
const showCenterIndicator = computed(() => loading.value && loadingPosition.value === 'center');

const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([]);
let nextRippleId = 0;

const createRipple = (event: MouseEvent) => {
  if (disabled.value || useResponsiveProp(props.disableRipple).value || loading.value) return;
  const el = event.currentTarget as HTMLElement;
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;
  const rect = el.getBoundingClientRect();
  const x = event.clientX - rect.left - radius;
  const y = event.clientY - rect.top - radius;
  const id = nextRippleId++;
  ripples.value.push({ id, x, y, size: diameter });
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, rippleDuration.value);
};

const getRippleColor = computed(() => {
  if (rippleColor.value) return rippleColor.value;
  const palette = theme.value.palette[color.value] as PaletteColor;
  if (variant.value === 'filled') return `rgba(0, 0, 0, ${rippleOpacity.value})`;
  const rgb = (() => {
    const hex = palette.main.replace('#', '');
    return `${parseInt(hex.substr(0, 2), 16)},${parseInt(hex.substr(2, 2), 16)},${parseInt(hex.substr(4, 2), 16)}`;
  })();
  return `rgba(${rgb}, ${rippleOpacity.value})`;
});

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
        fullWidth: fullWidth.value,
      }),
    )}`,
);

const styleSelector = computed(() => `.${uniqueHash.value}`);

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
  },
  themeContext,
);

const buttonClasses = computed(() => [
  ...useButtonClasses({ variant, size, color, shape, shadow, disabled, disabledElevation, endIcon, startIcon, fullWidth }).value,
  uniqueHash.value,
  'NvButton',
  loading.value ? 'NvButton--loading' : '',
]);

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
    :href="props.href"
    :target="props.href ? props.target : undefined"
    :disabled="!props.href && disabled"
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
      <span
        v-for="r in ripples"
        :key="r.id"
        class="NvButton__ripple"
        :style="{
          '--ripple-x': `${r.x}px`,
          '--ripple-y': `${r.y}px`,
          '--ripple-size': `${r.size}px`,
          '--ripple-color': getRippleColor,
          '--ripple-duration': `${rippleDuration.valueOf}ms`,
        }"
      ></span>
    </transition-group>
  </component>
</template>
