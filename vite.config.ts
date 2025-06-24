import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      // Elimina 'entryRoot' si no es necesario dividir por carpetas internas
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      insertTypesEntry: true, // Agrega "types": "./dist/index.d.ts" automáticamente si falta
      copyDtsFiles: true // Copia todos los archivos .d.ts necesarios
    })
  ],

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'NvUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
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
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
