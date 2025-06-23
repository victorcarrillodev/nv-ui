import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

/**
 * Configuración de Vite para empaquetar una librería Vue 3
 */
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json'
    })
  ],

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'NvUI',
      formats: ['es', 'umd'],
      fileName: (format) => `nv-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: true
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
