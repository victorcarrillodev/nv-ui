<script setup lang="ts">
import ThemeProvider from '../src/theme/providers/ThemeProvider.vue';
// import NvButton from '@/components/Button/NvButton.vue';
// import CssBaseline from '@/components/BaseLine/CssBaseline.vue';
import ThemedMove from './ThemedMove.vue';
import TestResponsive from '../src/components/TestResponsive.vue';
import IconCheck from '../src/icons/IconCheck.vue';
import NvButton from '../src/components/Button/NvButton.vue'
</script>

<template>
  <NvButton variant="filled">primary</NvButton>

  <ThemeProvider>
    <CssBaseline />
    <TestResponsive />
    <ThemedMove />
    <br /><br /><br />
    <section style="margin: 1rem">
      <h1>Buttons</h1>
      <!-- ?color section  -->
      <section>
        <h3>colors</h3>
        <NvButton variant="filled" shadow="8">primary</NvButton>
        <NvButton variant="outlined">secondary</NvButton>
        <NvButton variant="text">success</NvButton>
      </section>
      <!-- ?color section -->
      <section>
        <h3>colors</h3>
        <NvButton color="primary">primary</NvButton>
        <NvButton color="secondary">secondary</NvButton>
        <NvButton color="success">success</NvButton>
        <NvButton color="info">info</NvButton>
        <NvButton color="error">error</NvButton>
        <NvButton color="warning">warning</NvButton>
      </section>

      <!-- ?component section -->
      <section>
        <h3>component</h3>
        <NvButton component="a">component a</NvButton>
        <NvButton component="div">component div</NvButton>
        <NvButton component="button">component button</NvButton>
      </section>

      <!-- ?disabled section -->
      <section>
        <h3>disabled</h3>
        <NvButton :disabled="true">disabled</NvButton>
        <NvButton>active</NvButton>
      </section>

      <!-- ?disabled elevation section -->
      <section>
        <h3>disabled elevation</h3>
        <NvButton disabledElevation>disabled elevation</NvButton>
        <NvButton>elevation</NvButton>
      </section>

      <!-- ?disabled ripple section -->
      <section>
        <h3>disabled ripple</h3>
        <NvButton :disableRipple="true">disable ripple</NvButton>
        <NvButton>ripple</NvButton>
      </section>

      <!-- ?icons section -->
      <section>
        <h3>icons</h3>
        <NvButton>EndIcon</NvButton>
        <NvButton>Start Icon</NvButton>
        <NvButton :startIcon="{ IconCheck }" :endIcon="{ IconCheck }">Start & end Icon</NvButton>
      </section>

      <!-- ?icons section -->
      <section>
        <h3>full width</h3>
        <NvButton :fullWidth="true">full width</NvButton>
        <NvButton>normal width</NvButton>
      </section>
    </section>
  </ThemeProvider>
</template>
