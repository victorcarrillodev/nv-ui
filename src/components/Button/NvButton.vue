<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useButtonClasses } from './useButtonClasses';
import { useButtonStyles } from './useButtonStyles';
import type { ButtonProps } from './button';

// Definición de las props con valores predeterminados
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
});

// Generar una clase única basada en color y variant
const uniqueClass = computed(() => `NvButton__${props.color}-${props.variant}`);

// Obtener las clases dinámicas usando useButtonClasses y pasando la clase única
const buttonClasses = useButtonClasses({
  variant: props.variant,
  size: props.size,
  color: props.color,
  disabled: props.disabled,
  className: uniqueClass.value,
});

// Aplicar estilos dinámicos. El hook inyecta las reglas CSS basadas en uniqueClass.
watchEffect(() => {
  useButtonStyles({
    variant: props.variant,
    size: props.size,
    color: props.color,
    disabled: props.disabled,
    className: uniqueClass.value,
  });
});
</script>

<template>
  <!-- Se aplican las clases dinámicas y la clase única para que las reglas CSS inyectadas funcionen -->
  <button :class="[buttonClasses, uniqueClass]" :disabled="props.disabled">
    <slot />
  </button>
</template>
