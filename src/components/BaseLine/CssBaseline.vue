<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';

const { theme } = useTheme();

const insertGlobalStyles = () => {
  const styleId = 'css-baseline';

  if (document.getElementById(styleId)) return; // prevenir duplicados

  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    *, *::before, *::after {
      box-sizing: border-box;
    }

    html {
      font-size: 16px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-size-adjust: 100%;
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: ${theme.value.typography.fontFamily};
      background-color: ${theme.value.palette.background.default};
      color: ${theme.value.palette.text.primary};
      min-height: 100vh;
      text-rendering: optimizeLegibility;
      transition: background-color 0.3s, color 0.3s;
    }

    h1, h2, h3, h4, h5, h6,
    p, blockquote, pre,
    ul, ol, li,
    figure, hr {
      margin: 0;
      padding: 0;
    }

    ul, ol {
      list-style: none;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    button {
      all: unset;
      cursor: pointer;
    }

    input, textarea, select, button {
      font: inherit;
      color: inherit;
      background: none;
      border: none;
      outline: none;
    }
  `;
  document.head.appendChild(style);
};

onMounted(() => {
  insertGlobalStyles();
});

// Reaccionar al cambio de tema
watch(
  () => theme.value,
  () => {
    const style = document.getElementById('css-baseline') as HTMLStyleElement;
    if (style) {
      style.remove();
    }
    insertGlobalStyles();
  },
  { deep: true },
);
</script>

<template>
  <span style="display: none"></span>
</template>
