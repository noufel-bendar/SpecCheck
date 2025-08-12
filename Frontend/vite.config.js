import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< Current (Your changes)
=======
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/',
>>>>>>> Incoming (Background Agent changes)
})
