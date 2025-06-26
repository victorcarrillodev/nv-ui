import type { App } from 'vue';
import { NvButton } from './Button';

export { NvButton };

export default {
  install(app: App) {
    app.component('NvButton', NvButton);
  },
};
