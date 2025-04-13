<!-- src/components/Button/UIButton.vue -->
<script setup lang="ts">
import { computed, watch, ref, toRef } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';
import { useButtonStyles } from './useButtonStyles';
import { useButtonClasses } from './useButtonClasses';
import type { ButtonProps } from './button';
import { updateStyles } from '@/theme/composables/useDynamicStyles';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
  shadow: 1,
});

const themeContext = useTheme();
const theme = toRef(themeContext, 'theme');

const classId = ref(`btn-${Math.random().toString(36).substring(2, 8)}`);

const buttonClasses = computed(() => [...useButtonClasses(props).value, classId.value]);

const { styles } = useButtonStyles(
  {
    ...props,
    className: `.${classId.value}`,
  },
  themeContext,
);

watch(
  () => [styles.value, theme.value],
  () => {
    updateStyles(`.${classId.value}`, styles.value as Record<string, string>);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <button :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>
