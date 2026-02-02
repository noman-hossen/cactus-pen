import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import favicon from 'vite-plugin-favicon'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    {
      ...favicon({
        source: fileURLToPath(new URL('src/assets/logo.png', import.meta.url)),
        appName: 'Cactus-pen',
      }),
      apply: 'build'
    }
  ],
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