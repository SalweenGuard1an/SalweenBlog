<template>
  <h2 :id="id">
    <a :href="`#${id}`" class="header-anchor">
      <slot />
    </a>
  </h2>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
h2 {
  @apply text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-gray-100;
  scroll-margin-top: 5rem;
}

.header-anchor {
  @apply no-underline hover:underline;
}
</style>

