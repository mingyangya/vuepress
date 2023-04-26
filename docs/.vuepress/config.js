import path from 'path'
import fs from 'fs'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default {
  ...defineUserConfig({
    lang: 'zh-CN',
    title: '你好， VuePress ！',
    description: '这是我的第一个 VuePress 站点',
  }),
  alias: {
    '@package': path.resolve(__dirname, '../package')
  },
  templateDev:  path.resolve(__dirname, './template/dev.html'),
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