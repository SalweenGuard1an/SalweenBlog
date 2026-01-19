# GitHub Pages 路由 404 问题修复说明

## 问题描述

部署到 GitHub Pages 后，刷新页面或直接访问子路由会出现 404 错误。

## 问题原因

GitHub Pages 是静态文件服务器，不支持客户端路由（SPA）的自动回退。当直接访问 `/blog/xxx` 时，它会尝试查找 `/blog/xxx/index.html` 文件，如果不存在就返回 404。

## 解决方案

我们采用了双重解决方案：

### 1. **预渲染所有路由（SSG）**

通过 Nuxt Content 的 `crawlLinks: true` 配置，所有页面都会被预渲染为静态 HTML 文件。这样每个路由都有对应的 HTML 文件。

### 2. **404.html SPA Fallback**

为了处理动态路由或未预渲染的页面，我们添加了一个自动化脚本 `scripts/fix-github-pages.js`，它会：

- 确保 `.nojekyll` 文件存在（禁用 Jekyll 处理）
- 在 `404.html` 中注入 SPA fallback 脚本
- 让 Nuxt 的客户端路由接管导航

## 已完成的修改

### 1. 创建文件

- ✅ `public/.nojekyll` - 禁用 GitHub Pages 的 Jekyll 处理
- ✅ `scripts/fix-github-pages.js` - 自动修复脚本

### 2. 修改配置

#### `package.json`

添加了 `postgenerate` 钩子：

```json
{
  "scripts": {
    "generate": "nuxt generate",
    "postgenerate": "node scripts/fix-github-pages.js"
  }
}
```

#### `nuxt.config.ts`

```typescript
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true,        // 自动爬取所有链接并预渲染
    failOnError: false       // 忽略预渲染错误（如图片 404）
  }
}
```

## 部署配置

### 选项 1：User/Org Site（推荐）

**仓库名**: `username.github.io`  
**访问地址**: `https://username.github.io/`  
**配置**: 使用 `.github/workflows/deploy.yml`

不需要修改 `baseURL`，默认为 `/`。

### 选项 2：Project Site（当前配置）

**仓库名**: `SalweenBlog`  
**访问地址**: `https://salweenguard1an.github.io/SalweenBlog/`  
**配置**: 使用 `.github/workflows/deploy-with-base.yml`

需要在 workflow 中设置 `BASE_URL` 环境变量。

## 当前部署状态

根据您的仓库地址 `SalweenGuard1an/SalweenBlog`，您的博客部署为 **Project Site**。

### 推荐方案 A: 使用 Project Site 部署

**优点**: 不需要占用 `username.github.io` 仓库名  
**缺点**: URL 中会包含仓库名

#### 操作步骤：

1. **删除当前的 workflow**（避免冲突）：
   ```bash
   git rm .github/workflows/deploy.yml
   ```

2. **重命名 workflow**：
   ```bash
   git mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml
   ```

3. **提交并推送**：
   ```bash
   git add .
   git commit -m "fix: 修复 GitHub Pages 路由 404 问题"
   git push
   ```

### 推荐方案 B: 使用 User Site 部署（更简洁）

**优点**: URL 更简洁，直接是 `https://cn-haoling.github.io/`  
**缺点**: 需要将仓库重命名为 `CN-Haoling.github.io`

#### 操作步骤：

1. **在 GitHub 上重命名仓库**：
   - 进入仓库 Settings
   - 修改仓库名为 `CN-Haoling.github.io`（注意大小写）

2. **更新本地 remote**：
   ```bash
   git remote set-url origin https://github.com/CN-Haoling/CN-Haoling.github.io.git
   ```

3. **推送代码**：
   ```bash
   git push
   ```

4. **使用当前的 `deploy.yml`**（无需修改）

## 验证修复

部署成功后，测试以下场景：

1. ✅ 访问首页：`https://your-site/`
2. ✅ 点击链接导航到博客列表：`https://your-site/blog`
3. ✅ 点击文章进入详情页：`https://your-site/blog/xxx`
4. ✅ **刷新页面** - 应该正常显示，不会 404
5. ✅ **直接访问** 文章 URL - 应该正常显示

## 技术细节

### 预渲染流程

```
nuxt generate
  ↓
预渲染所有页面
  ↓
生成 .output/public/
  ├─ index.html          (首页)
  ├─ 200.html            (SPA 入口)
  ├─ 404.html            (404 页面)
  ├─ blog/
  │  ├─ index.html       (博客列表)
  │  ├─ article-1/
  │  │  └─ index.html    (文章详情)
  │  └─ article-2/
  │     └─ index.html
  └─ .nojekyll           (禁用 Jekyll)
  ↓
postgenerate 钩子
  ↓
scripts/fix-github-pages.js
  ↓
在 404.html 注入 SPA fallback
  ↓
部署到 GitHub Pages
```

### SPA Fallback 机制

当用户访问一个不存在的路径时：

1. GitHub Pages 返回 `404.html`
2. `404.html` 中的脚本检测到这是一个应该由客户端路由处理的路径
3. Nuxt 的路由系统接管，加载正确的页面组件
4. 用户看到正确的内容，而不是 404 错误

## 常见问题

### Q: 为什么有些页面还是 404？

A: 可能的原因：
1. 该页面没有被预渲染 - 检查 `yarn generate` 输出
2. baseURL 配置不正确 - 检查是否匹配仓库名
3. GitHub Pages 还在构建中 - 等待几分钟

### Q: 如何添加新的页面？

A: Nuxt Content 会自动发现并预渲染所有：
- `pages/` 目录下的页面
- `content/` 目录下的内容
- 通过 `<NuxtLink>` 链接的页面

### Q: CSS/JS 文件 404 怎么办？

A: 检查 `baseURL` 配置是否正确。如果是 project site，必须设置为 `/仓库名/`。

## 相关文件

- `scripts/fix-github-pages.js` - 自动修复脚本
- `public/.nojekyll` - 禁用 Jekyll
- `.github/workflows/deploy.yml` - User site workflow
- `.github/workflows/deploy-with-base.yml` - Project site workflow
- `nuxt.config.ts` - Nuxt 配置

## 参考资料

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Nuxt 静态部署指南](https://nuxt.com/docs/getting-started/deployment#static-hosting)
- [Nitro 预渲染配置](https://nitro.unjs.io/config#prerender)

