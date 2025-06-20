<script setup lang="ts">
import { watchEffect } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { injectStyles } from '@/utils/style-injection';
import { useButtonClass } from './useButtonClass';
import { useButtonStyles } from './useButtonStyles';

import type { ButtonProps } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
  variant: 'filled',
  size: 'md',
});

const themeContext = useTheme();
const classes = useButtonClass(props);

// 👇 Extraemos el hashClass para usarlo como selector
const hashClass = classes.value.find((cls) => cls.startsWith('NvButton--'))!;

const { styles } = useButtonStyles(props, themeContext);

watchEffect(() => {
  injectStyles(`.${hashClass}`, styles.value);
});
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
