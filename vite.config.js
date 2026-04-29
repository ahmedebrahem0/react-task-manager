import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor';
          }

          if (
            id.includes('@reduxjs/toolkit')
            || id.includes('react-redux')
            || id.includes('reselect')
          ) {
            return 'redux-vendor';
          }

          if (
            id.includes('lucide-react')
            || id.includes('framer-motion')
          ) {
            return 'ui-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
})
