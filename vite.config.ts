import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // Improve build performance
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core libraries - rarely change, cached separately
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // React Query - data fetching library
          'query-vendor': ['@tanstack/react-query'],
          // UI components library (if any icon libraries are added later)
          // This keeps vendor code separate from app code
        }
      }
    },
    // Generate source maps for production debugging (optional)
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Reduce CSS bloat
    cssCodeSplit: true,
    // Improve asset optimization
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
  }
})
