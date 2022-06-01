/* eslint-disable global-require */
// vite.config.json
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';

const { resolve } = require('path');

export const isDev = process.env.NODE_ENV !== 'production';

const r = (path) => resolve(__dirname, path);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: r('src/options'),
    build: {
      chunkSizeWarningLimit: 800,
      outDir: r('web'),
      emptyOutDir: true,
      // sourcemap: 'inline',
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      rollupOptions: {
        input: {
          super: r('src/options/index.html'),
        },
      },
    },
    plugins: [reactRefresh(), macrosPlugin()],
    define: {
      'process.platform': JSON.stringify('win32'),
      'process.env': {
      },
    },
  };
});
