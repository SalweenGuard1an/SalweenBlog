# 🚀 快速修复 GitHub Pages 404 问题

## 问题已修复！✅

以下修改已完成：

1. ✅ 添加了 SPA fallback 机制
2. ✅ 配置了正确的预渲染
3. ✅ 创建了 `.nojekyll` 文件
4. ✅ 更新了 workflow 配置

---

## 📋 立即部署（二选一）

### 方案 A：Project Site（包含仓库名的 URL）

```bash
# 1. 删除冲突的 workflow
rm .github/workflows/deploy.yml

# 2. 重命名为主 workflow
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml

# 3. 提交并推送
git add .
git commit -m "fix: 修复 GitHub Pages 路由 404"
git push origin main
```

**部署后访问**: `https://salweenguard1an.github.io/SalweenBlog/`

---

### 方案 B：User Site（简洁 URL） - 推荐 ⭐

```bash
# 1. 先在 GitHub 上重命名仓库
# Settings → Repository name → 改为 "SalweenGuard1an.github.io"

# 2. 更新本地 remote
git remote set-url origin https://github.com/SalweenGuard1an/SalweenGuard1an.github.io.git

# 3. 删除不需要的 workflow
rm .github/workflows/deploy-with-base.yml

# 4. 提交并推送
git add .
git commit -m "fix: 修复 GitHub Pages 路由 404"
git push origin main
```

**部署后访问**: `https://salweenguard1an.github.io/`

---

## ⏱️ 预计等待时间

推送后：
1. GitHub Actions 开始构建（约 1-2 分钟）
2. 部署到 GitHub Pages（约 1-2 分钟）
3. DNS 传播（首次可能需要 5-10 分钟）

**总计**: 约 3-5 分钟

---

## ✅ 验证步骤

部署完成后，测试这些场景：

```bash
# 场景 1: 访问首页
https://你的域名/

# 场景 2: 访问博客列表
https://你的域名/blog

# 场景 3: 访问文章详情
https://你的域名/blog/welcome-to-my-blog

# 场景 4: 刷新文章页面（关键测试！）
在文章页面按 F5 刷新 → 应该正常显示，不会 404

# 场景 5: 直接在浏览器输入文章 URL
复制文章 URL → 在新标签页粘贴访问 → 应该正常显示
```

---

## 🎯 技术原理

修复包含两个关键机制：

### 1. 静态预渲染（SSG）
所有页面都被预渲染为静态 HTML：
```
/blog/welcome-to-my-blog/ → /blog/welcome-to-my-blog/index.html
```

### 2. SPA Fallback
如果预渲染的文件不存在，`404.html` 会让 Nuxt 接管路由：
```javascript
// 自动注入到 404.html
if (path !== '/404.html') {
  // Nuxt 客户端路由接管
}
```

---

## 📚 详细文档

- `DEPLOY_CHOICE.md` - 详细的部署方案对比
- `GITHUB_PAGES_FIX.md` - 技术实现细节
- `scripts/fix-github-pages.js` - 自动修复脚本

---

## 🆘 遇到问题？

### 问题：推送后还是 404

**检查清单**:
1. GitHub Actions 是否成功运行？（查看 Actions 标签页）
2. GitHub Pages 是否已启用？（Settings → Pages）
3. 使用的分支是否正确？（应该是 workflow 部署的）
4. 是否清除了浏览器缓存？

### 问题：CSS/JS 文件 404

**可能原因**: baseURL 配置不匹配

- **User Site**: 不需要 baseURL（或设为 `/`）
- **Project Site**: 需要 baseURL = `/仓库名/`

### 问题：图片显示不出来

**解决方案**:
1. 图片放在 `public/` 目录
2. 使用绝对路径：`/images/pic.jpg`
3. 或使用 Nuxt Image：`<NuxtImg src="/images/pic.jpg" />`

---

## 💡 建议

我**强烈推荐方案 B**（User Site），因为：

- ✨ URL 更简洁：`salweenguard1an.github.io`
- 🎯 无需配置 baseURL
- 💪 更好的 SEO
- 🔗 更容易分享和记忆

---

准备好了吗？选择一个方案，复制命令，开始部署吧！🚀

