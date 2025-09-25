import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // **เพิ่ม:** ตั้งค่า Proxy เพื่อส่งต่อคำขอ API ไปยังเซิร์ฟเวอร์ Backend
  server: {
    proxy: {
      // คำขอใดๆ ที่ขึ้นต้นด้วย /api จะถูกส่งต่อไปยัง http://localhost:5000
      '/api': {
        target: 'http://localhost:5001', // **สำคัญ:** แก้ไข Port ให้ตรงกับ Backend ของคุณ
        changeOrigin: true,
      },
    },
  },
})

