# Salween Blog

基于 Nuxt 3 + Nuxt Content 构建的现代化个人博客。

## ✨ 特性

- 🚀 **Nuxt 3** - 基于 Vue 3 的强大框架
- 📝 **Nuxt Content** - 使用 Markdown 编写内容
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🌙 **暗黑模式** - 支持亮色/暗色主题切换
- 🔍 **全文搜索** - 快速搜索文章内容
- 🏷️ **标签系统** - 按标签分类浏览文章
- 📱 **响应式设计** - 完美适配各种设备
- ⚡️ **静态生成** - 快速加载，SEO 友好
- 💬 **Giscus 评论** - 基于 GitHub Discussions 的评论系统
- 📊 **阅读时间** - 自动计算文章阅读时间
- 👀 **浏览量统计** - 文章浏览量追踪
- 💻 **代码高亮增强** - Shiki 驱动，支持 15+ 语言，一键复制代码

## 🛠️ 技术栈

- [Nuxt 3](https://nuxt.com) - Vue.js 框架
- [Nuxt Content](https://content.nuxt.com) - 内容管理
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [Nuxt Icon](https://nuxt.com/modules/icon) - 图标系统
- [VueUse](https://vueuse.org) - 实用工具库
- [TypeScript](https://www.typescriptlang.org) - 类型安全

## 📦 安装

\`\`\`bash
# 克隆项目
git clone <your-repo-url>
cd SalweenBlog

# 安装依赖（使用 yarn）
yarn install

# 或使用 npm
npm install
\`\`\`

## 🚀 开发

\`\`\`bash
# 启动开发服务器
yarn dev

# 访问 http://localhost:3000
\`\`\`

## 📝 写作

在 `content/blog/` 目录下创建 Markdown 文件：

\`\`\`markdown
---
title: 文章标题
description: 文章描述
date: 2026-01-19
tags: [标签1, 标签2]
cover: /images/cover.jpg  # 可选
---

# 文章标题

你的文章内容...
\`\`\`

## 🎨 自定义

### 配置博客信息

编辑 `nuxt.config.ts` 修改站点信息：

\`\`\`typescript
app: {
  head: {
    title: '你的博客名称',
    meta: [
      { name: 'description', content: '博客描述' }
    ]
  }
}
\`\`\`

### 配置 Giscus 评论

1. 访问 [giscus.app](https://giscus.app/zh-CN)
2. 按照指引配置你的 GitHub 仓库
3. 获取配置参数
4. 编辑 `components/CommentSection.vue` 填入配置信息

### 自定义主题颜色

编辑 `tailwind.config.ts` 修改主题颜色：

\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: {
        // 你的颜色配置
      }
    }
  }
}
\`\`\`

## 📤 部署

### 静态生成

\`\`\`bash
# 生成静态文件
yarn generate

# 预览生成的站点
yarn preview
\`\`\`

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动检测 Nuxt 配置并部署

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 [Netlify](https://netlify.com) 导入项目
3. 构建命令：`yarn generate`
4. 发布目录：`.output/public`

### 部署到 GitHub Pages

\`\`\`bash
# 生成静态文件
yarn generate

# 部署到 GitHub Pages
# 使用 gh-pages 或直接推送到 gh-pages 分支
\`\`\`

## 📁 项目结构

\`\`\`
SalweenBlog/
├── assets/          # 样式、字体等资源
├── components/      # Vue 组件
├── composables/     # 组合式函数
├── content/         # Markdown 内容
│   └── blog/       # 博客文章
├── layouts/         # 布局组件
├── pages/           # 页面路由
├── public/          # 静态文件
├── server/          # 服务端代码
│   └── api/        # API 路由
├── app.vue          # 根组件
├── nuxt.config.ts   # Nuxt 配置
└── tailwind.config.ts  # Tailwind 配置
\`\`\`

## 🎯 待办事项

- [x] 基础框架搭建
- [x] 文章系统
- [x] 搜索功能
- [x] 标签系统
- [x] 暗黑模式
- [x] 代码块优化（语法高亮、复制功能、美化样式）
- [ ] RSS 订阅
- [ ] sitemap 生成
- [ ] 站点统计（Google Analytics）
- [ ] 性能优化

## 📖 相关文档

- [GUIDE.md](./GUIDE.md) - 详细使用指南
- [CODE_BLOCK_GUIDE.md](./CODE_BLOCK_GUIDE.md) - 代码块使用说明

## 🚀 GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署！

**快速开始：** 查看 [QUICK_START.md](./QUICK_START.md)

**完整文档：** 查看 [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md)

**检查清单：** 查看 [.github/CHECKLIST.md](./.github/CHECKLIST.md)

## 📄 License

MIT License

## 🙏 致谢

感谢以下开源项目：

- [Nuxt](https://nuxt.com)
- [Vue.js](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Giscus](https://giscus.app)

---

Made with ❤️ by Salween
\`\`\`
