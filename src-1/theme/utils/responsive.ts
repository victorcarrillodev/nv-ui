// src/theme/utils/responsive.ts
import { ref } from 'vue';

export const currentBreakpoint = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

const breakpointsOrder = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

function getCurrentBreakpoint(width: number): (typeof breakpointsOrder)[number] {
  if (width < 600) return 'xs';
  if (width < 960) return 'sm';
  if (width < 1280) return 'md';
  if (width < 1920) return 'lg';
  return 'xl';
}

// Detecta y actualiza el breakpoint actual
export function useBreakpointListener() {
  const update = () => {
    currentBreakpoint.value = getCurrentBreakpoint(window.innerWidth);
  };

  if (typeof window !== 'undefined') {
    update(); // 👈 Ejecutar inmediatamente
    window.addEventListener('resize', update);
  }
}

// Interpreta una prop responsiva
export function resolveResponsiveProp<T>(prop: T | Partial<Record<string, T>>): T {
  if (typeof prop !== 'object' || prop === null) return prop as T;

  const bp = currentBreakpoint.value;
  const index = breakpointsOrder.indexOf(bp);
  for (let i = index; i >= 0; i--) {
    const key = breakpointsOrder[i];
    if (prop && key in prop) {
      return (prop as Record<string, T>)[key];
    }
  }

  return Object.values(prop)[0] as T;
}
