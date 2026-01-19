---
title: Vue 3 Composition API 深度解析
description: 深入理解 Vue 3 的 Composition API，学习如何使用它来构建更灵活、可维护的应用。
date: 2026-01-16
tags: [Vue, JavaScript, 教程]
---

# Vue 3 Composition API 深度解析

Vue 3 引入的 Composition API 是一个重大更新，它提供了一种更灵活的方式来组织组件逻辑。

## 什么是 Composition API？

Composition API 是 Vue 3 中用于组织组件逻辑的新方式，它解决了 Options API 在大型组件中的一些限制。

### Options API vs Composition API

#### Options API（Vue 2）

\`\`\`javascript
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  }
}
\`\`\`

#### Composition API（Vue 3）

\`\`\`javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const message = ref('Hello')
    
    const increment = () => {
      count.value++
    }
    
    const doubleCount = computed(() => count.value * 2)
    
    return {
      count,
      message,
      increment,
      doubleCount
    }
  }
}
\`\`\`

## 核心 API

### 1. ref 和 reactive

**ref** - 用于基本类型：

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
\`\`\`

**reactive** - 用于对象：

\`\`\`javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++ // 直接访问，无需 .value
\`\`\`

### 2. computed

计算属性保持与 Vue 2 相同的响应式特性：

\`\`\`javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 可写的计算属性
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
\`\`\`

### 3. watch 和 watchEffect

**watch** - 监听特定数据源：

\`\`\`javascript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(\`count changed from \${oldValue} to \${newValue}\`)
})

// 监听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  // ...
})
\`\`\`

**watchEffect** - 自动追踪依赖：

\`\`\`javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello')

watchEffect(() => {
  console.log(\`count is \${count.value}, message is \${message.value}\`)
})
\`\`\`

### 4. 生命周期钩子

\`\`\`javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onUnmounted(() => {
      console.log('组件即将卸载')
    })
  }
}
\`\`\`

## Script Setup

Vue 3.2+ 引入了 `<script setup>` 语法糖，让代码更简洁：

\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
\`\`\`

## 组合式函数（Composables）

创建可复用的逻辑：

\`\`\`javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
\`\`\`

使用组合式函数：

\`\`\`vue
<script setup>
import { useMouse } from './composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  <div>Mouse position: {{ x }}, {{ y }}</div>
</template>
\`\`\`

## 高级模式

### 1. Provide / Inject

跨层级组件通信：

\`\`\`javascript
// 父组件
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)

// 子组件
import { inject } from 'vue'

const theme = inject('theme')
\`\`\`

### 2. 模板引用

访问 DOM 元素：

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  inputRef.value.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
\`\`\`

### 3. TypeScript 支持

Composition API 对 TypeScript 有很好的支持：

\`\`\`typescript
import { ref, Ref } from 'vue'

interface User {
  id: number
  name: string
}

const user: Ref<User | null> = ref(null)

async function fetchUser(id: number): Promise<void> {
  const response = await fetch(\`/api/users/\${id}\`)
  user.value = await response.json()
}
\`\`\`

## 最佳实践

1. **按功能组织代码** - 将相关逻辑放在一起
2. **提取可复用逻辑** - 创建组合式函数
3. **使用 TypeScript** - 获得更好的类型支持
4. **保持 setup 简洁** - 复杂逻辑提取到单独文件
5. **合理使用 ref 和 reactive** - 基本类型用 ref，对象用 reactive

## 总结

Composition API 提供了：

- ✅ 更好的代码组织
- ✅ 更容易复用逻辑
- ✅ 更好的 TypeScript 支持
- ✅ 更灵活的组件设计

虽然学习曲线稍陡，但掌握后会大大提高开发效率！

## 相关资源

- [Vue 3 官方文档](https://vuejs.org)
- [Vue 3 组合式 API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [VueUse](https://vueuse.org) - 强大的组合式函数库

Happy coding! 🚀

