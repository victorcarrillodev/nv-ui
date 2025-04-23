<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import ThemedMove from './ThemedMove.vue';
import { NvButton } from '@/components/Button';
import { currentBreakpoint } from './theme/utils/responsive';
</script>

<template>
  <ThemeProvider>
    <div>{{ currentBreakpoint }}</div>
    <ThemedMove />
    <NvButton :color="{ xs: 'primary', sm: 'error', md: 'secondary', lg: 'success' }" shadow="5">button 1</NvButton>
    <NvButton color="error">button 2</NvButton>
    <NvButton color="secondary">button 2</NvButton>
    <NvButton color="success" size="sm">button 2</NvButton>
  </ThemeProvider>
</template>
