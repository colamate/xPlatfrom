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
})
