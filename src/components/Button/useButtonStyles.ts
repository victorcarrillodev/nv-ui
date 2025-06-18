// src/components/Button/useButtonStyles.ts
import { computed } from 'vue';
import type { ButtonStylesOptions } from './types';
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { PaletteColor } from '@/theme/types/theme';
import type { StyleObject } from '@/theme/types/useDynamicStyles';
import { convertKeysToKebabCase } from '@/utils/style-utils';

// 🎯 Mapas de tamaño y bordes
const SIZE_MAP = {
  sm: { padding: '0.25rem 1rem', fontSize: '0.875rem' },
  md: { padding: '0.5rem 1.25rem', fontSize: '1rem' },
  lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
} as const;

const RADIUS_MAP = {
  normal: '0.25rem',
  rounded: '0.75rem',
  pill: '9999px',
} as const;

/**
 * Composable para generar estilos dinámicos del botón basado en el tema y las props.
 */
export const useButtonStyles = (options: ButtonStylesOptions, themeContext: ThemeContext) => {
  const theme = computed(() => themeContext.theme.value);

  const styles = computed<StyleObject>(() => {
    const palette = theme.value.palette[options.color.value] as PaletteColor;

    // 🧱 Estilos base
    const base: StyleObject = {
      alignItems: 'center',
      border: 'none',
      borderRadius: RADIUS_MAP[options.shape.value],
      boxShadow: options.disabledElevation.value ? 'none' : (theme.value.shadows[+options.shadow.value] ?? 'none'),
      cursor: options.disabled.value ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      fontWeight: 600,
      fontFamily: theme.value.typography.fontFamily,
      justifyContent: 'center',
      margin: '0.1rem',
      opacity: options.disabled.value ? '0.5' : '1',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s ease',
      verticalAlign: 'middle',
      width: options.fullWidth.value ? '100%' : 'auto',
      ...SIZE_MAP[options.size.value],
    };

    // ✨ Estilos hover
    const hover: StyleObject = {};

    // 🎨 Variante del botón
    switch (options.variant.value) {
      case 'filled':
        Object.assign(base, {
          backgroundColor: palette.main,
          color: palette.contrastText,
        });

        if (!options.disabled.value) {
          Object.assign(hover, {
            backgroundColor: palette.light,
            filter: 'brightness(1.05)',
          });
        }
        break;

      case 'outlined':
        Object.assign(base, {
          backgroundColor: 'transparent',
          boxShadow: `inset 0 0 0 2px ${palette.main}`,
          color: palette.main,
          filter: 'brightness(1.05)',
          inset: '1rem solid red',
        });

        if (!options.disabled.value) {
          Object.assign(hover, {
            backgroundColor: `${palette.main}15`,
            boxShadow: `inset 0 0 0 2px ${palette.light}`,
            color: palette.light,
          });
        }
        break;

      case 'text':
        Object.assign(base, {
          backgroundColor: 'transparent',
          color: palette.main,
        });

        if (!options.disabled.value) {
          Object.assign(hover, {
            color: palette.dark,
          });
        }
        break;
    }

    // 🧪 Conversión a CSS kebab-case y ensamblaje final
    const final: StyleObject = convertKeysToKebabCase(base);

    if (Object.keys(hover).length > 0) {
      final[':hover'] = convertKeysToKebabCase(hover);
    }

    return final;
  });

  return { styles };
};
