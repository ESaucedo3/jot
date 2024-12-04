import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/jot/',
  build: {
    sourcemap: false,
  },
  server: {
    port: 8080,
  },
});
