import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/theme/composables/useTheme';

export const currentBreakpoint = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xs');

function getCurrentBreakpoint(width: number, breakpoints: ReturnType<typeof useTheme>['theme']['value']['breakpoints']) {
  const values = breakpoints.values;
  if (width >= values.xl) return 'xl';
  if (width >= values.lg) return 'lg';
  if (width >= values.md) return 'md';
  if (width >= values.sm) return 'sm';
  return 'xs';
}

export function useBreakpointListener() {
  const { theme } = useTheme();

  const update = () => {
    currentBreakpoint.value = getCurrentBreakpoint(window.innerWidth, theme.value.breakpoints);
  };

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });
}
