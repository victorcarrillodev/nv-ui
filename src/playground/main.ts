//TODO Revisar que hace esto después
// import { createApp } from 'vue';
// import App from './App.vue';

// // Importa tu framework UI desde index.ts
// import * as NvUI from './index';

// // App solo para desarrollo o pruebas
// const app = createApp(App);

// // Opcional: usar componentes globales durante desarrollo
// Object.entries(NvUI).forEach(([name, comp]) => {
//   if (comp && typeof comp === 'object' && 'name' in comp) {
//     app.component(name, comp as { name: string });
//   }
// });

// app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
