import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UIButton from '../UIButton.vue';
import ThemeProvider from '@/theme/providers/ThemeProvider.vue';
import { h } from 'vue';

describe('ThemeProvider', () => {
  it('render el button', () => {
    const wrapper = mount(ThemeProvider, {
      slots: {
        default: () => h(UIButton, null, 'hola'),
      },
    });
    const button = wrapper.findComponent(UIButton);
    expect(button.text()).toContain('hola');
  });
});
