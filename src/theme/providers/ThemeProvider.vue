<script setup lang="ts">
// Importaciones
import { provide, reactive, watchEffect } from 'vue';
import { darkThemeColors, lightThemeColors } from '@/theme/themes/theme';
import type { Theme, ThemeMode } from '@/theme/types/theme';
import { ThemeSymbol } from '@/theme/constants/theme-keys';

/**
 * Props del componente
 * @property {ThemeMode} [defaultMode='light'] - Modo de tema inicial
 */
const props = defineProps<{
  defaultMode?: ThemeMode;
}>();

/**
 * Estado reactivo del tema
 * @type {Theme}
 *
 * Inicializado con:
 * - Modo: el especificado en props o 'light' por defecto
 * - Colores: paleta correspondiente al modo inicial
 */
const themeState = reactive<Theme>({
  mode: props.defaultMode || 'light',
  colors: props.defaultMode === 'dark' ? darkThemeColors : lightThemeColors,
});

/**
 * Efecto reactivo que aplica los estilos del tema al elemento body
 *
 * Actualiza:
 * - Color de fondo
 * - Color de texto
 * - Transiciones para cambios suaves
 *
 * Se ejecuta automáticamente cuando cambia themeState
 */
watchEffect(() => {
  document.body.style.backgroundColor = themeState.colors.background.default;
  document.body.style.color = themeState.colors.text;
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

/**
 * Función para alternar entre modos claro/oscuro
 * Actualiza tanto el modo como la paleta de colores correspondiente
 */
function toggleMode() {
  themeState.mode = themeState.mode === 'light' ? 'dark' : 'light';
  themeState.colors = themeState.mode === 'dark' ? darkThemeColors : lightThemeColors;
}

/**
 * Función para establecer un modo específico
 * @param {ThemeMode} mode - Modo a establecer ('light' o 'dark')
 */
function setMode(mode: ThemeMode) {
  themeState.mode = mode;
  themeState.colors = mode === 'dark' ? darkThemeColors : lightThemeColors;
}

/**
 * Provee el contexto del tema a componentes hijos
 *
 * @property {Theme} theme - Estado actual del tema
 * @property {Function} toggleMode - Función para cambiar modo
 * @property {Function} setMode - Función para establecer un modo específico
 */
provide(ThemeSymbol, {
  theme: themeState,
  toggleMode,
  setMode,
});
</script>

<template>
  <!-- Slot para contenido que recibirá el contexto del tema -->
  <slot />
</template>
