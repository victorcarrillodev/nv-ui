<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { NvButton } from '@/components/Button';
import ThemedMove from './ThemedMove.vue';
</script>

<template>
  <ThemeProvider>
    <div>perra</div>
    <div>ola</div>
    <ThemedMove/>
    <nv-button :color="{xs: 'error', md: 'primary', lg: 'warning'}">ola</nv-button>
  </ThemeProvider>
</template>
