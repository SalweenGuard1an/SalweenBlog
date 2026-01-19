<template>
  <article class="card overflow-hidden hover:scale-[1.02] transition-transform duration-300">
    <NuxtLink :to="post._path" class="block">
      <!-- Cover Image -->
      <div v-if="post.cover" class="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
        <NuxtImg
          :src="post.cover"
          :alt="post.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div v-else class="aspect-video bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center">
        <Icon name="ph:article-duotone" class="w-20 h-20 text-white/50" />
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="tag in post.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          {{ post.title }}
        </h2>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {{ post.description }}
        </p>

        <!-- Meta Info -->
        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <div class="flex items-center">
            <Icon name="ph:calendar" class="w-4 h-4 mr-1" />
            <time>{{ formatDate(post.date) }}</time>
          </div>
          <div class="flex items-center">
            <Icon name="ph:clock" class="w-4 h-4 mr-1" />
            <span>{{ readingTime }} 分钟</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface Post {
  _path: string
  title: string
  description?: string
  date: string
  cover?: string
  tags?: string[]
  body?: any
}

const props = defineProps<{
  post: Post
}>()

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  })
}

// 计算阅读时间
const readingTime = computed(() => {
  return useReadingTime(props.post.body?.children || [])
})
</script>

