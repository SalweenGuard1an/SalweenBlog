<template>
  <div class="max-w-3xl mx-auto">
    <div class="card p-8 md:p-12">
      <!-- Profile Section -->
      <div class="text-center mb-12">
        <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center">
          <Icon name="ph:user-duotone" class="w-16 h-16 text-white" />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          关于我
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Hi，我是 Salween
        </p>
      </div>

      <!-- About Content -->
      <div class="prose prose-lg dark:prose-dark max-w-none">
        <h2>👋 欢迎</h2>
        <p>
          欢迎来到我的个人博客！这里是我分享技术心得、记录学习历程的地方。
        </p>

        <h2>💻 技术栈</h2>
        <p>
          我主要关注前端开发，熟悉以下技术：
        </p>
        <ul>
          <li>Vue.js / Nuxt.js</li>
          <li>React / Next.js</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Node.js</li>
        </ul>

        <h2>📝 博客说明</h2>
        <p>
          本博客使用 <strong>Nuxt 3</strong> + <strong>Nuxt Content</strong> 构建，采用静态生成方式部署。
          主题设计追求现代、简洁，支持暗黑模式切换。
        </p>

        <h2>📬 联系方式</h2>
        <p>
          如果你有任何问题或想法，欢迎通过以下方式联系我：
        </p>
        <ul>
          <li>GitHub: <a href="https://github.com" target="_blank">@salween</a></li>
          <li>Email: <a href="mailto:hello@example.com">hello@example.com</a></li>
          <li>Twitter: <a href="https://twitter.com" target="_blank">@salween</a></li>
        </ul>

        <h2>🎯 未来计划</h2>
        <p>
          持续更新技术博客，分享更多有价值的内容。同时也会不断优化博客的功能和性能。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面元信息
useHead({
  title: '关于我',
  meta: [
    { name: 'description', content: '了解更多关于 Salween 和这个博客' }
  ]
})
</script>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4;
}

.prose p {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed mb-4;
}

.prose ul {
  @apply list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300;
}

.prose a {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}
</style>

