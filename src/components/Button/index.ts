import NvButtonVue from './NvButton.vue';
import type { ButtonProps } from './types';
import type { DefineComponent } from 'vue';

export const NvButton = NvButtonVue as DefineComponent<ButtonProps>;
export type { ButtonProps };
