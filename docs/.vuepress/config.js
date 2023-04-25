import { defineUserConfig, defaultTheme } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  ...defineUserConfig({
    lang: 'zh-CN',
    title: '你好， VuePress ！',
    description: '这是我的第一个 VuePress 站点',
  }),
  alias: {
    '@package': path.resolve(__dirname, '../package')
  },
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'package',
        link: '/package',
      },
    ],
    logo: 'https://vuejs.org/images/logo.png',

  }),
  plugins: [
    backToTopPlugin(),
  ]
}