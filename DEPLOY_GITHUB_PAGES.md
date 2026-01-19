# GitHub Pages 部署指南

## 📋 前提条件

1. 拥有 GitHub 账号
2. 代码已推送到 GitHub 仓库
3. 仓库设置为公开（Public）或者订阅了 GitHub Pro

## 🚀 部署步骤

### 方案一：用户/组织站点（推荐）

如果您的仓库名为 `username.github.io`，使用这个方案。

#### 1. 使用部署工作流

使用文件：`.github/workflows/deploy.yml`

这个工作流会将您的博客部署到：
```
https://username.github.io/
```

#### 2. 在 GitHub 仓库中启用 Pages

1. 进入仓库设置：`Settings` > `Pages`
2. Source 选择：`GitHub Actions`
3. 保存设置

#### 3. 推送代码触发部署

```bash
git add .
git commit -m "feat: 配置 GitHub Pages 自动部署"
git push origin main
```

### 方案二：项目站点

如果您的仓库名为其他名称（如 `my-blog`），使用这个方案。

#### 1. 选择正确的工作流

**选项 A：自动设置 BASE_URL**（推荐）

重命名文件：
```bash
mv .github/workflows/deploy.yml .github/workflows/deploy-backup.yml
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml
```

这会自动将您的博客部署到：
```
https://username.github.io/仓库名/
```

**选项 B：手动设置 BASE_URL**

编辑 `.github/workflows/deploy.yml`，在 Generate static site 步骤添加环境变量：

```yaml
- name: Generate static site
  run: yarn generate
  env:
    BASE_URL: /my-blog/  # 替换为你的仓库名
    NODE_ENV: production
```

#### 2. 在 GitHub 仓库中启用 Pages

同方案一的步骤 2。

#### 3. 推送代码触发部署

```bash
git add .
git commit -m "feat: 配置 GitHub Pages 自动部署"
git push origin main
```

## 🔍 检查部署状态

### 1. 查看 Actions 运行状态

1. 进入仓库的 `Actions` 标签
2. 查看最新的 workflow run
3. 等待构建和部署完成（通常 2-3 分钟）

### 2. 访问部署的网站

构建完成后，访问：
- 方案一：`https://username.github.io/`
- 方案二：`https://username.github.io/repo-name/`

## 📝 配置说明

### 工作流配置

#### 触发条件
```yaml
on:
  push:
    branches:
      - main  # 推送到 main 分支时触发
  workflow_dispatch:  # 允许手动触发
```

#### 构建步骤
1. **Checkout** - 检出代码
2. **Setup Node** - 安装 Node.js 20
3. **Install dependencies** - 安装依赖（yarn）
4. **Generate static site** - 生成静态文件
5. **Upload artifact** - 上传构建产物
6. **Deploy** - 部署到 GitHub Pages

### Nuxt 配置

在 `nuxt.config.ts` 中：

```typescript
app: {
  // 开发环境使用根路径，生产环境使用环境变量
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.BASE_URL || '/' 
    : '/',
}
```

## 🔧 自定义配置

### 修改构建命令

如果需要使用其他包管理器：

**使用 npm:**
```yaml
- name: Install dependencies
  run: npm ci

- name: Generate static site
  run: npm run generate
```

**使用 pnpm:**
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Generate static site
  run: pnpm generate
```

### 修改触发分支

如果使用 `master` 分支：

```yaml
on:
  push:
    branches:
      - master  # 改为 master
```

### 添加自定义域名

1. 在仓库根目录创建 `public/CNAME` 文件：
```
yourdomain.com
```

2. 在域名提供商设置 DNS：
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
CNAME www  username.github.io
```

3. 在 GitHub Pages 设置中输入自定义域名

## ⚠️ 常见问题

### 1. 部署失败

**检查 Actions 日志：**
- 进入 `Actions` 标签
- 点击失败的 workflow
- 查看具体错误信息

**常见错误：**

**错误：权限不足**
```
Error: Resource not accessible by integration
```
解决：检查 `Settings` > `Actions` > `Workflow permissions` 设置为 "Read and write permissions"

**错误：Pages 未启用**
```
Error: Pages deployment failed
```
解决：在 `Settings` > `Pages` 中启用 GitHub Pages

### 2. 页面显示 404

**检查 baseURL 配置：**
- 确认 `nuxt.config.ts` 中的 `baseURL` 设置正确
- 项目站点需要包含仓库名：`/repo-name/`

**清理缓存：**
```bash
rm -rf .nuxt .output
yarn generate
```

### 3. 样式或资源加载失败

**原因：** baseURL 配置不正确

**解决：**
1. 检查 `nuxt.config.ts` 的 `baseURL`
2. 确保工作流中设置了正确的 `BASE_URL` 环境变量
3. 重新部署

### 4. 部署成功但页面空白

**检查浏览器控制台：**
- 打开开发者工具（F12）
- 查看是否有 JavaScript 错误
- 检查资源加载路径是否正确

**本地测试：**
```bash
# 使用生产配置本地测试
BASE_URL=/repo-name/ NODE_ENV=production yarn generate
npx serve .output/public
```

## 🔄 更新博客

### 自动部署

每次推送到 main 分支都会自动触发部署：

```bash
# 1. 创建或编辑文章
vim content/blog/my-new-post.md

# 2. 提交并推送
git add .
git commit -m "feat: 添加新文章"
git push origin main

# 3. 等待自动部署（2-3分钟）
```

### 手动触发

在 GitHub 仓库的 `Actions` 标签：
1. 选择 "Deploy to GitHub Pages" workflow
2. 点击 "Run workflow"
3. 选择分支
4. 点击 "Run workflow" 按钮

## 📊 部署状态徽章

在 README 中添加部署状态徽章：

```markdown
![Deploy Status](https://github.com/username/repo-name/actions/workflows/deploy.yml/badge.svg)
```

## 🎯 最佳实践

1. **使用专用分支**
   - 主分支：存放源代码
   - gh-pages 分支：由 Actions 自动管理（如果使用旧方式）

2. **环境变量管理**
   - 开发环境和生产环境使用不同配置
   - 使用 `.env` 文件（不要提交到 Git）

3. **定期备份**
   - 定期推送代码到 GitHub
   - 考虑使用多个远程仓库

4. **监控部署**
   - 订阅 Actions 通知
   - 设置部署失败时的通知

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Nuxt 部署文档](https://nuxt.com/docs/getting-started/deployment)

## 🎉 完成！

现在您的博客已配置好自动部署！

每次推送代码到 GitHub，博客都会自动更新。访问您的 GitHub Pages 地址查看效果吧！

---

如有问题，请查看 GitHub Actions 日志或提交 Issue。

