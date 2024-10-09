import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
    outDir: 'dist', // 将构建输出设置为 'dist' 目录
  },
})
