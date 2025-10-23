import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: { plugins: ['@emotion/babel-plugin'] },
      }),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      port: 5173, // 개발 서버 포트
    },
  };
});
