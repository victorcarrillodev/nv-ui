/**
 * Un valor de estilo puede ser un string plano o un objeto de estilos anidados (ej: &:hover)
 */
export type StyleValue = string | Record<string, string>;

/**
 * Representa un conjunto de estilos aplicables a un selector
 */
export type StyleObject = Record<string, StyleValue>;
