import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  define: {
    global: 'window',
  },
});