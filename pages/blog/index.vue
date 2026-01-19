<template>
  <div class="max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">博客文章</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        共 {{ posts?.length || 0 }} 篇文章
      </p>
    </div>

    <!-- Posts List -->
    <div v-if="posts && posts.length > 0" class="space-y-6">
      <BlogCard 
        v-for="post in posts" 
        :key="post._path"
        :post="post"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <Icon name="ph:article-duotone" class="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
      <p class="text-xl text-gray-500 dark:text-gray-400">还没有文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面元信息
useHead({
  title: '博客'
})

// 获取所有文章
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent('/blog')
    .sort({ date: -1 })
    .find()
)
</script>

