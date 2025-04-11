/**
 * Convierte camelCase a kebab-case.
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Construye una clase con convención tipo BEM o personalizada.
 *
 * Ejemplo:
 * buildClass('NvButton', 'variant', 'outlined') → 'NvButton__variant-outlined'
 * buildClass('NvInput', 'disabled', true)       → 'NvInput__disabled'
 */
export function buildClass(base: string, key: string, value?: string | boolean): string {
  if (!value) return '';
  const kebabKey = toKebabCase(key);
  return typeof value === 'boolean' ? `${base}__${kebabKey}` : `${base}__${kebabKey}-${toKebabCase(String(value))}`;
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

/**
 * Genera una clase base + modificadores en formato BEM dinámico según props.
 *
 * Ej:
 * generateComponentClasses('NvButton', {
 *   color: 'primary',
 *   variant: 'filled',
 *   disabled: true
 * })
 *
 * → ['NvButton', 'NvButton__color-primary', 'NvButton__variant-filled', 'NvButton__disabled']
 */
export function generateComponentClasses(base: string, props: Record<string, unknown>): string[] {
  const classes: string[] = [base];

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== null && value !== false) {
      const kebabKey = toKebabCase(key);
      const className = typeof value === 'boolean' ? `${base}__${kebabKey}` : `${base}__${kebabKey}-${toKebabCase(String(value))}`;

      classes.push(className);
    }
  }

  return classes;
}

/**
 * Genera una clase única basada en múltiples props clave (como color + variant).
 * Ideal para CSS-in-JS.
 *
 * Ej:
 * generateUniqueClass('NvButton', 'primary', 'filled')
 * → 'NvButton__primary-filled'
 */
export function generateUniqueClass(base: string, ...parts: (string | undefined | null)[]): string {
  const filtered = parts.filter((part): part is string => typeof part === 'string').map(toKebabCase);
  return `${base}__${filtered.join('-') || 'default'}`;
}
