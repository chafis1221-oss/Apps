import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic' // Pastikan pakai new JSX transform
    })
  ],
  build: {
    sourcemap: true // Untuk debug lebih mudah
  }
})
