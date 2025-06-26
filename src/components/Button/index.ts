import type { DefineComponent } from 'vue';
import type { ButtonProps } from './types';
import NvButtonVue from './NvButton.vue';

export const NvButton = NvButtonVue as DefineComponent<ButtonProps>;
export type { ButtonProps };
