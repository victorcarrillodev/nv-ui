import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '../useTheme';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

export function useResponsiveProp<T>(prop: ResponsiveProp<T>) {
  const theme = useTheme();
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

  const updateWidth = () => (width.value = window.innerWidth);

  onMounted(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  const currentValue = computed(() => {
    if (typeof prop !== 'object') return prop;

    const sorted = Object.entries(theme.theme.value.breakpoints).sort(([, a], [, b]) => (b as number) - (a as number)) as [
      Breakpoint,
      number,
    ][];

    for (const [bp, px] of sorted) {
      if (width.value >= px && typeof prop === 'object' && prop !== null && bp in prop) {
        return (prop as Partial<Record<Breakpoint, T>>)[bp];
      }
    }

    return typeof prop === 'object' && prop !== null ? Object.values(prop)[0] : prop; // fallback
  });

  return currentValue;
}
