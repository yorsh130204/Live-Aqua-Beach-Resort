import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        restaurant: resolve(__dirname, 'restaurant/index.html'),
        reservations: resolve(__dirname, 'reservations/index.html'),
      },
    },
  },
});
