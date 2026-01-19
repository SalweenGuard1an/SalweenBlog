<template>
  <header class="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          class="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-blue-700 transition-all"
        >
          <Icon name="ph:newspaper-duotone" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <span>Salween</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-2">
          <SearchBar />
          <ThemeToggle />
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="打开菜单"
          >
            <Icon name="ph:list-duotone" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 py-4 space-y-2">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="toggleMobileMenu"
            class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 路由变化时关闭移动菜单
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

