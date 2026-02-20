import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Ini jalur rahasia kita ke Midtrans
      '/api/midtrans': {
        target: 'https://app.sandbox.midtrans.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/midtrans/, '')
      }
    }
  }
})