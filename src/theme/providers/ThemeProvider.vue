<script setup lang="ts">
import { provide, reactive, watchEffect, computed } from 'vue';
import { lightTheme, darkTheme } from '../themes/theme';
import type { Theme } from '../types/theme';
import type { ThemeContext } from '../types/theme-provider';
import { ThemeInjectionKey } from '../constants/theme-keys';
import { useBreakpointListener } from '@/utils/responsive';

const THEME_KEY = 'user-theme';
type ThemeMode = 'light' | 'dark';

const props = defineProps<{ defaultMode?: ThemeMode }>();

/**
 * Gets and validates the stored mode from LocalStorage
 */
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY) as ThemeMode;
  return stored === 'light' || stored === 'dark' ? stored : props.defaultMode || 'light';
}

const initialMode = getInitialTheme();

const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

// 🔧 Estado reactivo del tema
const themeState = reactive({
  mode: initialMode,
  theme: themeMap[initialMode],
});

/**
 * Cambia el modo del tema y actualiza el almacenamiento y el estado.
 */
function setMode(mode: ThemeMode) {
  if (mode === themeState.mode) return;
  themeState.mode = mode;
  themeState.theme = themeMap[mode];
  localStorage.setItem(THEME_KEY, mode);
}

/**
 * Alterna entre modo claro y oscuro.
 */
function toggleMode() {
  setMode(themeState.mode === 'light' ? 'dark' : 'light');
}

/**
 * Actualiza los estilos del `body` según el tema actual.
 */
watchEffect(() => {
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

// ✅ Activa el listener de breakpoint al montar
useBreakpointListener();

// 🧠 Contexto que se inyectará en los componentes hijos
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
