// src/theme/constants/theme-keys.ts
import type { ThemeContext } from '@/theme/types/theme-provider';
import type { InjectionKey } from 'vue';

export const ThemeSymbol: InjectionKey<ThemeContext> = Symbol('Theme');
