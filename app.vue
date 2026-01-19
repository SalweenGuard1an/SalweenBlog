<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 设置网站元信息
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - Salween Blog` : 'Salween Blog'
  }
})
</script>

