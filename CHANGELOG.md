# 更新日志

## 2026-01-19 - 代码块显示优化

### ✨ 新功能

#### 1. 增强的代码高亮
- ✅ 集成 Shiki 语法高亮引擎
- ✅ 支持 15+ 种编程语言
- ✅ 亮色/暗色主题自动切换
- ✅ GitHub 风格代码高亮

#### 2. 代码复制功能
- ✅ 悬停显示复制按钮
- ✅ 一键复制代码内容
- ✅ 复制成功视觉反馈（2秒）
- ✅ 支持键盘操作（Enter/Space）

#### 3. 美化的代码块样式
- ✅ 现代化圆角设计
- ✅ 优雅的阴影效果
- ✅ 自动显示语言标签（右上角）
- ✅ 优化的行高和间距
- ✅ 自定义滚动条样式
- ✅ Fira Code 等宽字体（支持连字符）
- ✅ 响应式设计（移动端友好）

#### 4. 行内代码优化
- ✅ 区分样式（与代码块不同）
- ✅ 主题色高亮
- ✅ 合适的内边距和边框
- ✅ 暗黑模式适配

### 🔧 技术实现

#### 新增组件
1. **`components/content/ProsePre.vue`**
   - 自定义代码块渲染
   - 集成复制功能
   - 语言标签显示
   - 主题自适应

2. **`components/content/ProseCode.vue`**
   - 行内代码渲染优化

3. **`components/content/ProseH2.vue` / `ProseH3.vue`**
   - 标题锚点链接
   - 平滑滚动

#### 配置更新
- **`nuxt.config.ts`**
  - 扩展语言支持列表
  - 配置双主题（亮/暗）
  - 添加 Fira Code 字体

- **`assets/css/main.css`**
  - 完整的代码块样式系统
  - 行内代码样式
  - 滚动条美化
  - 主题切换过渡

#### 依赖安装
- `@iconify-json/ph` - Phosphor 图标集（本地化）

### 🎨 视觉效果

#### 代码块特性
- 背景色：
  - 亮色模式：`#f6f8fa`
  - 暗色模式：`#0d1117`
- 圆角：`0.75rem`
- 阴影：`shadow-lg`
- 内边距：`1.25rem 1.5rem`
- 字体：Fira Code, Consolas, Monaco

#### 行内代码特性
- 背景色：
  - 亮色模式：`gray-100`
  - 暗色模式：`gray-800`
- 文字色：`primary-600` / `primary-400`
- 边框：`1px solid`
- 内边距：`0.375rem`

### 📚 支持的语言

- JavaScript / TypeScript
- Vue / HTML / CSS / SCSS
- Bash / Shell
- Python
- JSON / YAML
- Markdown
- SQL
- Dockerfile
- Nginx

### 🐛 修复的问题

1. ✅ 代码块样式不够明显
2. ✅ 缺少语言标识
3. ✅ 没有代码复制功能
4. ✅ 暗黑模式代码块对比度不足
5. ✅ 行内代码与正文区分不明显
6. ✅ 移动端代码块横向滚动体验差
7. ✅ 图标警告（安装了 @iconify-json/ph）
8. ✅ 示例文章中的组件解析错误

### 📖 相关文档

- `CODE_BLOCK_GUIDE.md` - 详细的代码块使用指南
- `GUIDE.md` - 博客使用指南（已更新）
- `README.md` - 项目说明（已更新）

### 🚀 使用方法

#### 基础用法
\`\`\`markdown
\`\`\`javascript
const hello = 'world'
console.log(hello)
\`\`\`
\`\`\`

#### 行内代码
\`\`\`markdown
使用 \`useState\` 钩子管理状态
\`\`\`

### 💡 提示

1. **总是指定语言** - 这样可以获得正确的语法高亮
2. **使用复制按钮** - 悬停在代码块上即可看到
3. **检查效果** - 在亮色和暗色模式下都测试一下
4. **查看文档** - 阅读 `CODE_BLOCK_GUIDE.md` 了解更多

---

## 2026-01-19 - 初始版本

### ✨ 初始功能
- 🚀 Nuxt 3 + Nuxt Content 博客框架
- 🎨 Tailwind CSS 样式系统
- 🌙 暗黑模式支持
- 🔍 全文搜索
- 🏷️ 标签系统
- 📱 响应式设计
- 💬 Giscus 评论支持
- 📊 阅读时间和浏览量统计

详见 `README.md` 和 `GUIDE.md`

