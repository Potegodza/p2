import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['antd', 'framer-motion'],
          utils: ['axios', 'lodash', 'moment']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0'
  }
})