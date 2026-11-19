import { defineConfig } from 'vite';

// Khi build cho GitHub Pages, web nằm ở https://hoaiditest.github.io/nguyenhieu/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/nguyenhieu/' : '/',
  server: { port: 5173, strictPort: true },
}));
