import { toKebabCase } from './style-utils';

/**
 * Convierte la primera letra en mayúscula.
 * Ej: "primary" → "Primary"
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Estilo BEM: base__key-value o base__key (si boolean)
 */
export function buildClass(base: string, key: string, value?: string | boolean): string {
  if (!value) return '';
  const kebabKey = toKebabCase(key);
  return typeof value === 'boolean' ? `${base}__${kebabKey}` : `${base}__${kebabKey}-${toKebabCase(String(value))}`;
}

/**
 * Une clases ignorando falsy
 */
export function joinClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Estilo BEM dinámico: genera clases como NvButton__color-primary
 */
export function generateComponentClasses(base: string, props: Record<string, unknown>): string[] {
  const classes: string[] = [base];

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== null && value !== false) {
      if (typeof value === 'string' || typeof value === 'boolean') {
        classes.push(buildClass(base, key, value));
      }
    }
  }

  return classes;
}

/**
 * Estilo MUI: NvButton-root, NvButton-colorPrimary, NvButton-sizeMedium
 */
export function generateMuiStyleClasses(base: string, props: Record<string, unknown>): string[] {
  const classes: string[] = [`${base}-root`];

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;

    if (typeof value === 'boolean') {
      classes.push(`${base}-${key}`);
    } else {
      const capitalized = capitalize(String(value));
      classes.push(`${base}-${key}${capitalized}`);
    }
  }

  return classes;
}
