<template>
  <div class="comment-section">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">评论区</h2>
    
    <!-- Giscus 评论组件将在这里加载 -->
    <div ref="giscusContainer" class="giscus-container">
      <div class="text-center py-8 text-gray-500 dark:text-gray-400">
        <p class="mb-4">评论功能需要配置 Giscus</p>
        <p class="text-sm">
          请访问 
          <a 
            href="https://giscus.app/zh-CN" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-primary-600 hover:text-primary-700 underline"
          >
            giscus.app
          </a>
          获取配置信息
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const giscusContainer = ref<HTMLElement | null>(null)
const colorMode = useColorMode()

// Giscus 配置
const giscusConfig = {
  // 需要配置以下信息
  repo: '', // 格式: 'username/repo'
  repoId: '', // 从 giscus.app 获取
  category: '', // 讨论分类
  categoryId: '', // 从 giscus.app 获取
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
  loading: 'lazy'
}

// 加载 Giscus
const loadGiscus = () => {
  if (!giscusContainer.value || !giscusConfig.repo) return

  // 清空容器
  giscusContainer.value.innerHTML = ''

  // 创建 script 标签
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', giscusConfig.mapping)
  script.setAttribute('data-strict', giscusConfig.strict)
  script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
  script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
  script.setAttribute('data-input-position', giscusConfig.inputPosition)
  script.setAttribute('data-theme', colorMode.value === 'dark' ? 'dark' : 'light')
  script.setAttribute('data-lang', giscusConfig.lang)
  script.setAttribute('data-loading', giscusConfig.loading)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  giscusContainer.value.appendChild(script)
}

// 监听主题变化
watch(() => colorMode.value, () => {
  // Giscus 主题切换
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: colorMode.value === 'dark' ? 'dark' : 'light'
          }
        }
      },
      'https://giscus.app'
    )
  }
})

onMounted(() => {
  loadGiscus()
})
</script>

<style scoped>
.giscus-container {
  @apply min-h-[200px];
}
</style>

