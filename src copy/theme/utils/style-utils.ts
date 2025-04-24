/**
 * Convierte camelCase a kebab-case (ej: backgroundColor → background-color)
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convierte todas las claves de un objeto (y subobjetos) a kebab-case.
 * No modifica arrays ni valores primitivos.
 */
export function convertKeysToKebabCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToKebabCase);
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).reduce<Record<string, unknown>>((acc, [key, value]) => {
      const newKey = toKebabCase(key);
      acc[newKey] = value !== null && typeof value === 'object' ? convertKeysToKebabCase(value) : value;
      return acc;
    }, {});
  }

  return obj;
}
