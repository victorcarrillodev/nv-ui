import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type ButtonProps from './button';

// Cache para memoización (WeakMap no previene garbage collection)
const classCache = new WeakMap<ButtonProps, ComputedRef<string[]>>();

/**
 * Generates reactive CSS classes for a Button component with memoization
 * @param {ButtonProps} options - Configuration object for button styling
 * @returns {ComputedRef<string[]>} - Memoized computed ref with CSS classes
 *
 * @example
 * // Primera llamada: calcula y cachea
 * const classes = useButtonClasses({ variant: 'primary', disabled: true })
 *
 * // Llamadas posteriores con mismas options: retorna caché
 * const sameClasses = useButtonClasses({ variant: 'primary', disabled: true })
 */
export const useButtonClasses = (options: ButtonProps): ComputedRef<string[]> => {
  // Verificar caché primero
  const cached = classCache.get(options);
  if (cached) return cached;

  // Crear nuevo computed si no está en caché
  const classes = computed(() => {
    const classes = ['ui-button'];

    if (options.filled) classes.push('ui-button--filled');
    if (options.outlined) classes.push('ui-button--outlined');
    if (options.text) classes.push('ui-button--text');

    if (options.disabled) {
      classes.push('ui-button--disabled');
    }

    return classes;
  });

  // Almacenar en caché
  classCache.set(options, classes);

  return classes;
};

/**
 * Optimized class concatenation with memoization
 * @param {(string | Record<string, boolean>)[]} classes - Array of class definitions
 * @returns {string} - Space-separated class string
 */
export const classesToString = (classes: (string | Record<string, boolean>)[]): string => {
  // Cache simple para strings (útil en renders repetidos)
  const cacheKey = JSON.stringify(classes);
  if (classesToString.cache[cacheKey]) {
    return classesToString.cache[cacheKey];
  }

  const result = classes
    .flatMap((classDef) =>
      typeof classDef === 'string'
        ? classDef
        : Object.entries(classDef)
            .filter(([, val]) => val)
            .map(([key]) => key),
    )
    .join(' ');

  // Almacenar en caché (limitando tamaño)
  if (Object.keys(classesToString.cache).length < 100) {
    classesToString.cache[cacheKey] = result;
  }

  return result;
};

// Cache para classesToString (simple objeto)
classesToString.cache = Object.create(null);

// Tipado extendido para ButtonProps (recomendado)
type ButtonProps = {
  filled?: boolean;
  outlined?: boolean;
  text?: boolean;   disabled?: boolean;
  size?: 'sm' | 'md' | 'lg'; // <- Nueva prop opcional
};
