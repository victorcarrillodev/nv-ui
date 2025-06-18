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
      verticalAlign: 'middle',
      display: 'inline-flex',
      width: options.fullWidth.value ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontFamily: theme.value.typography.fontFamily,
      cursor: options.disabled.value ? 'not-allowed' : 'pointer',
      opacity: options.disabled.value ? '0.5' : '1',
      border: 'none',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: options.disabledElevation.value ? 'none' : (theme.value.shadows[+options.shadow.value] ?? 'none'),
      ...SIZE_MAP[options.size.value],
      borderRadius: RADIUS_MAP[options.shape.value],
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
          color: palette.main,
          boxShadow: `inset 0 0 0 2px ${palette.main}`,
        });

        if (!options.disabled.value) {
          Object.assign(hover, {
            backgroundColor: palette.light,
            color: palette.contrastText,
            boxShadow: `inset 0 0 0 2px ${palette.light}`,
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
            textDecoration: 'underline',
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
