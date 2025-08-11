import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 5175
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'AyoPramukaComponent',
      fileName: (format) => `ayo-pramuka-component.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
