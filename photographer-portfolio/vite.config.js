import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: use your exact repo name here
  base: '/photographer-portfolio1/', 
})
