import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/xiao1/', // 添加这行，确保资源路径正确
  server: {
    fs: {
      strict: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    charset: 'utf8',
  },
  build: {
    outDir: 'dist',
  },
})
