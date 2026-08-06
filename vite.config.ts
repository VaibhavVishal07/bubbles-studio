import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project site from /bubbles-studio/, but the dev
// server serves from the root — so only apply the base on build.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/bubbles-studio/' : '/',
  plugins: [react(), tailwindcss()],
}))
