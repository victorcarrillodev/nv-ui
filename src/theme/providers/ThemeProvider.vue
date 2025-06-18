<script setup lang="ts">
/**
 * ThemeProvider
 * Provee contexto de tema (claro/oscuro) a la aplicación
 * y sincroniza el estado visual de la página con el tema actual.
 */

import { provide, reactive, watchEffect, computed } from 'vue';
import { lightTheme, darkTheme } from '../themes/theme';
import { ThemeInjectionKey } from '../constants/theme-keys';
import type { Theme } from '../types/theme';
import type { ThemeContext } from '../types/theme-provider';
import { useBreakpointListener } from '@/utils/responsive';

// 🧩 Props
type ThemeMode = 'light' | 'dark';
const props = defineProps<{ defaultMode?: ThemeMode }>();

// 📦 Clave para almacenamiento local
const THEME_KEY = 'user-theme';

// 📌 Map de temas
const themeMap: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

// 📥 Obtener modo inicial desde LocalStorage o prop
function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return props.defaultMode || 'light';
}

// 🧠 Estado reactivo del tema
const themeState = reactive({
  mode: getInitialMode(),
  get theme(): Theme {
    return themeMap[this.mode];
  },
});

// 🎛️ Computed para acceso reactivo al tema
const currentTheme = computed(() => themeState.theme);

// 🎯 Cambiar el modo del tema y guardar en localStorage
function setMode(mode: ThemeMode): void {
  if (mode !== themeState.mode) {
    themeState.mode = mode;
    localStorage.setItem(THEME_KEY, mode);
  }
}

// 🔄 Alternar entre light y dark
function toggleMode(): void {
  setMode(themeState.mode === 'light' ? 'dark' : 'light');
}

// 🎨 Sincroniza el fondo y color del body con el tema actual
watchEffect(() => {
  const { background, text } = themeState.theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  document.body.style.transition = 'all 0.3s ease-in-out';
});

// 📱 Inicializa listener de breakpoints para responsividad
useBreakpointListener();

// 🧩 Contexto para inyectar en la app
const context: ThemeContext = {
  theme: currentTheme,
  setMode,
  toggleMode,
};

// 📦 Inyectar contexto en la app
provide(ThemeInjectionKey, context);

// 🔍 (Opcional) Exponer funciones para pruebas o composición
defineExpose({ setMode, toggleMode, theme: currentTheme });
</script>

<template>
  <!-- 🔗 Renderiza los hijos dentro del contexto del tema -->
  <slot />
</template>
