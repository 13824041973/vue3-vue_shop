import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    }
  },
  css: {
    // 配置全局样式
    preprocessorOptions: {
      scss: {
        // additionalData: `@import ${resolve(__dirname, './src/assets/style/index.scss')};`
        additionalData: `@import '@/assets/style/main.scss';`
      }
    },
  }
});
