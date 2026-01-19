<template>
  <nav v-if="flatToc.length > 0" class="hidden lg:block">
    <div class="glass rounded-lg p-4 sticky top-24">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <Icon name="ph:list-bullets-duotone" class="w-4 h-4 mr-2" />
        目录
      </h3>
      <ul class="space-y-2 text-sm">
        <li 
          v-for="item in flatToc" 
          :key="item.id"
          :class="[
            'transition-colors',
            item.depth === 2 && 'ml-0',
            item.depth === 3 && 'ml-4',
            item.depth > 3 && 'ml-8'
          ]"
        >
          <a 
            :href="`#${item.id}`"
            :class="[
              'block py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors',
              activeId === item.id 
                ? 'text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400'
            ]"
            @click.prevent="scrollToHeading(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}

const props = defineProps<{
  toc: {
    links: TocItem[]
  }
}>()

const activeId = ref('')

// 扁平化目录结构
const flatToc = computed(() => {
  const flatten = (items: TocItem[]): TocItem[] => {
    return items.reduce((acc: TocItem[], item) => {
      acc.push(item)
      if (item.children) {
        acc.push(...flatten(item.children))
      }
      return acc
    }, [])
  }
  return flatten(props.toc.links || [])
})

// 滚动到指定标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

// 监听滚动更新活动标题
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-80px 0px -80% 0px'
    }
  )

  // 观察所有标题
  flatToc.value.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element) {
      observer.observe(element)
    }
  })

  onUnmounted(() => observer.disconnect())
})
</script>

