import { watchEffect } from 'vue'
import { useDynamicStyles } from '../../theme/useDynamicStyles'
import { useTheme } from '../../theme/useTheme'
import type { ButtonStylesOptions } from './button'

/**
 * Hook composable para manejar estilos dinámicos de componentes Button
 *
 * Este composable:
 * - Gestiona estilos CSS dinámicos basados en propiedades del botón
 * - Reacciona a cambios en el tema y propiedades
 * - Aplica estilos condicionales para diferentes variantes y estados
 */
export const useButtonStyles = (options: ButtonStylesOptions) => {
  // Inyección de dependencias para estilos dinámicos y tema
  const { updateStyles, lightenColor } = useDynamicStyles()
  const { theme } = useTheme()

  /**
   * Función principal que actualiza todos los estilos del botón
   * Se ejecuta automáticamente cuando cambian las dependencias reactivas
   */
  const updateButtonStyles = () => {
    const { variant, disabled } = options
    const colors = theme.colors // Accede a la paleta de colores del tema actual

    // 1. Estilos base aplicados a todos los botones
    updateStyles('.ui-button', {
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '0.75rem 1.5rem', // Tamaño estándar
      'border-radius': '0.375rem', // 6px - border-radius mediano
      border: 'none', // Reset de estilos
      cursor: disabled ? 'not-allowed' : 'pointer', // Feedback visual
      'font-weight': '600', // Texto semibold
      transition: 'all 0.3s ease', // Transiciones suaves
      opacity: disabled ? '0.7' : '1', // Efecto de deshabilitado
    })

    // 2. Estilos específicos por variante (primary, secondary, etc.)
    updateStyles(`.ui-button--${variant}`, {
      'background-color':
        variant === 'primary' ? colors.primary :
        variant === 'secondary' ? colors.surface :
        'transparent',
      color:
        variant === 'primary' ? '#ffffff' :
        variant === 'secondary' ? colors.text :
        colors.primary,
      ...(variant === 'secondary' && {
        border: `1px solid ${colors.border}`
      }),
    })

    // 3. Efectos hover (solo si no está deshabilitado)
    if (!disabled) {
      updateStyles(`.ui-button--${variant}:hover`, {
        filter: 'brightness(1.1)', // Efecto de brillo general
        ...(variant === 'secondary' && {
          'background-color': lightenColor(colors.surface, 15),
        }),
        ...(variant === 'text' && {
          'text-decoration': 'underline', // Subrayado para variante texto
        }),
      })
    }
  }

  // Observador reactivo que ejecuta updateButtonStyles cuando:
  // - Cambia el tema
  // - Cambian las opciones (variant, disabled)
  watchEffect(updateButtonStyles)

  // Expone la función para actualización manual si es necesario
  return {
    updateButtonStyles,
  }
}
