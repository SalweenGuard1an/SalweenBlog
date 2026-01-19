<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :aria-label="colorMode.value === 'dark' ? '切换到浅色模式' : '切换到暗色模式'"
  >
    <Icon 
      :name="colorMode.value === 'dark' ? 'ph:sun-duotone' : 'ph:moon-duotone'" 
      class="w-5 h-5 text-gray-700 dark:text-gray-300"
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

