<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center py-20">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          欢迎来到 Salween Blog
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          分享技术心得，记录成长历程
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/blog" class="btn-primary">
            <Icon name="ph:book-open-duotone" class="inline w-5 h-5 mr-2" />
            阅读博客
          </NuxtLink>
          <NuxtLink to="/about" class="btn-secondary">
            <Icon name="ph:user-duotone" class="inline w-5 h-5 mr-2" />
            关于我
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="card p-6 text-center">
          <Icon name="ph:article-duotone" class="w-12 h-12 mx-auto mb-3 text-primary-600" />
          <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ stats.posts }}</div>
          <div class="text-gray-600 dark:text-gray-400">篇文章</div>
        </div>
        <div class="card p-6 text-center">
          <Icon name="ph:tag-duotone" class="w-12 h-12 mx-auto mb-3 text-blue-600" />
          <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ stats.tags }}</div>
          <div class="text-gray-600 dark:text-gray-400">个标签</div>
        </div>
        <div class="card p-6 text-center">
          <Icon name="ph:eye-duotone" class="w-12 h-12 mx-auto mb-3 text-purple-600" />
          <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ stats.views }}</div>
          <div class="text-gray-600 dark:text-gray-400">次浏览</div>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
          <NuxtLink to="/blog" class="text-primary-600 hover:text-primary-700 flex items-center">
            查看全部
            <Icon name="ph:arrow-right" class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
        
        <div v-if="latestPosts && latestPosts.length > 0" class="space-y-6">
          <BlogCard 
            v-for="post in latestPosts" 
            :key="post._path"
            :post="post"
          />
        </div>
        <div v-else class="text-center py-12 text-gray-500">
          暂无文章
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 设置页面元信息
useHead({
  title: '首页'
})

// 获取最新文章
const { data: latestPosts } = await useAsyncData('latest-posts', () => 
  queryContent('/blog')
    .sort({ date: -1 })
    .limit(5)
    .find()
)

// 获取所有文章和标签统计
const { data: allPosts } = await useAsyncData('all-posts-stats', () => 
  queryContent('/blog').find()
)

// 计算统计数据
const stats = computed(() => {
  const posts = allPosts.value || []
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => tagsSet.add(tag))
    }
  })

  return {
    posts: posts.length,
    tags: tagsSet.size,
    views: posts.length * 128 // 示例数据
  }
})
</script>

