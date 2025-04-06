import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    headers: {
      "Content-Security-Policy": 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.googleapis.com; " +
        "script-src-elem 'self' https://apis.google.com https://accounts.google.com https://www.googleapis.com; " +
        "frame-src 'self' https://accounts.google.com; " +
        "connect-src 'self' https://www.googleapis.com;",
    },
  },
});
