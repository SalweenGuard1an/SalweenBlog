# GitHub Pages 部署检查清单

## 📋 部署前检查

### 1. 文件检查
- [ ] `.github/workflows/deploy.yml` 已创建
- [ ] `nuxt.config.ts` 包含 baseURL 配置
- [ ] `.gitignore` 配置正确
- [ ] `package.json` 包含正确的依赖

### 2. 仓库设置

#### 用户站点 (username.github.io)
- [ ] 仓库名为 `username.github.io`
- [ ] 使用 `deploy.yml` 工作流（无需 BASE_URL）

#### 项目站点 (其他仓库名)
- [ ] 使用 `deploy-with-base.yml` 或手动配置 BASE_URL
- [ ] `nuxt.config.ts` 中的 baseURL 配置正确

### 3. GitHub 设置
- [ ] 仓库已创建
- [ ] 代码已推送到 main 分支
- [ ] Settings > Pages > Source 设置为 "GitHub Actions"
- [ ] Settings > Actions > Workflow permissions 设置正确

### 4. 本地测试
- [ ] `yarn dev` 运行正常
- [ ] `yarn generate` 生成成功
- [ ] `.output/public` 目录包含完整文件

## 🚀 部署步骤

### 第一次部署

```bash
# 1. 检查 Git 状态
git status

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "feat: 配置 GitHub Pages 自动部署"

# 4. 推送（首次推送）
git push -u origin main

# 或者（已设置 upstream）
git push
```

### 日常更新

```bash
# 1. 修改内容（文章、配置等）

# 2. 本地测试
yarn dev

# 3. 提交并推送
git add .
git commit -m "描述你的更改"
git push
```

## ✅ 部署后验证

### 1. GitHub Actions
- [ ] Actions 标签显示绿色勾号
- [ ] 构建日志无错误
- [ ] 部署步骤全部完成

### 2. 访问网站
- [ ] 博客网址可以访问
- [ ] 首页正常显示
- [ ] 导航栏工作正常
- [ ] 文章列表显示正确

### 3. 功能测试
- [ ] 文章详情页能打开
- [ ] 代码块高亮正常
- [ ] 搜索功能工作
- [ ] 暗黑模式切换正常
- [ ] 标签页面正常

### 4. 资源检查
- [ ] CSS 样式加载正常
- [ ] 图片显示正常
- [ ] 字体加载成功
- [ ] 图标显示正确

### 5. 浏览器测试
- [ ] Chrome/Edge 显示正常
- [ ] Firefox 显示正常
- [ ] Safari 显示正常
- [ ] 移动端显示正常

## 🐛 常见问题排查

### 问题 1：Actions 失败

**检查项：**
- [ ] 查看 Actions 日志
- [ ] 检查依赖是否正确安装
- [ ] 确认 Node.js 版本兼容
- [ ] 检查 workflow 文件语法

**解决方案：**
```bash
# 本地测试构建
yarn generate

# 检查错误
cat .output/nitro.json
```

### 问题 2：404 页面

**检查项：**
- [ ] Pages 设置是否为 "GitHub Actions"
- [ ] 部署是否成功完成
- [ ] baseURL 配置是否正确（项目站点）
- [ ] 等待 DNS 传播（新域名）

**解决方案：**
```yaml
# 对于项目站点，确保设置 BASE_URL
env:
  BASE_URL: /repo-name/
  NODE_ENV: production
```

### 问题 3：样式丢失

**检查项：**
- [ ] baseURL 配置
- [ ] 浏览器控制台错误
- [ ] 资源路径是否正确
- [ ] CSS 文件是否生成

**解决方案：**
```typescript
// nuxt.config.ts
app: {
  baseURL: process.env.BASE_URL || '/',
}
```

### 问题 4：构建超时

**检查项：**
- [ ] 依赖版本是否正确
- [ ] node_modules 是否太大
- [ ] 是否有无限循环

**解决方案：**
```yaml
# 增加超时时间
jobs:
  build:
    timeout-minutes: 30  # 默认是 360
```

## 📊 性能检查

### 构建产物
- [ ] `.output/public` 大小合理（< 10MB）
- [ ] 图片已优化
- [ ] CSS/JS 已压缩

### 加载速度
- [ ] 首页加载 < 3秒
- [ ] 文章页加载 < 2秒
- [ ] Lighthouse 分数 > 90

### SEO
- [ ] 元标签正确
- [ ] 社交媒体预览正常
- [ ] sitemap.xml 生成

## 🔄 更新工作流

### 测试新配置

```bash
# 1. 创建测试分支
git checkout -b test-deploy

# 2. 修改工作流
vim .github/workflows/deploy.yml

# 3. 推送测试
git add .
git commit -m "test: 测试新部署配置"
git push origin test-deploy

# 4. 手动触发 Actions 测试

# 5. 确认无误后合并到 main
git checkout main
git merge test-deploy
git push origin main
```

## 📝 维护清单

### 每周
- [ ] 检查 Actions 是否正常运行
- [ ] 查看部署日志
- [ ] 检查网站可访问性

### 每月
- [ ] 更新依赖
- [ ] 检查安全漏洞
- [ ] 清理无用文件
- [ ] 优化构建速度

### 每季度
- [ ] 审查部署策略
- [ ] 更新 Node.js 版本
- [ ] 性能优化
- [ ] 备份内容

## 🎯 优化建议

### 构建速度
- 使用 pnpm 替代 yarn（更快）
- 启用依赖缓存
- 减少不必要的依赖

### 部署频率
- 批量提交而非频繁提交
- 使用 draft 功能预览
- 合并 PR 时自动部署

### 安全性
- 定期更新依赖
- 启用 Dependabot
- 检查 workflow 权限

## 📚 相关文档

- [GitHub Pages 文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [DEPLOY_GITHUB_PAGES.md](../DEPLOY_GITHUB_PAGES.md)
- [QUICK_START.md](../QUICK_START.md)

---

完成以上检查后，你的博客应该能够成功部署到 GitHub Pages！

