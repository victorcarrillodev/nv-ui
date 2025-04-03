<script setup lang="ts">
// Importaciones de utilidades y tipos
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './buttonClasses';
import type { ButtonProps } from './button';
import { computed, ref, watchEffect } from 'vue';

/**
 * Definición de props con valores por defecto
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  filled: true,
  outlined: false,
  text: false,
  disabled: false,
  size: 'md',
  color: 'primary', // Color por defecto
});

// 1. Asegúrate de que solo una de las propiedades esté activada a la vez
const buttonVariant = computed(() => {
  if (props.outlined) {
    return { filled: false, outlined: true, text: false };
  } else if (props.text) {
    return { filled: false, outlined: false, text: true };
  } else {
    return { filled: true, outlined: false, text: false };
  }
});

// 2. Genera las clases dinámicas basadas en las props
const buttonClasses = ref<string[]>([]);

watchEffect(() => {
  buttonClasses.value = useButtonClasses({
    ...props,
    ...buttonVariant.value,
  }).value;
});

// 3. Gestión de estilos dinámicos
useButtonStyles({
  ...buttonVariant.value,
  disabled: props.disabled,
  size: props.size,
  color: props.color, // Aquí pasas el color que se usa en el hook
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot />
  </button>
</template>
