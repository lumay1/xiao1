import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/xiao1/',
     build: {
       outDir: 'dist',
     },
   })
