---
title: 测试代码块
description: 测试各种代码块的渲染效果
date: 2026-01-19
tags: [测试]
---

# 测试代码块

## JavaScript 代码

```javascript
const hello = 'world'
console.log(hello)

function test() {
  return 'test'
}
```

## Vue 代码

```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = ref('Hello')
</script>
```

## 行内代码

这是 `行内代码` 测试。

使用 `useState` 和 `ref` 来管理状态。

## Python 代码

```python
def hello():
    print("Hello World")
    
hello()
```

## Bash 命令

```bash
npm install
npm run dev
```

测试完成！

