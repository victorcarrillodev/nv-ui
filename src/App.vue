<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import ThemedMove from './ThemedMove.vue';
import { NvButton } from '@/components/Button';
</script>

<template>
  <ThemeProvider>
    <ThemedMove />
    <NvButton color="primary" shadow="5">button 1</NvButton>
    <NvButton color="error">button 2</NvButton>
    <NvButton color="secondary">button 2</NvButton>
    <NvButton color="success" size="sm">button 2</NvButton>
  </ThemeProvider>
</template>
