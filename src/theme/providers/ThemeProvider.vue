<script setup lang="ts">
import { provide, reactive, watchEffect, onMounted } from 'vue';
import { darkThemeColors, lightThemeColors } from '@/theme/themes/main/theme';
import type { Theme, ThemeMode } from '@/theme/types/theme';
import { ThemeSymbol } from '@/theme/constants/theme-keys';

// Clave de almacenamiento en localStorage
const THEME_KEY = 'user-theme';

// Función para obtener el tema almacenado
function getStoredTheme(): ThemeMode {
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';
}

// Props del componente
const props = defineProps<{
  defaultMode?: ThemeMode;
}>();

// Obtener el modo almacenado en localStorage o usar el predeterminado
const storedMode = getStoredTheme() || (props.defaultMode ?? 'light');

// Estado reactivo del tema
const themeState = reactive<Theme>({
  mode: storedMode,
  colors: storedMode === 'dark' ? darkThemeColors : lightThemeColors,
});

// Sincroniza el tema almacenado al montar el componente
onMounted(() => {
  const savedMode = getStoredTheme();
  if (savedMode) {
    setMode(savedMode);
  }
});

// Efecto para actualizar estilos del body dinámicamente
let currentBackground = themeState.colors.background.default;
let currentTextColor = themeState.colors.text;

watchEffect(() => {
  if (document.body.style.backgroundColor !== currentBackground) {
    document.body.style.backgroundColor = themeState.colors.background.default;
    currentBackground = themeState.colors.background.default;
  }

  if (document.body.style.color !== currentTextColor) {
    document.body.style.color = themeState.colors.text;
    currentTextColor = themeState.colors.text;
  }
});

// Función para cambiar entre light y dark
function toggleMode() {
  const newMode = themeState.mode === 'light' ? 'dark' : 'light';
  if (newMode !== themeState.mode) {
    setMode(newMode);
  }
}

// Función para establecer un modo específico y guardarlo en localStorage
function setMode(mode: ThemeMode) {
  themeState.mode = mode;
  themeState.colors = mode === 'dark' ? darkThemeColors : lightThemeColors;
  localStorage.setItem(THEME_KEY, mode);
}

// Proveer el contexto del tema
provide(ThemeSymbol, {
  theme: themeState,
  toggleMode,
  setMode,
});
</script>

<template>
  <!-- Contenido que recibirá el contexto del tema -->
  <slot />
</template>
