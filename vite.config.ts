import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@common': path.resolve(__dirname, 'src/common'),
        '@widget': path.resolve(__dirname, 'src/widget'),
        '@pages': path.resolve(__dirname, 'src/pages')
    },
  },
  server: {
    port: 3000, // 本地开发环境端口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:18080',
        changeOrigin: true
      }
    }
  }
})