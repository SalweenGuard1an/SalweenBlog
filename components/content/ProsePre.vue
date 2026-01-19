<template>
  <div class="code-wrapper relative group my-6">
    <!-- 复制按钮 -->
    <button
      @click="copyCode"
      class="copy-button absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
      :class="{ '!opacity-100': copied }"
      :title="copied ? '已复制!' : '复制代码'"
      type="button"
      aria-label="复制代码"
    >
      <Icon v-if="!copied" name="ph:copy-duotone" class="w-5 h-5" />
      <Icon v-else name="ph:check-duotone" class="w-5 h-5 text-green-400" />
    </button>

    <!-- 代码块 - 保留原始渲染 -->
    <pre ref="preElement" v-bind="$attrs"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const copied = ref(false)
const preElement = ref<HTMLElement | null>(null)

const copyCode = async () => {
  if (!preElement.value) return

  const codeElement = preElement.value.querySelector('code') || preElement.value
  const textToCopy = codeElement.textContent || ''
  
  try {
    await navigator.clipboard.writeText(textToCopy)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
.code-wrapper {
  position: relative;
}
</style>

