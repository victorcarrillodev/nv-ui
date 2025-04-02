<script setup lang="ts">
// Importaciones de utilidades y tipos
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './buttonClasses';
import type { ButtonProps } from './button';
import { useTheme } from '@/theme/composables/useTheme';
import { computed } from 'vue';

const theme = useTheme();

/**
 * Definición de props con valores por defecto
 *
 * @property {boolean} filled - Estado del botón de tipo lleno
 * @property {boolean} outlined - Estado del botón de tipo contorneado
 * @property {boolean} text - Estado del botón de tipo texto
 * @property {boolean} disabled - Estado deshabilitado
 * @property {string} size - Tamaño del botón
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  filled: true,
  outlined: false,
  text: false,
  disabled: false,
  size: 'md',
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

// 2. Gestión de clases CSS
/**
 * Genera las clases dinámicas del botón basadas en las props
 *
 * @returns {ComputedRef<string[]>} Array reactivo de clases CSS
 */
const buttonClasses = useButtonClasses({
  ...props,
  ...buttonVariant.value,
});

// 3. Gestión de estilos dinámicos
/**
 * Configura los estilos CSS-in-JS basados en las props
 *
 * Nota: Los colores se deberían inyectar desde el tema global
 */
useButtonStyles({
  ...buttonVariant.value,
  colors: theme.theme.colors,
  disabled: props.disabled,
  size: props.size,
});
</script>

<template>
  <!--
    Elemento button raíz
    :class - Aplica las clases dinámicas generadas
    :disabled - Controla estado disabled nativo
  -->
  <button :class="buttonClasses" :disabled="disabled">
    <!-- Slot para contenido dinámico -->
    <slot />
  </button>
</template>
