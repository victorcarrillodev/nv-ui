import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Lista de breakpoints ordenados de menor a mayor
 */
export const breakpointsOrder = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof breakpointsOrder)[number];

/**
 * Valor reactivo compartido para el breakpoint actual
 */
export const currentBreakpoint = ref<Breakpoint>('md');

/**
 * Anchos de corte por breakpoint
 */
const BREAKPOINT_WIDTHS: Record<Breakpoint, number> = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
  xl: Infinity,
};

/**
 * Determina el breakpoint actual basado en el ancho
 */
export function getCurrentBreakpoint(width: number): Breakpoint {
  for (const bp of breakpointsOrder) {
    if (width < BREAKPOINT_WIDTHS[bp]) {
      return bp;
    }
  }
  return 'xl';
}

/**
 * Composable para escuchar cambios de tamaño de ventana
 * y actualizar automáticamente `currentBreakpoint`
 */
export function useBreakpointListener(): void {
  const update = () => {
    currentBreakpoint.value = getCurrentBreakpoint(window.innerWidth);
  };

  if (typeof window !== 'undefined') {
    update(); // ✅ Ejecutar inmediatamente para tener el valor correcto

    onMounted(() => {
      window.addEventListener('resize', update);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', update);
    });
  }
}

/**
 * Dado un valor responsivo (ej: { sm: 10, md: 12 }),
 * selecciona el apropiado según el breakpoint actual.
 */
export function resolveResponsiveProp<T>(prop: T | Partial<Record<Breakpoint, T>>): T {
  if (typeof prop !== 'object' || prop === null) {
    return prop as T;
  }

  const bp = currentBreakpoint.value;
  const bpIndex = breakpointsOrder.indexOf(bp);

  for (let i = bpIndex; i >= 0; i--) {
    const key = breakpointsOrder[i];
    if ((prop as Partial<Record<Breakpoint, T>>)[key] !== undefined) {
      if (key in prop) {
        return (prop as Partial<Record<Breakpoint, T>>)[key] as T;
      }
    }
  }

  // Fallback si ningún breakpoint coincide
  return Object.values(prop)[0] as T;
}
