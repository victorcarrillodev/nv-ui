<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { NvButton } from '@/components/Button';
import CssBaseline from '@/components/BaseLine/CssBaseline.vue';
import ThemedMove from './ThemedMove.vue';
import TestResponsive from '@/components/TestResponsive.vue';
</script>

<template>
  <ThemeProvider>
    <CssBaseline/>
    <TestResponsive></TestResponsive>
    <div>perra</div>
    <div>ola</div>
    <ThemedMove />
    <nv-button
      :color="{ xs: 'error', sm: 'info', md: 'primary', lg: 'success' }"
      shadow="4"
      disabled-elevation
      component="table"
      :size="{ xs: 'sm', sm: 'md', md: 'lg', lg: 'sm' }"
      >ola</nv-button
    >
    <nv-button       disabled-elevation
 :color="{ xs: 'success', sm: 'error', md: 'success', lg: 'info' }" shadow="15">ola 2</nv-button>
  </ThemeProvider>
</template>
