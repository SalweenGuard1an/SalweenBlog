# 🎉 Salween Blog 使用指南

恭喜！你的 Nuxt 博客已经搭建完成了。

## 🚀 快速开始

### 1. 启动开发服务器

\`\`\`bash
yarn dev
\`\`\`

访问 http://localhost:3000 查看你的博客。

### 2. 创建新文章

在 `content/blog/` 目录下创建新的 Markdown 文件：

\`\`\`bash
touch content/blog/my-new-post.md
\`\`\`

文章模板：

\`\`\`markdown
---
title: 你的文章标题
description: 文章简短描述
date: 2026-01-19
tags: [标签1, 标签2, 标签3]
cover: /images/cover.jpg  # 可选，文章封面图
---

# 你的文章标题

这里是文章内容...

## 二级标题

### 三级标题

- 列表项 1
- 列表项 2

\`\`\`代码块
const hello = 'world'
\`\`\`
\`\`\`

### 3. 添加图片

将图片放在 `public/images/` 目录下，然后在文章中引用：

\`\`\`markdown
![图片描述](/images/your-image.jpg)
\`\`\`

## 🎨 自定义配置

### 修改网站信息

编辑 `nuxt.config.ts`：

\`\`\`typescript
app: {
  head: {
    title: '你的博客名称',
    meta: [
      { name: 'description', content: '你的博客描述' }
    ]
  }
}
\`\`\`

### 修改导航链接

编辑 `components/AppHeader.vue`，找到 `navItems` 数组：

\`\`\`javascript
const navItems = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' }
]
\`\`\`

### 修改页脚信息

编辑 `components/AppFooter.vue`，更新你的社交媒体链接：

\`\`\`javascript
const socialLinks = [
  { name: 'GitHub', icon: 'ph:github-logo-duotone', url: 'https://github.com/yourusername' },
  { name: 'Twitter', icon: 'ph:twitter-logo-duotone', url: 'https://twitter.com/yourusername' },
  { name: 'Email', icon: 'ph:envelope-duotone', url: 'mailto:your@email.com' }
]
\`\`\`

### 配置评论系统

1. 访问 https://giscus.app/zh-CN
2. 按照步骤配置你的 GitHub 仓库
3. 获取配置参数
4. 编辑 `components/CommentSection.vue`：

\`\`\`javascript
const giscusConfig = {
  repo: 'username/repo',          // 你的仓库
  repoId: 'R_xxx',                // 从 giscus.app 获取
  category: 'Announcements',      // 讨论分类
  categoryId: 'DIC_xxx',          // 从 giscus.app 获取
  // ...其他配置
}
\`\`\`

### 自定义主题颜色

编辑 `tailwind.config.ts`：

\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#your-color',
        100: '#your-color',
        // ... 定义 50-900 的颜色
      }
    }
  }
}
\`\`\`

## 📝 Markdown 语法

### 基础语法

\`\`\`markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
~~删除线~~

[链接文本](https://example.com)

![图片](./image.jpg)

> 引用文本

- 无序列表
- 项目 2

1. 有序列表
2. 项目 2

\`行内代码\`

\`\`\`javascript
// 代码块
const code = 'example'
\`\`\`
\`\`\`

### 特殊功能

**表格：**

\`\`\`markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
\`\`\`

**任务列表：**

\`\`\`markdown
- [x] 已完成任务
- [ ] 未完成任务
\`\`\`

## 🚀 部署

### 部署到 Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 https://vercel.com
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测 Nuxt 并配置构建
6. 点击 "Deploy"

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 访问 https://netlify.com
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 构建设置：
   - Build command: `yarn generate`
   - Publish directory: `.output/public`
6. 点击 "Deploy site"

### 部署到 GitHub Pages

1. 安装 gh-pages：

\`\`\`bash
yarn add -D gh-pages
\`\`\`

2. 在 `package.json` 添加脚本：

\`\`\`json
{
  "scripts": {
    "deploy": "yarn generate && npx gh-pages -d .output/public"
  }
}
\`\`\`

3. 运行部署：

\`\`\`bash
yarn deploy
\`\`\`

## 🎯 常用命令

\`\`\`bash
# 开发
yarn dev              # 启动开发服务器
yarn build            # 构建生产版本
yarn generate         # 生成静态文件
yarn preview          # 预览生成的站点

# 依赖管理
yarn add <package>    # 添加依赖
yarn remove <package> # 移除依赖
\`\`\`

## 📚 学习资源

- [Nuxt 3 文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Vue 3 文档](https://vuejs.org)
- [Markdown 指南](https://www.markdownguide.org)

## 🐛 常见问题

### 问题：端口已被占用

\`\`\`bash
# 使用其他端口
yarn dev --port 3001
\`\`\`

### 问题：样式不生效

1. 确保 Tailwind 类名正确
2. 检查 `tailwind.config.ts` 配置
3. 重启开发服务器

### 问题：文章不显示

1. 检查文件路径是否正确（`content/blog/`）
2. 确保 frontmatter 格式正确
3. 检查文件扩展名是否为 `.md`

### 问题：搜索不工作

Nuxt Content 的搜索功能需要至少有一篇文章才能正常工作。

## 💡 提示

1. **使用热键** - 按 `Cmd/Ctrl + K` 打开搜索
2. **开发工具** - 按 `Shift + Option + D` 打开 Nuxt DevTools
3. **暗黑模式** - 点击顶部导航的月亮/太阳图标切换主题
4. **实时预览** - 修改文件后，浏览器会自动刷新

## 🎉 下一步

1. ✅ 修改 "关于" 页面内容
2. ✅ 创建你的第一篇文章
3. ✅ 自定义主题颜色
4. ✅ 配置 Giscus 评论系统
5. ✅ 添加你的社交媒体链接
6. ✅ 部署到生产环境

## 🤝 需要帮助？

- 查看 [Nuxt 文档](https://nuxt.com)
- 访问 [Nuxt Discord](https://discord.com/invite/nuxt)
- GitHub Issues

---

祝你写作愉快！✨

