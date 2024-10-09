import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/xiao1/', // 确保这里的base与你的GitHub仓库名称一致
})
