/**
 * Capitaliza la primera letra
 * Ej: "primary" => "Primary"
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Genera clases tipo Material UI:
 * - base-root
 * - base-keyValue (si value es string o number)
 * - base-key (si value es boolean true)
 */
export function generateMuiStyleClasses(base: string, props: Record<string, unknown>): string[] {
  const classes: string[] = [`${base}-root`];

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;

    if (typeof value === 'boolean') {
      classes.push(`${base}-${key}`);
    } else {
      classes.push(`${base}-${key}${capitalize(String(value))}`);
    }
  }

  return classes;
}
