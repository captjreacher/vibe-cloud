// vite.client.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
   base: '/',  // ✅ important for freeautoagents.com root
  plugins: [
    react(), 
    svgr(),
    // Add .nojekyll and 404.html for GitHub Pages
    {
      name: 'github-pages-setup',
      writeBundle() {
        const fs = require('fs');
        const path = require('path');
        const outDir = 'dist/client';
        
        // Create .nojekyll file
        fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
        
        // Create CNAME file for custom domain
        fs.writeFileSync(path.join(outDir, 'CNAME'), 'freeautoagents.com');
        
        // Copy index.html to 404.html for client-side routing
        const indexPath = path.join(outDir, 'index.html');
        const notFoundPath = path.join(outDir, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      }
    }
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
        // Rolldown requires a FUNCTION here
        manualChunks(id) {
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

