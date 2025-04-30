/**
 * Converts a string on camelCase to kebab-case.
 * Example: "backgroundColor" -> "background-color"
 */

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase/number and uppercase.
    .replace(/[\s_]+/g, '-') // Converts spaces and underscores to hyphens.
    .toLowerCase();
}

/**
 * Converts all object's keys (and sub objects) to kebab-case.
 * Doesn't transform arrays or primitive values
 *
 * @param obj Object that can have keys in camelCase
 * @returns New object with keys in kebab-case
 */

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
