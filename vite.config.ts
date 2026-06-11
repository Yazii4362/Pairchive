import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // Tailwind v4 의 @tailwindcss/vite 플러그인이 모든 CSS 처리를 담당하므로
    // PostCSS 가 필요 없습니다. 빈 객체를 지정해 Vite 가 상위 디렉토리의
    // postcss.config 를 자동 탐색하지 않도록 합니다.
    postcss: {},
  },
  server: {
    port: 5173,
    open: true,
  },
});
