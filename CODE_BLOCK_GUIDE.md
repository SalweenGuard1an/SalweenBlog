# 代码块优化说明

## ✅ 已完成的优化

### 1. 增强的代码高亮
- ✨ 使用 Shiki 高亮引擎（GitHub 风格）
- 🌓 支持亮色/暗色主题自动切换
- 📝 支持 15+ 种编程语言

支持的语言：
- JavaScript / TypeScript
- Vue / HTML / CSS / SCSS
- Bash / Shell
- Python
- JSON / YAML
- Markdown
- SQL
- Dockerfile / Nginx

### 2. 美化的代码块样式
- 🎨 现代化的圆角设计
- 📦 清晰的背景色和阴影
- 🏷️ 自动显示语言标签
- 📏 优化的行高和间距
- 🎯 自定义滚动条样式
- 🔤 使用 Fira Code 等宽字体（支持连字符）

### 3. 代码复制功能
- 📋 悬停显示复制按钮
- ✅ 复制成功视觉反馈
- ⌨️ 支持键盘操作（Enter/Space）

### 4. 行内代码优化
- 💎 精致的内联代码样式
- 🎨 区分主题色高亮
- 📐 合适的内边距和圆角

## 📝 使用方法

### 基础代码块

\`\`\`markdown
\`\`\`javascript
const greeting = 'Hello World!'
console.log(greeting)
\`\`\`
\`\`\`

效果：
- 显示语言标签（右上角）
- 语法高亮
- 复制按钮（悬停显示）

### 行内代码

使用单个反引号：

\`\`\`markdown
这是 \`行内代码\` 示例
\`\`\`

### 支持的语言示例

**JavaScript:**
\`\`\`javascript
const message = 'Hello'
console.log(message)
\`\`\`

**TypeScript:**
\`\`\`typescript
interface User {
  name: string
  age: number
}
\`\`\`

**Vue:**
\`\`\`vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = ref('Hello Vue!')
</script>
\`\`\`

**Bash:**
\`\`\`bash
npm install
npm run dev
\`\`\`

**Python:**
\`\`\`python
def hello():
    print("Hello World")
\`\`\`

**JSON:**
\`\`\`json
{
  "name": "example",
  "version": "1.0.0"
}
\`\`\`

## 🎨 样式特性

### 亮色主题
- 背景：`#f6f8fa` (GitHub 浅色)
- 语法高亮：github-light 主题

### 暗色主题
- 背景：`#0d1117` (GitHub 暗色)
- 语法高亮：github-dark 主题

### 字体
- 代码块：Fira Code, Consolas, Monaco
- 正文：Inter

## 🔧 自定义配置

### 添加新语言

编辑 `nuxt.config.ts`：

\`\`\`typescript
content: {
  highlight: {
    preload: [
      // 添加你需要的语言
      'rust',
      'go',
      'php'
    ]
  }
}
\`\`\`

### 修改主题

可选的主题包括：
- github-light / github-dark
- nord
- monokai
- dracula
- one-dark-pro
- 等等...

修改 `nuxt.config.ts`：

\`\`\`typescript
content: {
  highlight: {
    theme: {
      default: 'github-light',
      dark: 'nord'  // 改为你喜欢的暗色主题
    }
  }
}
\`\`\`

### 自定义样式

修改 `assets/css/main.css` 中的代码块样式部分。

## 📦 相关组件

创建了以下自定义组件：

1. **`components/content/ProsePre.vue`**
   - 代码块容器
   - 复制功能
   - 语言标签

2. **`components/content/ProseCode.vue`**
   - 行内代码样式

3. **`components/content/ProseH2.vue` / `ProseH3.vue`**
   - 标题锚点链接

## 🎯 最佳实践

1. **指定语言**
   - 总是在代码块后指定语言
   - 帮助语法高亮和读者理解

2. **适当换行**
   - 代码块自动支持横向滚动
   - 但建议控制在 80-100 字符宽度内

3. **添加注释**
   - 在复杂代码中添加注释
   - 帮助读者理解

4. **使用行内代码**
   - 文章中提到代码术语时使用 \`code\`
   - 如：\`useState\`、\`@apply\` 等

## 🚀 性能

- ✅ Shiki 在构建时高亮（零运行时成本）
- ✅ 主题自动切换（无需重新高亮）
- ✅ 字体预加载（减少闪烁）
- ✅ 响应式设计（移动端友好）

## 📚 参考资源

- [Nuxt Content - Code Highlighting](https://content.nuxt.com/api/configuration#highlight)
- [Shiki Themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md)
- [Supported Languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md)

---

现在你的博客拥有专业级的代码展示效果了！✨

