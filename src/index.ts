import type { App } from "vue";
import NvButton from "./components/Button/NvButton.vue";

export default {
  install(app: App) {
    app.component("nv-button", NvButton);
  },
};

export { NvButton };
