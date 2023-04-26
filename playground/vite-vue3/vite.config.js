import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import { visualizer } from 'rollup-plugin-visualizer'
import eslint from 'vite-plugin-eslint'
// import UnoCSS from 'unocss/vite'

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  assetsDir: 'static/code',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除console
        // drop_console: true,
        drop_debugger: true,
      },
    },
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    brotliSize: false, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    // 文件分包配置
    rollupOptions: {
      output: {
        manualChunks: {
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      // scss 全局变量注入
      scss: {
        charset: false,
        additionalData: '@import "./src/assets/css/common.scss";'
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve('src') },
      { find: '@package', replacement: resolve('../../docs/package/') },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.less'] // 需要忽略的文件后缀
  },
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: [
        'defaults',
        '> 1%',
        'last 2 versions',
        'not dead'
      ]
      // targets: ['defaults', 'not IE 11']
    }),
    /**
     * html 压缩、注入
     * @see https://github.com/vbenjs/vite-plugin-html
     */
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          title: 'vue3-title'
        }
      }
    }),
    /**
     * 自动补全 import
     * @see https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      imports: [
        'vuex',
        'vue',
        'vue-router',
      ],
      dts: false,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver()
      ]
    }),

    /**
     * 如果开启时，可以调试插件
     * @see https://github.com/antfu/vite-plugin-inspect
     */
    Inspect({
      enabled: false,
    }),
    eslint({
      cache: false
    }),
    // UnoCSS(),
    /**
     * 打包分析
     * @see https://github.com/btd/rollup-plugin-visualizer
     */
    visualizer({
      open: true,
      filename: './analysis/bundle-analysis.html',
      gzipSize: true,
      brotliSize: true
    }),
  ],
  server: {
    host: '0.0.0.0',
    // https: true,
    port: 8008,
    cors: true,
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hmr: {
      overlay: true
    }
  }
})
