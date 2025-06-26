<script setup lang="ts">
// Vue core imports
import { computed, toRef, watch, getCurrentInstance, ref, h } from 'vue';

// Composables
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import { updateStyles } from '@/theme/composables/useDynamicStyles';
import { useResponsiveProp } from '@/theme/composables/props/useResponsiveProp';

// Utils
import { currentBreakpoint, useBreakpointListener } from '@/utils/responsive';
import { hashString } from '@/utils/hash';

// Types
import type { ButtonProps } from './types';
import type { PaletteColor } from '@/theme/types/theme';

// Spinner por defecto si no se proporciona loadingIndicator
const DefaultSpinner = {
  name: 'DefaultSpinner',
  render() {
    return h('span', { class: 'NvButton__default-spinner' });
  },
};

// Escuchar breakpoint para props responsivas
useBreakpointListener();

// Definición de props con valores por defecto
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

// Contexto del tema actual
const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');
const instanceId = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);

// Props adaptativas al breakpoint
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
const rippleColor = computed(() => useResponsiveProp(props.rippleColor).value ?? '');
const component = computed(() => (props.href ? 'a' : useResponsiveProp(props.component).value));

// Iconos y estado disabled
const startIcon = computed(() => useResponsiveProp(props.startIcon).value ?? null);
const endIcon = computed(() => useResponsiveProp(props.endIcon).value ?? null);
const disabled = computed(() => useResponsiveProp(props.disabled).value || loading.value);

// Manejo del ripple
const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([]);
let nextRippleId = 0;

const createRipple = (event: MouseEvent) => {
  if (disabled.value || props.disableRipple) return;
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

// Cálculo dinámico del color del ripple según el tema y color actual
const getRippleColor = computed(() => {
  if (rippleColor.value) return rippleColor.value;
  const palette = theme.value.palette[color.value] as PaletteColor;
  if (variant.value === 'filled') return `rgba(0, 0, 0, ${rippleOpacity.value})`;
  const hex = palette.main.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${rippleOpacity.value})`;
});

// Lógica para íconos y loading
const showStartIcon = computed(() => (loading.value ? loadingPosition.value === 'start' : !!startIcon.value));
const showEndIcon = computed(() => (loading.value ? loadingPosition.value === 'end' : !!endIcon.value));
const showCenterIndicator = computed(() => loading.value && loadingPosition.value === 'center');

// Hash único que representa la configuración actual del botón
const uniqueHash = computed(
  () =>
    `NvButton-${hashString(
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
    )}`,
);

const styleSelector = computed(() => `.${uniqueHash.value}`);

// Obtener estilos dinámicos
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
    disableRipple: computed(() => !!useResponsiveProp(props.disableRipple).value),
    href: computed(() => useResponsiveProp(props.href).value ?? ''),
    loading,
    loadingIndicator,
    loadingPosition,
    rippleDuration,
    rippleOpacity,
    rippleColor,
    target: computed(() => useResponsiveProp(props.target).value ?? '_self'),
  },
  themeContext,
);

// Clases CSS del botón
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
    disableRipple: computed(() => !!useResponsiveProp(props.disableRipple).value),
    href: computed(() => useResponsiveProp(props.href).value ?? ''),
    loading,
    loadingIndicator,
    loadingPosition,
    rippleDuration,
    rippleOpacity,
    rippleColor,
    target: computed(() => useResponsiveProp(props.target).value ?? '_self'),
  }).value,
  uniqueHash.value,
  'NvButton',
  loading.value ? 'NvButton--loading' : '',
]);

// Aplicar estilos en el DOM cuando cambian dependencias relevantes
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
    <!-- Icono a la izquierda o loader en el inicio -->
    <span v-if="showStartIcon" class="NvButton__start-icon">
      <component v-if="!loading" :is="startIcon" />
      <component v-else :is="loadingIndicator || DefaultSpinner" />
    </span>

    <!-- Contenido principal del botón -->
    <span v-if="!showCenterIndicator" class="NvButton__content">
      <slot />
    </span>

    <!-- Loader centrado -->
    <span v-if="showCenterIndicator" class="NvButton__center-loader">
      <component :is="loadingIndicator || DefaultSpinner" />
    </span>

    <!-- Icono a la derecha o loader al final -->
    <span v-if="showEndIcon" class="NvButton__end-icon">
      <component v-if="!loading" :is="endIcon" />
      <component v-else :is="loadingIndicator || DefaultSpinner" />
    </span>

    <!-- Efecto ripple -->
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
          '--ripple-duration': `${rippleDuration}ms`,
        }"
      />
    </transition-group>
  </component>
</template>

<style scoped>
.NvButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.NvButton--loading {
  pointer-events: none;
}

.NvButton__start-icon,
.NvButton__end-icon,
.NvButton__center-loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  line-height: 1;
}

.NvButton__start-icon {
  margin-right: 0.5em;
}

.NvButton__end-icon {
  margin-left: 0.5em;
}

.NvButton__ripple {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ripple-color);
  transform: scale(0);
  animation: ripple-animation var(--ripple-duration) linear forwards;
  width: var(--ripple-size);
  height: var(--ripple-size);
  left: var(--ripple-x);
  top: var(--ripple-y);
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NvButton',
});
</script>
