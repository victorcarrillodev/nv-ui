// components.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    NvButton: (typeof import('./components/Button/NvButton.vue'))['default'];
  }
}

export {};
