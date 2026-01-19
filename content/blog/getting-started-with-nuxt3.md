---
title: Nuxt 3 入门指南
description: 从零开始学习 Nuxt 3，了解其核心概念、项目结构和开发流程。
date: 2026-01-18
tags: [Nuxt, Vue, 教程]
---

# Nuxt 3 入门指南

Nuxt 3 是一个强大的全栈框架，基于 Vue 3 构建。本文将带你快速入门 Nuxt 3 开发。

## 什么是 Nuxt 3？

Nuxt 3 是 Nuxt 框架的最新版本，它带来了许多激动人心的新特性：

- 🚀 基于 Vue 3 和 Vite
- ⚡️ 更快的冷启动和热更新
- 📦 更小的打包体积
- 🎯 TypeScript 原生支持
- 🔥 新的 Composition API

## 安装和设置

### 使用 npx 创建项目

\`\`\`bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
\`\`\`

### 使用 yarn

\`\`\`bash
yarn create nuxt-app my-app
cd my-app
yarn install
yarn dev
\`\`\`

## 项目结构

Nuxt 3 的项目结构非常清晰：

\`\`\`
my-app/
├── .nuxt/          # 自动生成的构建文件
├── assets/         # 资源文件（CSS、图片等）
├── components/     # Vue 组件
├── composables/    # 组合式函数
├── content/        # Nuxt Content 内容
├── layouts/        # 布局组件
├── pages/          # 页面（自动生成路由）
├── plugins/        # 插件
├── public/         # 静态文件
├── server/         # 服务端代码
├── app.vue         # 根组件
└── nuxt.config.ts  # 配置文件
\`\`\`

## 核心概念

### 1. 页面和路由

Nuxt 3 会自动根据 `pages/` 目录结构生成路由：

\`\`\`typescript
// pages/index.vue
<template>
  <div>
    <h1>首页</h1>
  </div>
</template>
\`\`\`

### 2. 组件自动导入

在 `components/` 目录下的组件会自动导入：

\`\`\`vue
<template>
  <div>
    <!-- 无需导入，直接使用 -->
    <TheWelcome />
  </div>
</template>
\`\`\`

### 3. 数据获取

使用 `useAsyncData` 或 `useFetch` 获取数据：

\`\`\`typescript
const { data } = await useAsyncData('posts', () => 
  $fetch('/api/posts')
)
\`\`\`

### 4. 状态管理

使用 `useState` 实现跨组件状态共享：

\`\`\`typescript
// composables/useCounter.ts
export const useCounter = () => {
  return useState('counter', () => 0)
}

// 在组件中使用
const counter = useCounter()
\`\`\`

## 配置示例

基本的 `nuxt.config.ts` 配置：

\`\`\`typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],
  
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { name: 'description', content: 'My awesome Nuxt app' }
      ]
    }
  }
})
\`\`\`

## 部署

Nuxt 3 支持多种部署方式：

### 静态托管

\`\`\`bash
npm run generate
\`\`\`

生成的文件可以部署到：
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Node.js 服务器

\`\`\`bash
npm run build
node .output/server/index.mjs
\`\`\`

## 总结

Nuxt 3 提供了出色的开发体验和强大的功能。无论是构建静态网站还是全栈应用，Nuxt 3 都是一个很好的选择。

## 相关资源

- [Nuxt 3 官方文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Vue 3 文档](https://vuejs.org)

Happy coding! 🎉

