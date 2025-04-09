// src/theme/constants/theme-keys.ts

import type { InjectionKey } from 'vue';
import type { ThemeContext } from '../types/theme-provider';

/**
 * Clave de inyección del contexto del tema.
 * Se usa para proveer e inyectar el tema globalmente en la app.
 */
export const ThemeSymbol: InjectionKey<ThemeContext> = Symbol('theme');
