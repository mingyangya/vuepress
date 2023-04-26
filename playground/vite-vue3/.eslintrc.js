module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    './.eslintrc-auto-import.json',
    '@unocss'
  ],
  // parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: '@babel/eslint-parser',
    parser: '@babel/eslint-parser',
    "ecmaVersion": 2020,
    sourceType: 'module',
    // 配置 jsx
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [1, 'never'], // 末尾不允许分号
    'quotes': ['warn', 'single'], // 只允许单引号
    'space-in-parens': 1,
    'space-before-function-paren': 1,
    'comma-spacing': 1,
    'object-curly-spacing': 0,
    'no-unneeded-ternary': 0,
    'space-infix-ops': 1,
    'no-multiple-empty-lines': ['error', { // 最多允许一个空行
      'max': 1,
      'maxEOF': 1
    }],
    'no-unused-vars': [
      1,
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    'key-spacing': [
      1,
      {
        'beforeColon': false,
        'afterColon': true
      }
    ],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-trailing-spaces': 0,
    'no-control-regex': 0,
    'indent': 0,
    'vue/singleline-html-element-content-newline': 'off',
    "vue/no-template-shadow":"off", // 多个插槽使用一个值的时候
    'vue/max-attributes-per-line': ['warn', {// 标签上超过3个属性就要换行
      'singleline': {
        'max': 3
      },      
      'multiline': {
        'max': 1
      }
    }],
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'any',
        'normal': 'any',
        'component': 'any'
      },
      'svg': 'any',
      'math': 'any'
    }],
    /**
     * 标签属性的书写顺序
     * GLOBAL e.g. 'id'
     * UNIQUE e.g. 'ref', 'key'
     * SLOT e.g. 'v-slot', 'slot'.
     * LIST_RENDERING e.g. 'v-for item in items'
     * DEFINITION e.g. 'is', 'v-is'
     * RENDER_MODIFIERS e.g. 'v-once', 'v-pre'
     * TWO_WAY_BINDING e.g. 'v-model'
     * OTHER_DIRECTIVES e.g. 'v-custom-directive'
     * OTHER_ATTR e.g. 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
     * CONTENT e.g. 'v-text', 'v-html'
     * CONDITIONALS e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
     * EVENTS e.g. '@click="functionCall"', 'v-on="event"'
     */
    // "vue/attributes-order": ["warn", {
    //   "order": [
    //     "GLOBAL",
    //     ["UNIQUE", "SLOT"],
    //     "LIST_RENDERING",
    //     "DEFINITION",
    //     "RENDER_MODIFIERS",
    //     "TWO_WAY_BINDING",
    //     "OTHER_DIRECTIVES",
    //     "OTHER_ATTR",
    //     "CONTENT",
    //     "EVENTS",
    //     "CONDITIONALS"
    //   ],
    //   "alphabetical": false
    // }],
    "vue/attributes-order": "off",

    // 关闭组件 name 参数的命名规则，允许大驼峰或者 "-" 分割
    "vue/component-definition-name-casing": 'off',
    'vue/attribute-hyphenation': 'off',
    // 花括号内不对收尾空格进行验证
    "vue/mustache-interpolation-spacing": 'off',
    'vue/no-v-html': 'off',
    // 关闭 v-slot:xxx 和 #xxx 的格式验证
    "vue/v-slot-style": 'off',
    'no-async-promise-executor': 'off',
    'no-misleading-character-class': 'off',
    'no-useless-catch': 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineExpose: 'readonly',
    defineEmits: 'readonly'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true
      }
    }
  ]
}