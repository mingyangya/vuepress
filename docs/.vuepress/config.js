import path from 'path'
import fs from 'fs'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

// import devHTml from '@vuepress/client/templates/dev.html'

const getTemplateDev = () => {
  const data = fs.readFileSync(path.resolve(__dirname, '../../node_modules/@vuepress/client/templates/dev.html'), 'utf-8')

  const hmtlStringList = data.split('</body>')

  console.log(hmtlStringList[1])
  const config = {
      rules: [
        // custom rules...
      ],
      presets: [
        // custom presets...
      ],
      // ...
  }

  const scriptHtml = '<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>'

  const html = `${hmtlStringList[0]}${scriptHtml}<script>window.__unocss = ${JSON.stringify(config)}}</script></body>${hmtlStringList[1]}`
  console.log(data)

  // return html

  return data
}


const templateDev = getTemplateDev()

console.log(templateDev)

export default {
  ...defineUserConfig({
    lang: 'zh-CN',
    title: '你好， VuePress ！',
    description: '这是我的第一个 VuePress 站点',
  }),
  alias: {
    '@package': path.resolve(__dirname, '../package')
  },
  // templateDev: devHTml,
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