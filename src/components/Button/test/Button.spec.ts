import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NvButton from '../NvButton.vue';
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { h } from 'vue';

describe('ThemeProvider', () => {
  it('render el button', () => {
    const wrapper = mount(ThemeProvider, {
      slots: {
        default: () => h(NvButton, null, 'hola'),
      },
    });
    const button = wrapper.findComponent(NvButton);
    expect(button.text()).toContain('hola');
  });
});
