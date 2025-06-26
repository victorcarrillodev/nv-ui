export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function convertKeysToKebabCase<T = unknown>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToKebabCase) as T;
  }

  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = toKebabCase(key);
      result[newKey] = value !== null && typeof value === 'object' ? convertKeysToKebabCase(value) : value;
    }
    return result as T;
  }

  return obj;
}
