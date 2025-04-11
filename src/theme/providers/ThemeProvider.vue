<script setup lang="ts">
import { provide, reactive, watchEffect, computed } from 'vue';
import { lightTheme, darkTheme } from '@/theme/themes/main/newTheme';
import type { Theme } from '@/theme/types/newTheme';
import type { ThemeContext } from '@/theme/types/theme-provider';
import { ThemeInjectionKey } from '@/theme/constants/theme-keys';

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

const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

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

watchEffect(() => {
  if (typeof document === 'undefined') return;
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

// ✅ Contexto reactivo
const context: ThemeContext = {
  theme: computed(() => themeState.theme),
  setMode,
  toggleMode,
};

provide(ThemeInjectionKey, context);
</script>

<template>
  <slot />
</template>
