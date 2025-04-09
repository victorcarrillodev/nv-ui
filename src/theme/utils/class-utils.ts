/**
 * Construye una clase con convención tipo BEM o personalizada.
 *
 * Ejemplo:
 * buildClass('NvButton', 'variant', 'outlined') → 'NvButton__variant-outlined'
 * buildClass('NvInput', 'disabled', true)       → 'NvInput__disabled'
 */
export function buildClass(base: string, key: string, value?: string | boolean): string {
  if (!value) return '';
  return typeof value === 'boolean' ? `${base}__${key}` : `${base}__${key}-${value}`;
}

/**
 * Junta múltiples clases en una sola string.
 * Ignora `false`, `null`, `undefined`, o strings vacíos.
 *
 * Ejemplo:
 * joinClasses('btn', false && 'hidden', 'rounded') → 'btn rounded'
 */
export function joinClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
