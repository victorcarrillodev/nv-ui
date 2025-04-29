<script setup lang="ts">
import { provide, reactive, watchEffect, computed } from 'vue';
import { lightTheme, darkTheme } from '../themes/theme';
import type { Theme } from '../types/theme';
import type { ThemeContext } from '../types/theme-provider';
import { ThemeInjectionKey } from '../constants/theme-keys';
import { useBreakpointListener } from '../../utils/responsive'; // 👈 importa esto

const THEME_KEY = 'user-theme';
type ThemeMode = 'light' | 'dark';

const props = defineProps<{ defaultMode?: ThemeMode }>();

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || props.defaultMode || 'light';
}

const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

const themeState = reactive({
  mode: getStoredTheme(),
  theme: themeMap[getStoredTheme()],
});

function setMode(mode: ThemeMode) {
  themeState.mode = mode;
  themeState.theme = themeMap[mode];
  localStorage.setItem(THEME_KEY, mode);
}

function toggleMode() {
  setMode(themeState.mode === 'light' ? 'dark' : 'light');
}

watchEffect(() => {
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

// ✅ Inicia el listener de breakpoint solo una vez
useBreakpointListener();

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
