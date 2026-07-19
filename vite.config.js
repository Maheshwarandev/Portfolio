import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('pdfjs-dist')) {
            return 'pdfjs-dist';
          }
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('lucide-react')) {
            return 'lucide-react';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
