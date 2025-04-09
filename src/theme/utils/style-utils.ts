/**
 * Convierte camelCase a kebab-case (ej: backgroundColor → background-color)
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convierte todas las claves de un objeto (y subobjetos) a kebab-case
 */
export function convertKeysToKebabCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = toKebabCase(key);
      acc[newKey] = typeof value === 'object' && !Array.isArray(value) ? convertKeysToKebabCase(value) : value;
      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, any>,
  );
}
