import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    },
    server: {
        proxy: {
            '/user': { //获取路径中包含了/api的请求
                target: 'http://localhost:8003', //后台服务所在的源
                changeOrigin: true, //修改源
                rewrite: (path) => path.replace(/^\/user/, '') ///api替换为''
            },
            '/admin': { //获取路径中包含了/api的请求
                target: 'http://localhost:8005', //后台服务所在的源
                changeOrigin: true, //修改源
                rewrite: (path) => path.replace(/^\/admin/, '') ///api替换为''
            },
            '/evaluation': { //获取路径中包含了/api的请求
                target: 'http://localhost:8004', //后台服务所在的源
                changeOrigin: true, //修改源
                rewrite: (path) => path.replace(/^\/evaluation/, '') ///api替换为''
            }
        }
    }
})