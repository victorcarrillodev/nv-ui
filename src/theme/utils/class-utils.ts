import { toKebabCase } from './style-utils';

export function buildClass(base: string, key: string, value?: string | boolean): string {
  if (!value) return '';
  const kebabKey = toKebabCase(key);
  return typeof value === 'boolean' ? `${base}__${kebabKey}` : `${base}__${kebabKey}-${toKebabCase(String(value))}`;
}

export function joinClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

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

// export function generateUniqueClass(base: string, ...parts: (string | undefined | null)[]): string {
//   const filtered = parts.filter((part): part is string => typeof part === 'string').map(toKebabCase);
//   return `${base}__${filtered.join('-') || 'default'}`;
// }
