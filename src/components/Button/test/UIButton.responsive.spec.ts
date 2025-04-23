// <reference types="vitest" />
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { currentBreakpoint } from '@/theme/utils/responsive';
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import UIButton from '../UIButton.vue';
import { h } from 'vue';

// 🔧 Utilidad para montar el componente dentro del ThemeProvider
function mountWithTheme(props: Record<string, unknown> = {}) {
  return mount(ThemeProvider, {
    slots: {
      default: () =>
        h(UIButton, {
          ...props,
        }),
    },
  });
}

describe('UIButton - responsive props', () => {
  beforeEach(() => {
    // 🔄 Reseteamos el breakpoint antes de cada test
    currentBreakpoint.value = 'md';
  });

  it('aplica color de acuerdo al breakpoint md', () => {
    const wrapper = mountWithTheme({
      color: {
        xs: 'error',
        md: 'success',
        xl: 'primary',
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.classes().some((c) => c.includes('success'))).toBe(true); // Clase `NvButton__color-success` o similar
  });

  it('cambia estilo cuando el breakpoint cambia', async () => {
    const wrapper = mountWithTheme({
      color: {
        xs: 'error',
        md: 'success',
        xl: 'primary',
      },
    });

    currentBreakpoint.value = 'xs';
    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    expect(button.classes().some((c) => c.includes('error'))).toBe(true);
  });
});
