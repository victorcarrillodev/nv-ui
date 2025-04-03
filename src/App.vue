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
      backgroundColor: theme.colors.background.paper,
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
    <h2>default component</h2>
    <NvButton>default button</NvButton>
    <h2>color component</h2>
    <NvButton color="primary" variant="outlined">color primary</NvButton>
    <NvButton color="secondary">color secondary</NvButton>
    <NvButton color="success">color success</NvButton>
    <NvButton color="info">color info</NvButton>
    <NvButton color="error">color error</NvButton>
    <NvButton color="warning">color warning</NvButton>
    <h2>size component</h2>
    <NvButton size="sm">sm size</NvButton>
    <NvButton size="md">md size</NvButton>
    <NvButton size="lg">lg size</NvButton>
  </ThemeProvider>
</template>
