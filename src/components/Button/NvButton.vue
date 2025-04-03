<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import type { ButtonProps } from './button';

// Definición de props con valores predeterminados
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled', // 'filled', 'outlined' o 'text'
  size: 'md', // 'sm', 'md' o 'lg'
  color: 'primary', // 'primary', 'secondary', etc.
  disabled: false,
});

// Obtén el tema reactivo
const { theme } = useTheme();

// Computed para el objeto de estilos del botón, basado en el tema y las props
const buttonStyle = computed(() => {
  // Obtén la paleta de colores del tema para el color solicitado o usa primary como fallback
  const colors = theme.colors;
  const colorPalette = colors[props.color] || colors.primary;
  const mainColor = colorPalette.main;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lightColor = colorPalette.light;
  // Para el modo 'dark' podrías tener lógica adicional si es necesario, por ejemplo:
  // const isDark = theme.mode === 'dark';

  // Define los estilos base según la variante
  const style: Record<string, string | number> = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '0.375rem',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.7 : 1,
    padding: '0.75rem 1.5rem',
    transition: 'all 0.4s ease',
  };

  if (props.variant === 'filled') {
    style.backgroundColor = mainColor;
    style.color = '#ffffff';
    style.border = 'none';
  } else if (props.variant === 'outlined') {
    style.backgroundColor = 'transparent';
    style.color = mainColor;
    style.border = `2px solid ${mainColor}`;
  } else if (props.variant === 'text') {
    style.backgroundColor = 'transparent';
    style.color = mainColor;
    style.border = 'none';
  }

  // Ajusta el tamaño (esto es un ejemplo; puedes refinarlo)
  if (props.size === 'sm') {
    style.padding = '0.5rem 1rem';
    style.fontSize = '0.875rem';
  } else if (props.size === 'lg') {
    style.padding = '1rem 2rem';
    style.fontSize = '1.125rem';
  } else {
    style.fontSize = '1rem';
  }

  return style;
});
</script>

<template>
  <!-- Se enlaza el estilo directamente al botón -->
  <button :style="buttonStyle" :disabled="props.disabled">
    <slot />
  </button>
</template>
