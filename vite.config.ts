// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
// import dts from 'vite-plugin-dts'

// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//     dts({
//       outDir: 'dist',
//       tsconfigPath: './tsconfig.json',
//       insertTypesEntry: true,
//       copyDtsFiles: true,
//       rollupTypes: true,
//       cleanVueFileName: true
//     })
//   ],
//   build: {
//     lib: {
//       entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
//       name: 'NvUI',
//       formats: ['es', 'cjs'],
//       fileName: (format) => `index.${format}.js`
//     },
//     rollupOptions: {
//       external: ['vue'],
//       output: {
//         globals: {
//           vue: 'Vue'
//         }
//       }
//     },
//     cssCodeSplit: true
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       vue: 'vue/dist/vue.esm-bundler.js'
//     }
//   }
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      outDir: 'dist/types'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueUI',
      fileName: (format) => `vue-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})
