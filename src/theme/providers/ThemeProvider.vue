<script setup lang="ts">
import { provide, reactive, watchEffect, onMounted } from 'vue';
import { darkThemeColors, lightThemeColors } from '@/theme/themes/main/theme';
import type { Theme, ThemeMode } from '@/theme/types/theme';
import { ThemeSymbol } from '@/theme/constants/theme-keys';

// Clave de almacenamiento en localStorage
const THEME_KEY = 'user-theme';

// Props del componente
const props = defineProps<{
  defaultMode?: ThemeMode;
}>();

// Obtener el modo almacenado en localStorage o usar el predeterminado
const storedMode = (localStorage.getItem(THEME_KEY) as ThemeMode) || props.defaultMode || 'light';

// Estado reactivo del tema
const themeState = reactive<Theme>({
  mode: storedMode,
  colors: storedMode === 'dark' ? darkThemeColors : lightThemeColors,
});

// Sincroniza el tema almacenado al montar el componente
onMounted(() => {
  const savedMode = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  if (savedMode) {
    setMode(savedMode);
  }
});

// Efecto para actualizar estilos del body dinámicamente
watchEffect(() => {
  document.body.style.backgroundColor = themeState.colors.background.default;
  document.body.style.color = themeState.colors.text;
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

// Función para cambiar entre light y dark
function toggleMode() {
  setMode(themeState.mode === 'light' ? 'dark' : 'light');
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
