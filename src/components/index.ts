import type { App } from 'vue';
import NvButton from './Button/NvButton.vue';

// Puedes importar y registrar otros componentes aquí
const components = {
  NvButton,
};

export { NvButton };

export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};
