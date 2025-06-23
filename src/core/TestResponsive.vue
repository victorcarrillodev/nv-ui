<script setup lang="ts">
import { computed } from 'vue';
import { useBreakpointListener, currentBreakpoint } from '@/utils/responsive';

useBreakpointListener();

const color = {
  xs: 'red',
  sm: 'orange',
  md: 'blue',
  lg: 'green',
  xl: 'purple',
};

const resolvedColor = computed(() => {
  const bp = currentBreakpoint.value;
  return color[bp] ?? 'gray';
});
</script>

<template>
  <div
    :style="{
      backgroundColor: resolvedColor,
      padding: '2rem',
      color: 'white',
      fontWeight: 'bold',
    }"
  >
    Breakpoint: {{ currentBreakpoint }} <br />
    Color: {{ resolvedColor }}
  </div>
</template>
