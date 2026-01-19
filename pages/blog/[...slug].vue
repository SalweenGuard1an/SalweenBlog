<template>
  <div>
    <article v-if="article" class="max-w-4xl mx-auto">
      <!-- Article Header -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ article.title }}
        </h1>
        
        <!-- Meta Info -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
          <div class="flex items-center">
            <Icon name="ph:calendar-duotone" class="w-5 h-5 mr-2" />
            <time>{{ formatDate(article.date) }}</time>
          </div>
          
          <div class="flex items-center">
            <Icon name="ph:clock-duotone" class="w-5 h-5 mr-2" />
            <span>{{ readingTime }} 分钟阅读</span>
          </div>

          <div class="flex items-center">
            <Icon name="ph:eye-duotone" class="w-5 h-5 mr-2" />
            <span>{{ views }} 次浏览</span>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mt-6">
          <NuxtLink
            v-for="tag in article.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </header>

      <!-- Cover Image -->
      <div v-if="article.cover" class="mb-12">
        <NuxtImg
          :src="article.cover"
          :alt="article.title"
          class="w-full h-auto rounded-xl shadow-lg"
          loading="lazy"
        />
      </div>

      <!-- Content and TOC -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="prose prose-lg dark:prose-dark max-w-none prose-pre:p-0">
            <ContentRenderer :value="article" />
          </div>
        </div>

        <!-- Table of Contents -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24">
            <TableOfContents v-if="article.body?.toc" :toc="article.body.toc" />
          </div>
        </aside>
      </div>

      <!-- Comments Section -->
      <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <CommentSection />
      </div>
    </article>

    <!-- 404 State -->
    <div v-else class="max-w-4xl mx-auto text-center py-20">
      <Icon name="ph:file-x-duotone" class="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">文章不存在</h1>
      <NuxtLink to="/blog" class="btn-primary">
        返回博客列表
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 获取文章内容
const { data: article } = await useAsyncData(`article-${route.path}`, () => 
  queryContent(route.path).findOne()
)

// 计算阅读时间
const readingTime = useReadingTime(article.value?.body?.children || [])

// 浏览量（使用 composable）
const views = useViews(route.path)

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 设置页面元信息
useHead({
  title: article.value?.title || '文章详情',
  meta: [
    { name: 'description', content: article.value?.description || '' },
    { property: 'og:title', content: article.value?.title || '' },
    { property: 'og:description', content: article.value?.description || '' },
    { property: 'og:image', content: article.value?.cover || '' }
  ]
})
</script>

<style>
/* 文章内容样式 */
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-gray-900 dark:text-gray-100 font-bold;
}

.prose a {
  @apply text-primary-600 dark:text-primary-400 no-underline hover:underline;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm;
}

.prose pre {
  @apply bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto;
}

.prose pre code {
  @apply bg-transparent p-0;
}

.prose img {
  @apply rounded-lg shadow-md;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-4 italic;
}
</style>

