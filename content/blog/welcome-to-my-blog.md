---
title: 欢迎来到我的博客
description: 这是我使用 Nuxt 3 + Nuxt Content 搭建的全新博客，支持 Markdown 写作、代码高亮、暗黑模式等功能。
date: 2026-01-19
tags: [博客, Nuxt, Vue]
---

# 欢迎来到我的博客

大家好！这是我的第一篇博客文章。我很高兴能够使用 **Nuxt 3** 和 **Nuxt Content** 搭建这个现代化的个人博客。

## 为什么选择 Nuxt？

Nuxt 是一个强大的 Vue.js 框架，它提供了：

- ⚡ **极快的开发体验** - 基于 Vite 的热更新
- 🎨 **灵活的渲染模式** - SSR、SSG、SPA 任你选择
- 📦 **丰富的生态系统** - 大量优质模块可供使用
- 🔍 **SEO 友好** - 静态生成对搜索引擎友好

## 博客功能特性

这个博客包含了以下功能：

1. **Markdown 写作** - 使用 Markdown 轻松创作内容
2. **代码高亮** - 支持多种编程语言的语法高亮
3. **暗黑模式** - 一键切换深色主题
4. **全文搜索** - 快速找到你想要的内容
5. **标签系统** - 按标签分类浏览文章
6. **响应式设计** - 完美适配各种设备

## 代码示例

这是一个简单的 Vue 3 组件示例：

\`\`\`vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('Hello Nuxt 3!')
const count = ref(0)
</script>
\`\`\`

JavaScript 代码示例：

\`\`\`javascript
// 计算斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(10)) // 输出: 55
\`\`\`

## 引用

> "优秀的代码是它自己最好的文档。当你要添加一个注释时，问问自己，'如何能改进这段代码，让它不需要注释？'" 
> 
> — Steve McConnell

## 待办事项

- [x] 搭建博客框架
- [x] 添加暗黑模式
- [x] 实现搜索功能
- [ ] 集成评论系统
- [ ] 添加 RSS 订阅
- [ ] 性能优化

## 总结

感谢你阅读这篇文章！如果你对这个博客感兴趣，欢迎查看源代码或者给我留言。

希望你在这里能找到有价值的内容！✨

