<script setup lang="ts">
import { provide, reactive, watchEffect, onMounted } from 'vue';
import { darkThemeColors, lightThemeColors } from '@/theme/themes/main/theme';
import type { Theme, ThemeMode } from '@/theme/types/theme';
import { ThemeSymbol } from '@/theme/constants/theme-keys';
import type { ThemeContext } from './theme-provider';

const THEME_KEY = 'user-theme';

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';
}

const props = defineProps<{
  defaultMode?: ThemeMode;
}>();

const storedMode = getStoredTheme() || (props.defaultMode ?? 'light');

const themeState = reactive<Theme>({
  mode: storedMode,
  colors: storedMode === 'dark' ? { ...darkThemeColors } : { ...lightThemeColors },
});

onMounted(() => {
  const savedMode = getStoredTheme();
  if (savedMode) {
    setMode(savedMode);
  }
});

watchEffect(() => {
  updateBodyStyles(themeState.colors);
});

function updateBodyStyles(colors: Theme['colors']) {
  document.body.style.backgroundColor = colors.background.default;
  document.body.style.color = colors.text;
}

function toggleMode() {
  const newMode = themeState.mode === 'light' ? 'dark' : 'light';
  if (newMode !== themeState.mode) {
    setMode(newMode);
  }
}

function setMode(mode: ThemeMode) {
  themeState.mode = mode;
  Object.assign(themeState.colors, mode === 'dark' ? darkThemeColors : lightThemeColors);
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_KEY, mode);
  }
}

provide<ThemeContext>(ThemeSymbol, {
  theme: themeState,
  toggleMode,
  setMode,
});
</script>

<template>
  <slot />
</template>
