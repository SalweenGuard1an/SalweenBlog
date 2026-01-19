<template>
  <h3 :id="id">
    <a :href="`#${id}`" class="header-anchor">
      <slot />
    </a>
  </h3>
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
h3 {
  @apply text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-gray-100;
  scroll-margin-top: 5rem;
}

.header-anchor {
  @apply no-underline hover:underline;
}
</style>

