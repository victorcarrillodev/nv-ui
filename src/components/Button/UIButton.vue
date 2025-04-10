<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useButtonStyles } from './useButtonStyles';
import { useTheme } from '@/theme/composables/useTheme';
import { generateUniqueClass } from '@/theme/utils/class-utils';
import type { ButtonProps } from './button';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  disabled: false,
  shape: 'normal',
});

const themeContext = useTheme();

// Clase reactiva que puede cambiar si cambian props
const uniqueClass = computed(() => generateUniqueClass('NvButton', props.color, props.variant));

// ✅ Hook que genera los estilos
const { styles } = useButtonStyles(
  {
    variant: props.variant,
    size: props.size,
    color: props.color,
    disabled: props.disabled,
    shape: props.shape,
    className: uniqueClass.value, // sí, todavía lo pasamos
  },
  themeContext,
);

// ✅ Aseguramos que los estilos se re-apliquen cuando cambie el tema o props
watchEffect(async () => {
  const className = uniqueClass.value;
  const currentStyles = styles.value;
  if (className && currentStyles) {
    const { updateStyles } = await import('@/theme/composables/useDynamicStyles');
    updateStyles(`.${className}`, currentStyles);
  }
});
</script>

<template>
  <button :class="uniqueClass" :disabled="props.disabled">
    <slot />
  </button>
</template>
