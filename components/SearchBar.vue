<template>
  <div class="relative">
    <button 
      @click="openSearch"
      class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="搜索"
    >
      <Icon name="ph:magnifying-glass-duotone" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>

    <!-- Search Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isSearchOpen" 
          class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
          @click.self="closeSearch"
        >
          <div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <!-- Search Input -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="relative">
                <Icon name="ph:magnifying-glass-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref="searchInput"
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜索文章..."
                  class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @keydown.esc="closeSearch"
                >
              </div>
            </div>

            <!-- Search Results -->
            <div class="max-h-96 overflow-y-auto p-4">
              <div v-if="searchQuery && filteredPosts.length > 0" class="space-y-2">
                <NuxtLink
                  v-for="post in filteredPosts"
                  :key="post._path"
                  :to="post._path"
                  @click="closeSearch"
                  class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ post.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ post.description }}</p>
                </NuxtLink>
              </div>
              <div v-else-if="searchQuery && filteredPosts.length === 0" class="text-center text-gray-500 py-8">
                没有找到相关文章
              </div>
              <div v-else class="text-center text-gray-500 py-8">
                输入关键词搜索文章
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

// 获取所有文章
const { data: posts } = await useAsyncData('all-posts', () => 
  queryContent('/blog').sort({ date: -1 }).find()
)

// 过滤文章
const filteredPosts = computed(() => {
  if (!searchQuery.value || !posts.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.title?.toLowerCase().includes(query) ||
    post.description?.toLowerCase().includes(query) ||
    post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
  ).slice(0, 10)
})

const openSearch = () => {
  isSearchOpen.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

// 键盘快捷键
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div {
  transform: scale(0.95) translateY(-20px);
}

.modal-leave-to > div {
  transform: scale(0.95) translateY(-20px);
}
</style>

