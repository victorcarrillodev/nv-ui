// import type { App } from 'vue';

// import { NvButton } from './components';

// // Exportar componentes individualmente
// export { NvButton };

// // Exportar composables u otros módulos a exponer
// export * from './theme/composables/useDynamicStyles';

// //plugin para uso global
// const install = (app: App): void => {
//   app.component('NvButton', NvButton);
// };

// export default { install };
// //? Esto también funciona
// // export default {
// //   install(app: App) {
// //     app.component('NvButton', NvButton);
// //   },
// // };

import type { App, Component } from 'vue';
import { NvButton, CssBaseline } from './components';

const components: Record<string, Component> = {
  NvButton,
  CssBaseline,
};

const install = (app: App): void => {
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
  }
};

export { NvButton, CssBaseline };
export default { install };
