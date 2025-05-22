import { computed } from 'vue';
import { currentBreakpoint, breakpointsOrder } from '@/utils/responsive';
import type { Breakpoint } from '@/utils/responsive';

/**
 * Dado un prop que puede ser responsivo (ej. { sm: 1, md: 2 }),
 * retorna el valor correspondiente al breakpoint actual.
 */
export function useResponsiveProp<T>(prop: T | Partial<Record<Breakpoint, T>>) {
  return computed(() => {
    if (typeof prop !== 'object' || prop === null) {
      return prop;
    }

    const bp = currentBreakpoint.value;
    const bpIndex = breakpointsOrder.indexOf(bp);

    for (let i = bpIndex; i >= 0; i--) {
      const key = breakpointsOrder[i];
      if ((prop as Partial<Record<Breakpoint, T>>)[key] !== undefined) {
        return (prop as Partial<Record<Breakpoint, T>>)[key] as T;
      }
    }

    return Object.values(prop)[0] as T;
  });
}
