import { describe, it, expect } from 'vitest';
import { buildClass, joinClasses } from '../class-utils';

describe('buildClass', () => {
  it('debe construir una clase con valor string', () => {
    const result = buildClass('NvButton', 'variant', 'filled');
    expect(result).toBe('NvButton__variant-filled');
  });

  it('debe construir una clase con valor booleano', () => {
    const result = buildClass('NvButton', 'disabled', true);
    expect(result).toBe('NvButton__disabled');
  });

  it('debe retornar string vacía si no hay valor', () => {
    const result = buildClass('NvButton', 'variant', undefined);
    expect(result).toBe('');
  });

  it('debe retornar string vacía si el valor es false', () => {
    const result = buildClass('NvButton', 'disabled', false);
    expect(result).toBe('');
  });
});

describe('joinClasses', () => {
  it('debe juntar múltiples clases válidas', () => {
    const result = joinClasses('btn', 'primary', 'rounded');
    expect(result).toBe('btn primary rounded');
  });

  it('debe ignorar clases falsy (false, null, undefined)', () => {
    const result = joinClasses('btn', false, null, undefined, 'active');
    expect(result).toBe('btn active');
  });

  it('debe retornar string vacía si no hay clases válidas', () => {
    const result = joinClasses(false, null, undefined, '');
    expect(result).toBe('');
  });
});
