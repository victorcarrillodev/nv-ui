import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * Configuración principal de Vite para proyectos Vue
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core', // Si lo usas
      'lodash-es' // Para árbol sacudido
    ]
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          theme: ['@/theme']
        }
      }
    }
  },
  /**
   * Plugins utilizados en el proyecto
   * @property {Plugin} vue - Plugin oficial de Vue
   * @property {Plugin} vueDevTools - Integración con Vue DevTools
   */
  plugins: [
    vue(), // Plugin esencial para soporte de SFC (.vue)
    vueDevTools(), // Herramientas de desarrollo mejoradas
  ],

  /**
   * Configuración de resolución de módulos
   */
  resolve: {
    /**
     * Alias para importaciones
     * @property {string} '@' - Ruta corta para el directorio src/
     * @property {string} 'vue' - Resolución explícita del paquete ESM
     */
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Transforma URL a ruta de sistema de archivos
      'vue': 'vue/dist/vue.esm-bundler.js' // Usa versión ESM con características de compilación
    },
  },

  /**
   * Configuraciones adicionales recomendadas (opcionales):
   *
   * server: {
   *   port: 3000, // Puerto personalizado
   *   open: true // Abrir navegador automáticamente
   * },
   *
   * css: {
   *   preprocessorOptions: {
   *     scss: {
   *       additionalData: `@import "@/assets/styles/_variables.scss";`
   *     }
   *   }
   * },
   *
   * build: {
   *   outDir: 'dist',
   *   assetsDir: 'assets'
   * }
   */
})
