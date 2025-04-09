<script setup lang="ts">
import { computed } from 'vue';
import { useButtonClasses } from './useButtonClasses';
import { useButtonStyles } from './useButtonStyles';
import type { ButtonProps } from './button';

// Props con valores por defecto
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
});

// Clase única que sirve como selector CSS-in-JS
const uniqueClass = computed(() => `NvButton__${props.color}-${props.variant}`);

// Composable para clases dinámicas
const buttonClasses = useButtonClasses({
  variant: props.variant,
  size: props.size,
  color: props.color,
  disabled: props.disabled,
  className: uniqueClass.value,
  shape: props.shape,
});

// ✅ Composable para estilos dinámicos (corregido)
const { applyStyles } = useButtonStyles({
  variant: props.variant,
  size: props.size,
  color: props.color,
  disabled: props.disabled,
  className: uniqueClass.value,
  shape: props.shape,
});

// Aplica los estilos al montar y cuando reactive data cambie
applyStyles();
</script>

<template>
  <button :class="[buttonClasses, uniqueClass]" :disabled="props.disabled">
    <slot />
  </button>
</template>
