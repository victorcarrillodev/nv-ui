<script setup lang="ts">
import { provide, reactive, watchEffect, computed, onMounted, onBeforeUnmount } from 'vue';
import { lightTheme, darkTheme } from '@/theme/themes/main/theme';
import type { Theme } from '@/theme/types/theme';
import type { ThemeContext } from '@/theme/types/theme-provider';
import { ThemeInjectionKey } from '@/theme/constants/theme-keys';
import { currentBreakpoint } from '@/theme/utils/responsive';
import { useBreakpointListener } from '../utils/breakpoints';

const THEME_KEY = 'user-theme';
type ThemeMode = 'light' | 'dark';

const props = defineProps<{ defaultMode?: ThemeMode }>();

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || (props.defaultMode ?? 'light');
}

const storedMode = getStoredTheme();

const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

const themeState = reactive({
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

// 🌐 Detectar y actualizar el breakpoint actual
onMounted(() => {
  const detect = () => {
    const width = window.innerWidth;
    const breakpoints = themeState.theme.breakpoints.values;

    if (width < breakpoints.sm) currentBreakpoint.value = 'xs';
    else if (width < breakpoints.md) currentBreakpoint.value = 'sm';
    else if (width < breakpoints.lg) currentBreakpoint.value = 'md';
    else if (width < breakpoints.xl) currentBreakpoint.value = 'lg';
    else currentBreakpoint.value = 'xl';

    console.log('📱 Breakpoint actual:', currentBreakpoint.value);
  };

  detect(); // detectar al cargar
  window.addEventListener('resize', detect);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', detect);
  });
});

watchEffect(() => {
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

const context: ThemeContext = {
  theme: computed(() => themeState.theme),
  setMode,
  toggleMode,
};

provide(ThemeInjectionKey, context);

onMounted(() => {
  useBreakpointListener();
});
</script>

<template>
  <slot />
</template>
