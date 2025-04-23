import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';

export const currentBreakpoint = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

// Detecta el breakpoint actual según el ancho de la ventana
function detectBreakpoint(): void {
  const theme = useTheme().theme.value;
  const width = window.innerWidth;
  const { values } = theme.breakpoints;

  if (width < values.sm) currentBreakpoint.value = 'xs';
  else if (width < values.md) currentBreakpoint.value = 'sm';
  else if (width < values.lg) currentBreakpoint.value = 'md';
  else if (width < values.xl) currentBreakpoint.value = 'lg';
  else currentBreakpoint.value = 'xl';
}

export function useBreakpointListener() {
  onMounted(() => {
    detectBreakpoint();
    window.addEventListener('resize', detectBreakpoint);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', detectBreakpoint);
  });
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Devuelve el valor correcto de la prop según el breakpoint actual
 */
export function resolveResponsiveProp<T>(prop: ResponsiveProp<T>): T | undefined {
  if (prop == null || typeof prop !== 'object') return prop;

  const order: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const index = order.indexOf(currentBreakpoint.value);

  for (let i = index; i >= 0; i--) {
    const key = order[i];
    if ((prop as Partial<Record<Breakpoint, T>>)[key] !== undefined) {
      return (prop as Partial<Record<Breakpoint, T>>)[key];
    }
  }

  return undefined;
}
