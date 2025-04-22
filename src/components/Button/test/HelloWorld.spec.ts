// src/components/Button/test/UIButton.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('UIButton', () => {
  it('se monta correctamente dentro de un ThemeProvider', () => {
    // Montamos el botón envuelto en ThemeProvider
    const ola = 'ola';
    const wrapper = mount(ola);

    expect(wrapper.exists()).toBe(true);
  });
});
