import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import includePaths from 'rollup-plugin-includepaths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      src: 'src',
    },
  },
  publicDir: './public',
  plugins: [react(), includePaths({ paths: ['./'] }), svgr()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
