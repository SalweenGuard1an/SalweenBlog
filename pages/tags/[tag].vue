<template>
  <div class="max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="mb-12">
      <div class="flex items-center mb-4">
        <NuxtLink to="/tags" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Icon name="ph:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 ml-4">
          #{{ tag }}
        </h1>
      </div>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        共 {{ filteredPosts?.length || 0 }} 篇文章
      </p>
    </div>

    <!-- Posts List -->
    <div v-if="filteredPosts && filteredPosts.length > 0" class="space-y-6">
      <BlogCard 
        v-for="post in filteredPosts" 
        :key="post._path"
        :post="post"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <Icon name="ph:tag-duotone" class="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
      <p class="text-xl text-gray-500 dark:text-gray-400">该标签下暂无文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

// 设置页面元信息
useHead({
  title: `标签: ${tag}`
})

// 获取该标签下的所有文章
const { data: filteredPosts } = await useAsyncData(`tag-${tag}`, () => 
  queryContent('/blog')
    .where({ tags: { $contains: tag } })
    .sort({ date: -1 })
    .find()
)
</script>

