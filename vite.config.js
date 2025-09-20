// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // for React projects
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // your React plugin
    tailwindcss(),  // Tailwind Vite plugin
  ],
})
