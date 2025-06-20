import { computed } from 'vue';
import type { StyleObject } from '@/utils/style-injection';
import type { ButtonProps } from './types';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/theme';

export const useButtonStyles = (props: ButtonProps, themeContext: ThemeContext) => {
  const theme = computed(() => themeContext.theme.value);

  const styles = computed<StyleObject>(() => {
    const palette = theme.value.palette[props.color as keyof typeof theme.value.palette] as PaletteColor;

    return {
      backgroundColor: palette.main,
      borderRadius: '2rem',
      marginBlock: '1rem',
      transition: 'all 0.3s ease',

      ':hover': {
        backgroundColor: palette.light,
      },

      '@media (max-width: 768px)': {
        padding: '0.25rem',
      },
    };
  });

  return { styles };
};
