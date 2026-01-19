# GitHub Pages 部署速查卡

## 🎯 一分钟速查

### 仓库类型选择

| 类型 | 仓库名 | 访问地址 | 工作流 |
|------|--------|---------|--------|
| 用户站点 | `username.github.io` | `https://username.github.io/` | `deploy.yml` |
| 项目站点 | 任意名称 | `https://username.github.io/repo-name/` | `deploy-with-base.yml` |

### 三步部署

```bash
# 1. 推送代码
git push origin main

# 2. 启用 Pages
# Settings > Pages > Source: GitHub Actions

# 3. 等待部署（2-3 分钟）
```

## 📋 必做配置

### 用户站点（username.github.io）

✅ 无需额外配置，直接推送即可！

### 项目站点（其他名称）

```bash
# 切换到正确的工作流
rm .github/workflows/deploy.yml
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml
git add .github/workflows/
git commit -m "chore: 配置项目站点部署"
git push
```

## 🔍 快速检查

### 部署前

- [ ] 代码已推送到 GitHub
- [ ] Settings > Pages > Source = GitHub Actions
- [ ] 工作流文件存在于 `.github/workflows/`

### 部署后

- [ ] Actions 显示绿色勾号 ✅
- [ ] 可以访问博客地址
- [ ] 样式和图片正常加载

## 🐛 快速修复

### 问题：404 Not Found

```bash
# 检查 Pages 设置
# Settings > Pages > Source 必须是 "GitHub Actions"
```

### 问题：样式丢失

```bash
# 项目站点需要配置 BASE_URL
# 确保使用 deploy-with-base.yml
```

### 问题：Actions 失败

```bash
# 查看错误日志
# Actions > 点击失败的 run > 查看详细信息
```

## 📝 日常命令

### 发布新文章

```bash
git add content/blog/new-post.md
git commit -m "feat: 新文章"
git push
```

### 更新配置

```bash
git add nuxt.config.ts
git commit -m "chore: 更新配置"
git push
```

### 批量更新

```bash
git add .
git commit -m "update: 批量更新"
git push
```

## 🔗 快速链接

- **快速开始**: [QUICK_START.md](./QUICK_START.md)
- **完整文档**: [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md)
- **检查清单**: [.github/CHECKLIST.md](./.github/CHECKLIST.md)
- **配置总结**: [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)

## ⏱️ 时间预估

| 操作 | 时间 |
|------|------|
| 首次配置 | 5 分钟 |
| 首次部署 | 3-5 分钟 |
| 后续部署 | 2-3 分钟 |
| 发布文章 | < 1 分钟（写作除外）|

## 🎯 常用地址

| 类型 | 地址格式 |
|------|---------|
| 仓库 | `https://github.com/username/repo-name` |
| Actions | `https://github.com/username/repo-name/actions` |
| Settings | `https://github.com/username/repo-name/settings` |
| Pages 设置 | `https://github.com/username/repo-name/settings/pages` |

## 💡 专业提示

1. **使用 Git 标签**标记重要版本
2. **定期备份**内容到本地
3. **监控 Actions**通知部署状态
4. **批量提交**减少部署次数
5. **本地测试**再推送到远程

---

需要详细说明？查看完整文档！

