// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],

  // Content 模块配置
  content: {
    highlight: {
      // 代码高亮主题
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      // 预加载语言
      preload: [
        'javascript',
        'typescript',
        'vue',
        'vue-html',
        'bash',
        'shell',
        'python',
        'json',
        'css',
        'scss',
        'html',
        'markdown',
        'yaml',
        'sql',
        'dockerfile'
      ]
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // 暗黑模式配置
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  // 图片优化配置
  image: {
    quality: 80,
    format: ['webp']
  },

  // 应用配置
  app: {
    // GitHub Pages 部署配置
    // 如果仓库名不是 username.github.io，需要设置 baseURL
    // 例如：仓库名为 my-blog，则 baseURL 为 '/my-blog/'
    baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL || '/' : '/',
    
    head: {
      title: 'Salween Blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于 Nuxt 3 的现代化个人博客' },
        { name: 'keywords', content: 'blog, nuxt, vue, 博客' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // 添加代码字体
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // 静态生成配置
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/'],
      crawlLinks: true
    }
  },

  // 构建配置
  experimental: {
    payloadExtraction: false
  },

  // CSS 配置
  css: ['~/assets/css/main.css']
})

