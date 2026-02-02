import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import favicon from 'vite-plugin-favicon'

export default defineConfig({
  plugins: [vue(), favicon({
      source: 'src/assets/logo.png', // Source image for generation
      appName: 'Cactus-pen',
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true
  }
})