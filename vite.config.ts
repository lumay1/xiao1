import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/xiao1/', // 确保这与您的 GitHub 仓库名称匹配
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
