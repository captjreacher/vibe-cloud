// vite.client.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
   base: '/',  // ✅ important for freeautoagents.com root
  plugins: [
    react(), 
    svgr()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
        shared: fileURLToPath(new URL('./src/shared', import.meta.url)), // <-- important
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Compatible with both rolldown and standard vite
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) return 'vendor-react';
            if (id.includes('monaco-editor')) return 'vendor-monaco';
            return 'vendor';
          }
        },
      },
    },
  },
});

