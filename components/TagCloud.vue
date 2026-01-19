<template>
  <div class="flex flex-wrap gap-3">
    <NuxtLink
      v-for="tag in tags"
      :key="tag.name"
      :to="`/tags/${tag.name}`"
      :class="[
        'px-4 py-2 rounded-lg transition-all duration-200 hover:scale-110',
        'bg-gradient-to-r hover:shadow-lg',
        getTagStyle(tag.count)
      ]"
    >
      <span class="font-medium">{{ tag.name }}</span>
      <span class="ml-2 opacity-75 text-sm">({{ tag.count }})</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  name: string
  count: number
}

defineProps<{
  tags: Tag[]
}>()

// 根据文章数量返回不同的样式
const getTagStyle = (count: number) => {
  if (count >= 5) {
    return 'from-primary-500 to-blue-500 text-white'
  } else if (count >= 3) {
    return 'from-purple-500 to-pink-500 text-white'
  } else if (count >= 2) {
    return 'from-green-500 to-teal-500 text-white'
  } else {
    return 'from-gray-400 to-gray-500 text-white'
  }
}
</script>

