<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import ThemedMove from './ThemedMove.vue';
import { NvButton } from '.';
</script>

<template>
  <ThemeProvider>
    <ThemedMove />
    <NvButton color="error">ola</NvButton>
    <NvButton color="primary">ola</NvButton>
  </ThemeProvider>
</template>
