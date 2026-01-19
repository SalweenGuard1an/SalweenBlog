<template>
  <div class="max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">标签云</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        共 {{ tags.length }} 个标签
      </p>
    </div>

    <!-- Tags Cloud -->
    <div v-if="tags.length > 0" class="card p-8">
      <TagCloud :tags="tags" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <Icon name="ph:tag-duotone" class="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
      <p class="text-xl text-gray-500 dark:text-gray-400">暂无标签</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面元信息
useHead({
  title: '标签'
})

// 获取所有文章
const { data: posts } = await useAsyncData('all-posts-for-tags', () => 
  queryContent('/blog').find()
)

// 统计标签
const tags = computed(() => {
  if (!posts.value) return []
  
  const tagCount: Record<string, number> = {}
  
  posts.value.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    }
  })

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})
</script>

