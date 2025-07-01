// useRipple.ts
import { ref } from 'vue';

export interface RippleOptions {
  disabled: boolean;
  disableRipple: boolean;
  duration: number;
  color: string;
  opacity: number;
}

export interface RippleData {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function useRipple(options: RippleOptions) {
  const ripples = ref<RippleData[]>([]);
  let nextId = 0;

  const createRipple = (event: MouseEvent) => {
    if (options.disabled || options.disableRipple) return;

    const el = event.currentTarget as HTMLElement;
    const diameter = Math.max(el.clientWidth, el.clientHeight);
    const radius = diameter / 2;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;
    const id = nextId++;

    ripples.value.push({ id, x, y, size: diameter });

    setTimeout(() => {
      ripples.value = ripples.value.filter((r) => r.id !== id);
    }, options.duration);
  };

  const rippleStyle = (r: RippleData) => ({
    '--ripple-x': `${r.x}px`,
    '--ripple-y': `${r.y}px`,
    '--ripple-size': `${r.size}px`,
    '--ripple-color': options.color,
    '--ripple-duration': `${options.duration}ms`,
  });

  return {
    ripples,
    createRipple,
    rippleStyle,
  };
}
