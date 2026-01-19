# GitHub Pages 部署选择指南

根据您的仓库 `SalweenGuard1an/SalweenBlog`，您需要选择一种部署方式。

## 🎯 推荐：选项 1 - Project Site 部署（当前配置）

**访问地址**: `https://salweenguard1an.github.io/SalweenBlog/`

### 操作步骤：

```bash
# 1. 删除不需要的 workflow（避免冲突）
rm .github/workflows/deploy.yml

# 2. 重命名 workflow
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml

# 3. 提交并推送
git add .
git commit -m "fix: 修复 GitHub Pages 路由 404 问题"
git push origin main
```

### 优点：
- ✅ 不需要占用 `username.github.io` 仓库名
- ✅ 可以部署多个项目
- ✅ 配置简单

### 缺点：
- ❌ URL 中包含仓库名（例如：`/SalweenBlog/`）

---

## 🌟 选项 2 - User Site 部署（更简洁的 URL）

**访问地址**: `https://salweenguard1an.github.io/`

### 操作步骤：

#### 步骤 1：在 GitHub 上重命名仓库

1. 进入仓库页面：`https://github.com/SalweenGuard1an/SalweenBlog`
2. 点击 **Settings**
3. 在 **Repository name** 中改为：`SalweenGuard1an.github.io`（注意大小写）
4. 点击 **Rename**

#### 步骤 2：更新本地 Git remote

```bash
# 更新 remote URL
git remote set-url origin https://github.com/SalweenGuard1an/SalweenGuard1an.github.io.git

# 验证
git remote -v
```

#### 步骤 3：删除不需要的 workflow 并推送

```bash
# 删除 project site 的 workflow
rm .github/workflows/deploy-with-base.yml

# 提交
git add .
git commit -m "fix: 修复 GitHub Pages 路由 404 问题"
git push origin main
```

### 优点：
- ✅ URL 简洁：`https://salweenguard1an.github.io/`
- ✅ 无需配置 baseURL
- ✅ 更专业的域名

### 缺点：
- ❌ 只能用于一个主项目（占用了 username.github.io）
- ❌ 其他项目需要用 project site 方式部署

---

## 🔍 如何选择？

| 场景 | 推荐方案 |
|------|---------|
| 这是您的主要/唯一博客 | **选项 2** (User Site) |
| 您计划部署多个项目到 GitHub Pages | **选项 1** (Project Site) |
| 您更在意 URL 简洁性 | **选项 2** (User Site) |
| 您不想重命名仓库 | **选项 1** (Project Site) |

---

## ✅ 部署后验证

部署成功后，在 GitHub 仓库中：

1. 进入 **Settings** → **Pages**
2. 查看 **Your site is live at** 下的 URL
3. 点击访问，测试以下功能：
   - ✅ 首页加载
   - ✅ 点击导航到博客列表
   - ✅ 点击进入文章详情
   - ✅ **刷新页面** - 应该正常显示（不会 404）
   - ✅ **直接访问** 文章 URL - 应该正常显示

---

## 📝 我的建议

考虑到这是您的个人博客，我**强烈推荐选项 2**（User Site），理由如下：

1. ✨ URL 更简洁专业：`salweenguard1an.github.io` vs `salweenguard1an.github.io/SalweenBlog`
2. 🎯 配置更简单：不需要担心 baseURL 问题
3. 💪 更好的 SEO：根域名比子目录权重更高
4. 🔗 更易分享：`cn-haoling.github.io` 更容易记忆

如果将来需要部署其他项目，可以：
- 使用其他仓库作为 project site（例如：`demo-project`）
- 或者购买自定义域名

---

## 🚨 常见问题

### Q: 如果选择选项 1，为什么还是 404？

A: 可能的原因：
1. ✅ 检查 GitHub Pages 设置中的分支是否正确（应该是 `gh-pages` 或 workflow 生成的分支）
2. ✅ 等待 GitHub Actions workflow 完成（查看 Actions 标签页）
3. ✅ 清除浏览器缓存后重试

### Q: 如果改成选项 2，原来的链接会失效吗？

A: 是的，URL 会改变：
- 旧：`https://salweenguard1an.github.io/SalweenBlog/blog/xxx`
- 新：`https://salweenguard1an.github.io/blog/xxx`

但 GitHub 会自动设置重定向（从旧仓库名到新仓库名）。

### Q: 可以使用自定义域名吗？

A: 可以！在 GitHub Pages 设置中添加自定义域名（例如 `blog.example.com`），然后：
1. 在 DNS 设置中添加 CNAME 记录
2. 在仓库根目录添加 `CNAME` 文件
3. 参考：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 📚 相关文件

已修复的文件：
- ✅ `nuxt.config.ts` - 正确读取 `NUXT_APP_BASE_URL` 环境变量
- ✅ `scripts/fix-github-pages.js` - 自动注入 SPA fallback
- ✅ `public/.nojekyll` - 禁用 Jekyll 处理
- ✅ `package.json` - 添加 `postgenerate` 钩子
- ✅ `.github/workflows/deploy.yml` - User Site workflow
- ✅ `.github/workflows/deploy-with-base.yml` - Project Site workflow

---

需要帮助？请参考 `GITHUB_PAGES_FIX.md` 了解技术细节。

