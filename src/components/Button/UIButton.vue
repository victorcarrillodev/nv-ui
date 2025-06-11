<script setup lang="ts">
import { computed, toRef, watch, getCurrentInstance, ref } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useResponsiveProp } from '@/theme/composables/props/useResponsiveProp';
import { currentBreakpoint, useBreakpointListener } from '@/utils/responsive';
import type { ButtonProps } from './types';
import { hashString } from '@/utils/hash';
import type { PaletteColor } from '@/theme/types/theme';

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
  rippleDuration: 600,
  rippleColor: undefined,
  disableRipple: false,
  rippleOpacity: 0.3,
  fullWidth: false,
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
const fullWidth = computed(() => props.fullWidth);

// Ripple effect state
const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([]);
let nextRippleId = 0;

const createRipple = (event: MouseEvent) => {
  if (props.disabled || props.disableRipple) return;

  const button = event.currentTarget as HTMLElement;
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left - radius;
  const y = event.clientY - rect.top - radius;

  const id = nextRippleId++;
  ripples.value.push({ id, x, y, size: diameter });

  // Remove ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, props.rippleDuration);
};

const getRippleColor = computed(() => {
  if (props.rippleColor) return props.rippleColor;

  const palette = theme.value.palette[color.value] as PaletteColor;

  if (variant.value === 'filled') {
    return `rgba(0, 0, 0, ${props.rippleOpacity})`; // Dark ripple for filled buttons
  } else {
    const rgb = hexToRgb(palette.main);
    return `rgba(${rgb}, ${props.rippleOpacity})`; // Theme color ripple for others
  }
});

const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
};

// Unique hash for styles
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

// CSS-in-JS styles
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

// Button classes
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
  }).value,
  uniqueHash.value,
  'NvButton',
]);

// Update dynamic styles
watch(
  () => [styleSelector.value, styles.value, theme.value, currentBreakpoint.value],
  () => {
    updateStyles(styleSelector.value, styles.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <component :is="component" :class="buttonClasses" :disabled="disabled" @click="createRipple">
    <span v-if="startIcon" class="NvButton__start-icon">
      <component :is="startIcon" />
    </span>
    <slot />
    <span v-if="endIcon" class="NvButton__end-icon">
      <component :is="endIcon" />
    </span>

    <!-- Ripple elements -->
    <transition-group name="ripple">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="NvButton__ripple"
        :style="{
          '--ripple-x': `${ripple.x}px`,
          '--ripple-y': `${ripple.y}px`,
          '--ripple-size': `${ripple.size}px`,
          '--ripple-color': getRippleColor,
          '--ripple-duration': `${props.rippleDuration}ms`,
        }"
      />
    </transition-group>
  </component>
</template>

<style scoped>
.NvButton {
  position: relative;
  overflow: hidden;
  isolation: isolate; /* Contiene el efecto ripple */
}

.NvButton__end-icon {
  margin-left: 0.3rem;
  position: relative;
  z-index: 1;
}

.NvButton__start-icon {
  margin-right: 0.3rem;
  position: relative;
  z-index: 1;
}

.NvButton__ripple {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ripple-color);
  transform: scale(0);
  animation: ripple-animation var(--ripple-duration) linear forwards;
  opacity: 1;
  width: var(--ripple-size);
  height: var(--ripple-size);
  left: var(--ripple-x);
  top: var(--ripple-y);
  pointer-events: none;
  z-index: 0;
  will-change: transform, opacity;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Ripple transitions */
.ripple-enter-active {
  transition: opacity 0.05s ease;
}
.ripple-leave-active {
  transition: opacity calc(var(--ripple-duration) * 0.5) ease;
}
.ripple-enter-from,
.ripple-leave-to {
  opacity: 0;
}
</style>
