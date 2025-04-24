<script setup lang="ts">
import { useTheme } from '@/theme/composables/useTheme';

const { theme, toggleMode } = useTheme();
</script>

<template>
  <div>
    <h1>Modo actual: {{ theme.palette.mode }}</h1>
    <button @click="toggleMode">Cambiar tema</button>
  </div>
</template>
