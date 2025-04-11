<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import ThemedMove from './ThemedMove.vue';
import { NvButton } from '.';
</script>

<template>
  <ThemeProvider>
    <ThemedMove />
    <nv-button color="error">ola</nv-button>
    <nv-button color="primary">ola</nv-button>
  </ThemeProvider>
</template>
