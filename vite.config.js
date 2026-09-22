import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app/src/main/assets/web',
  build: {
    outDir: '../../../../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
});
