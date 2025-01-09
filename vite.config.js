import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 3001,
    }
  // server: { proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true, }, } },
})
