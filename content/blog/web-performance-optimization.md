---
title: Web 性能优化实战指南
description: 全面的 Web 性能优化指南，涵盖从资源加载到渲染优化的各个方面。
date: 2026-01-15
tags: [性能优化, 前端, Web]
---

# Web 性能优化实战指南

性能优化是前端开发中的重要话题。本文将分享一些实用的优化技巧和最佳实践。

## 为什么性能很重要？

性能直接影响用户体验和业务指标：

- 📊 **转化率** - 页面加载时间每增加 1 秒，转化率下降 7%
- 🚀 **用户体验** - 快速的页面带来更好的用户体验
- 🔍 **SEO** - Google 将页面速度作为排名因素
- 💰 **收入** - Amazon 发现页面加载慢 100ms 会导致收入下降 1%

## 性能指标

### Core Web Vitals

Google 的核心 Web 指标：

1. **LCP (Largest Contentful Paint)** - 最大内容绘制
   - 目标: < 2.5s
   
2. **FID (First Input Delay)** - 首次输入延迟
   - 目标: < 100ms
   
3. **CLS (Cumulative Layout Shift)** - 累积布局偏移
   - 目标: < 0.1

### 其他重要指标

- **FCP** - 首次内容绘制
- **TTI** - 可交互时间
- **TBT** - 总阻塞时间
- **Speed Index** - 速度指数

## 优化策略

### 1. 资源优化

#### 图片优化

\`\`\`html
<!-- 使用现代图片格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="描述">
</picture>

<!-- 懒加载 -->
<img src="image.jpg" loading="lazy" alt="描述">

<!-- 响应式图片 -->
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  src="medium.jpg"
  alt="描述"
>
\`\`\`

#### 代码分割

\`\`\`javascript
// 路由级别代码分割
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

// 组件级别懒加载
const HeavyComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)
\`\`\`

### 2. 加载优化

#### 预加载关键资源

\`\`\`html
<!-- 预加载字体 -->
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预连接到外部域 -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://cdn.example.com">
\`\`\`

#### 异步加载脚本

\`\`\`html
<!-- 异步加载 -->
<script src="script.js" async></script>

<!-- 延迟加载 -->
<script src="script.js" defer></script>
\`\`\`

### 3. 渲染优化

#### 虚拟滚动

处理大列表时使用虚拟滚动：

\`\`\`vue
<script setup>
import { useVirtualList } from '@vueuse/core'

const allItems = ref(Array.from({ length: 10000 }, (_, i) => i))

const { list, containerProps, wrapperProps } = useVirtualList(
  allItems,
  { itemHeight: 50 }
)
</script>

<template>
  <div v-bind="containerProps" style="height: 400px">
    <div v-bind="wrapperProps">
      <div v-for="{ data, index } in list" :key="index">
        Item {{ data }}
      </div>
    </div>
  </div>
</template>
\`\`\`

#### 避免布局抖动

\`\`\`javascript
// ❌ 坏的做法
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight // 读取
  elements[i].style.marginTop = height + 10 + 'px' // 写入
}

// ✅ 好的做法
const heights = elements.map(el => el.offsetHeight) // 批量读取
elements.forEach((el, i) => {
  el.style.marginTop = heights[i] + 10 + 'px' // 批量写入
})
\`\`\`

### 4. 网络优化

#### HTTP/2 和 HTTP/3

利用多路复用减少请求延迟：

- 使用 HTTP/2 Server Push
- 启用 Brotli 压缩
- 配置 CDN

#### 缓存策略

\`\`\`javascript
// Service Worker 缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
\`\`\`

### 5. JavaScript 优化

#### 使用 Web Workers

将耗时任务移到后台线程：

\`\`\`javascript
// worker.js
self.addEventListener('message', (e) => {
  const result = heavyComputation(e.data)
  self.postMessage(result)
})

// main.js
const worker = new Worker('worker.js')
worker.postMessage(data)
worker.onmessage = (e) => {
  console.log('Result:', e.data)
}
\`\`\`

#### 防抖和节流

\`\`\`javascript
// 防抖
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流
function throttle(fn, delay) {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last > delay) {
      fn.apply(this, args)
      last = now
    }
  }
}

// 使用
window.addEventListener('scroll', throttle(handleScroll, 100))
window.addEventListener('resize', debounce(handleResize, 300))
\`\`\`

## 监控和测试

### 性能测试工具

1. **Lighthouse** - Chrome 内置工具
2. **WebPageTest** - 详细的性能分析
3. **Chrome DevTools** - Performance 面板
4. **PageSpeed Insights** - Google 的在线工具

### 监控方案

使用 Performance API 收集真实用户数据：

\`\`\`javascript
// 监控 LCP
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime)
    // 发送到分析服务
  }
}).observe({ type: 'largest-contentful-paint', buffered: true })

// 监控 FID
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('FID:', entry.processingStart - entry.startTime)
  }
}).observe({ type: 'first-input', buffered: true })
\`\`\`

## 最佳实践清单

- ✅ 压缩和优化图片
- ✅ 使用 CDN 分发静态资源
- ✅ 启用 Gzip/Brotli 压缩
- ✅ 实现代码分割和懒加载
- ✅ 预加载关键资源
- ✅ 使用现代图片格式（WebP、AVIF）
- ✅ 减少第三方脚本
- ✅ 优化 CSS 和 JavaScript
- ✅ 实现有效的缓存策略
- ✅ 监控真实用户性能数据

## 工具推荐

- **Vite** - 极速的构建工具
- **esbuild** - 快速的 JavaScript 打包器
- **imagemin** - 图片压缩工具
- **PurgeCSS** - 移除未使用的 CSS
- **Terser** - JavaScript 压缩工具

## 总结

性能优化是一个持续的过程，需要：

1. 🎯 设定明确的性能目标
2. 📊 持续监控和测量
3. 🔧 逐步优化和改进
4. 🧪 A/B 测试验证效果

记住：**过早优化是万恶之源**，先确保代码正确，再考虑优化！

## 相关资源

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

Keep optimizing! ⚡️

