// src/theme/constants/theme-keys.ts

import type { InjectionKey } from 'vue';
import type { ThemeContext } from '@/theme/types/theme-provider';

/**
 * Key para inyectar y consumir el contexto del tema en el componente.
 * Usado con provide/inject.
 */
export const ThemeInjectionKey: InjectionKey<ThemeContext> = Symbol('ThemeContext');
