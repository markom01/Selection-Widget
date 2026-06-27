import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('@mui/') || id.includes('@emotion/')) return 'mui'
          if (id.includes('node_modules/react') || id.includes('node_modules/zustand') || id.includes('node_modules/react-window')) return 'vendor'
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['e2e/**', 'node_modules/**'],
    server: {
      deps: {
        inline: ['react-window'],
      },
    },
  },
})
