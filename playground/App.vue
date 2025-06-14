<script setup lang="ts">
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { NvButton } from '@/components/Button';
import CssBaseline from '@/components/BaseLine/CssBaseline.vue';
import ThemedMove from './ThemedMove.vue';
import TestResponsive from '@/components/TestResponsive.vue';
import IconCheck from '@/icons/IconCheck.vue';
</script>

<template>
  <ThemeProvider>
    <CssBaseline />
    <TestResponsive/>
    <ThemedMove/>
    <br><br><br>
    <section style="margin: 1rem;">
      <h1>Buttons</h1>
      <h3>colors</h3>
      <!-- ?color section -->
      <section>
        <NvButton color="primary" >primary</NvButton>
        <NvButton color="secondary">secondary</NvButton>
        <NvButton color="success">success</NvButton>
        <NvButton color="info">info</NvButton>
        <NvButton color="error">error</NvButton>
        <NvButton color="warning">warning</NvButton>
      </section>

      <h3>component</h3>
      <!-- ?component section -->
      <section>
        <NvButton component="a">component a</NvButton>
        <NvButton component="div">component div</NvButton>
        <NvButton component="button">component button</NvButton>
      </section>

      <h3>disabled</h3>
      <!-- ?disabled section -->
      <section>
        <NvButton disabled>disabled</NvButton>
        <NvButton>active</NvButton>
      </section>

      <h3>disabled elevation</h3>
      <!-- ?disabled elevation section -->
       <section>
        <NvButton disabledElevation>disabled elevation</NvButton>
        <NvButton>elevation</NvButton>
       </section>

      <h3>disabled ripple</h3>
      <!-- ?disabled ripple section -->
       <section>
         <NvButton :disableRipple="true">disable ripple</NvButton>
         <NvButton>ripple</NvButton>
       </section>

      <h3>icons</h3>
      <!-- ?icons section -->
       <section>
         <NvButton :endIcon="{IconCheck}">EndIcon</NvButton>
        <NvButton :startIcon="{IconCheck}">Start Icon</NvButton>
       </section>

      <h3>full width</h3>
      <!-- ?icons section -->
       <section>
         <NvButton :fullWidth="true">full width</NvButton>
        <NvButton>normal width</NvButton>
       </section>
    </section>
  </ThemeProvider>
</template>
