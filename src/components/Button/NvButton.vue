<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Importaciones de utilidades y tipos
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './buttonClasses';
import type { ButtonProps } from './button';

/**
 * Definición de props con valores por defecto
 *
 * @property {string} variant - Tipo de botón (primary/secondary/etc.)
 * @property {boolean} disabled - Estado deshabilitado
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  filled: false,
  outlined: false,
  text: false,
  disabled: false, // Valor por defecto: false
  size: 'md', // Valor por defecto
});

// 1. Gestión de clases CSS
/**
 * Genera las clases dinámicas del botón basadas en las props
 *
 * @returns {ComputedRef<string[]>} Array reactivo de clases CSS
 */
const buttonClasses = useButtonClasses(props);

// 2. Gestión de estilos dinámicos
/**
 * Configura los estilos CSS-in-JS basados en las props
 *
 * Nota: Los colores se deberían inyectar desde el tema global
 */
useButtonStyles({
  ...props,
  colors: {
    // Estos valores deberían venir del sistema de temas
    primary: '',
    secondary: '',
    background: '',
    surface: '',
    text: '',
    border: '',
  },
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
