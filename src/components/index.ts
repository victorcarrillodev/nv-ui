export { default as NvButton } from './Button/NvButton.vue';
import NvButton from './Button/NvButton.vue';
// ...otros componentes

// Plugin de instalación global
import type { App } from 'vue';

const components = {
  NvButton,
  // ...otros componentes
};

export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};
