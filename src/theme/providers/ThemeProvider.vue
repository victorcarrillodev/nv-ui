<script setup lang="ts">
import { provide, reactive, watchEffect } from 'vue';
import { lightTheme, darkTheme } from '@/theme/themes/main/newTheme';
import type { Theme } from '@/theme/types/newTheme';
import type { ThemeContext } from '@/theme/types/theme-provider';
import { ThemeSymbol } from '@/theme/constants/theme-keys';

const THEME_KEY = 'user-theme';
type ThemeMode = 'light' | 'dark';

const props = defineProps<{
  defaultMode?: ThemeMode;
}>();

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || (props.defaultMode ?? 'light');
}

const storedMode = getStoredTheme();

// ✅ Mapas con objetos Theme generados
const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

// ✅ Estado reactivo del proveedor de tema
const themeState = reactive<{
  mode: ThemeMode;
  theme: Theme;
}>({
  mode: storedMode,
  theme: themeMap[storedMode],
});

function setMode(mode: ThemeMode) {
  themeState.mode = mode;
  themeState.theme = themeMap[mode];
  localStorage.setItem(THEME_KEY, mode);
}

function toggleMode() {
  const next = themeState.mode === 'light' ? 'dark' : 'light';
  setMode(next);
}

// ✅ Estilos globales reactivos
watchEffect(() => {
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

// ✅ Provide el contexto de tema
const context: ThemeContext = {
  theme: themeState.theme,
  setMode,
  toggleMode,
};

provide(ThemeSymbol, context);
</script>

<template>
  <slot />
</template>
