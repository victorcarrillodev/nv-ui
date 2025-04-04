<script setup lang="ts">
import { useButtonClasses } from './useButtonClasses';
import { useButtonStyles } from './useButtonStyles';
import type { ButtonProps } from './button';
import { computed, watchEffect, type CSSProperties } from 'vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
});

const uniqueClass = computed(() => `ui-button-${props.color}-${props.variant}`);

const buttonClasses = useButtonClasses({
  variant: props.variant,
  size: props.size,
  color: props.color,
  disabled: props.disabled,
  className: uniqueClass.value,
});

const { styles, applyStyles } = useButtonStyles({
  variant: props.variant,
  size: props.size,
  color: props.color,
  disabled: props.disabled,
  className: uniqueClass.value,
});

// Aplicar los estilos dinámicamente cuando el componente se monta o actualiza
watchEffect(() => {
  applyStyles();
});
</script>

<template>
  <button :class="buttonClasses" :style="styles as CSSProperties" :disabled="disabled">
    <slot />
  </button>
</template>
