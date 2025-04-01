<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { useTheme } from '@/theme/composables/useTheme/index';
import NvButton from './components/Button/NvButton.vue';

// Componente hijo que usa el tema
const ThemedComponent = {
  setup() {
    const { theme, toggleMode } = useTheme();

    return {
      theme,
      toggleMode,
    };
  },
  template: `
    <div :style="{
      backgroundColor: theme.colors.primary.main,
      color: theme.colors.text,
      padding: '20px'
    }">
      <p>Current mode: {{ theme.mode }}</p>
      <button @click="toggleMode">Toggle Theme</button>
    </div>
  `,
};
</script>

<template>
  <ThemeProvider default-mode="light">
    <ThemedComponent />
    <nv-button>ola</nv-button>
  </ThemeProvider>
</template>
