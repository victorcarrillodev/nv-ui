import { ref } from 'vue';

const breakpointsOrder = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const currentBreakpoint = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

// Simulación simple de breakpoint actual (podés mejorarlo con resize observer)
if (typeof window !== 'undefined') {
  const match = () => {
    const width = window.visualViewport?.width ?? window.innerWidth;
    if (width < 600) return 'xs';
    if (width < 960) return 'sm';
    if (width < 1280) return 'md';
    if (width < 1920) return 'lg';
    return 'xl';
  };

  const update = () => {
    currentBreakpoint.value = match();
  };

  window.addEventListener('resize', update);
  update();
}

export function resolveResponsiveProp<T>(prop: T | Partial<Record<string, T>>): T {
  if (typeof prop !== 'object' || prop === null) return prop as T;

  const bp = currentBreakpoint.value;

  // Encuentra el mejor valor disponible desde el breakpoint actual hacia abajo
  const index = breakpointsOrder.indexOf(bp);
  for (let i = index; i >= 0; i--) {
    const key = breakpointsOrder[i];
    if (prop && typeof prop === 'object' && key in prop) {
      return (prop as Partial<Record<(typeof breakpointsOrder)[number], T>>)[key] as T;
    }
  }

  // Si no encuentra nada, intenta devolver el primero disponible
  return Object.values(prop)[0] as T;
}

import { onMounted, onUnmounted } from 'vue';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const getBreakpoint = (width: number): typeof currentBreakpoint.value => {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  return 'xl';
};

export function useBreakpointListener() {
  const handleResize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      currentBreakpoint.value = getBreakpoint(width);
    }
  };

  onMounted(() => {
    handleResize(); // inicializa
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
}
