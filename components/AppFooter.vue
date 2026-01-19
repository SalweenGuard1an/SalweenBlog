<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">关于本站</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            基于 Nuxt 3 + Nuxt Content 构建的现代化个人博客，专注于分享技术与生活。
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">快速链接</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink 
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">关注我</h3>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {{ currentYear }} Salween Blog. All rights reserved.</p>
        <p class="mt-2">
          Powered by 
          <a href="https://nuxt.com" target="_blank" class="text-primary-600 hover:text-primary-700">Nuxt</a>
          +
          <a href="https://content.nuxt.com" target="_blank" class="text-primary-600 hover:text-primary-700">Nuxt Content</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' }
]

const socialLinks = [
  { name: 'GitHub', icon: 'ph:github-logo-duotone', url: 'https://github.com' },
  { name: 'Twitter', icon: 'ph:twitter-logo-duotone', url: 'https://twitter.com' },
  { name: 'Email', icon: 'ph:envelope-duotone', url: 'mailto:hello@example.com' }
]
</script>

