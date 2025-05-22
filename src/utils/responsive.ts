import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Breakpoints en orden creciente
 */
export const breakpointsOrder = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof breakpointsOrder)[number];

const BREAKPOINT_WIDTHS: Record<Breakpoint, number> = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
  xl: Infinity,
};

/**
 * Estado reactivo global
 */
export const currentBreakpoint = ref<Breakpoint>('md');

function getCurrentBreakpoint(width: number): Breakpoint {
  for (const bp of breakpointsOrder) {
    if (width < BREAKPOINT_WIDTHS[bp]) return bp;
  }
  return 'xl';
}

/**
 * Usar dentro de setup() de un componente para activar la reactividad real
 */
export function useBreakpointListener(): void {
  if (typeof window === 'undefined') return;

  const update = () => {
    currentBreakpoint.value = getCurrentBreakpoint(window.innerWidth);
  };

  onMounted(() => {
    window.addEventListener('resize', update);
    update(); // Ejecuta inmediatamente
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update);
  });
}
