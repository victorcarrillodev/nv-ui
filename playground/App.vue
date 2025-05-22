<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { NvButton } from '@/components/Button';
import ThemedMove from './ThemedMove.vue';
import TestResponsive from '@/components/TestResponsive.vue';
</script>

<template>
  <ThemeProvider>
    <TestResponsive></TestResponsive>
    <div>perra</div>
    <div>ola</div>
    <ThemedMove/>
    <nv-button :color="{xs: 'error', sm: 'info', md: 'primary', lg: 'warning'}">ola</nv-button>
    <nv-button :color="{xs: 'success', sm: 'error', md: 'success', lg: 'info'}">ola 2</nv-button>
  </ThemeProvider>
</template>
