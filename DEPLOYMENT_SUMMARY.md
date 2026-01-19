# 🎉 GitHub Pages 自动部署配置完成！

## ✅ 已完成的配置

### 1. GitHub Actions 工作流

创建了两个部署工作流文件：

#### **`.github/workflows/deploy.yml`**（用户站点）
- 适用于 `username.github.io` 仓库
- 自动部署到根域名
- 无需配置 BASE_URL

#### **`.github/workflows/deploy-with-base.yml`**（项目站点）
- 适用于其他仓库名（如 `my-blog`）
- 自动设置正确的 BASE_URL
- 部署到子路径（`/repo-name/`）

### 2. Nuxt 配置优化

**`nuxt.config.ts`**
- 添加了 `baseURL` 动态配置
- 支持环境变量 `BASE_URL`
- 开发/生产环境自动切换

```typescript
app: {
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.BASE_URL || '/' 
    : '/',
}
```

### 3. 部署文档

创建了完整的文档体系：

| 文档 | 用途 |
|------|------|
| `QUICK_START.md` | 5 分钟快速开始指南 |
| `DEPLOY_GITHUB_PAGES.md` | 完整部署文档（常见问题、故障排查）|
| `.github/CHECKLIST.md` | 部署检查清单 |
| `DEPLOYMENT_SUMMARY.md` | 本文档（配置总结）|

### 4. 辅助文件

- `.gitattributes` - Git 行尾符规范
- 更新了 `README.md` - 添加部署指引

## 🚀 如何使用

### 第一步：选择部署方式

#### 方式 A：用户/组织站点（推荐新手）

**仓库名：** `username.github.io`

**访问地址：** `https://username.github.io/`

**使用的工作流：** `deploy.yml`（默认）

**操作：** 无需额外配置，直接推送代码即可

#### 方式 B：项目站点

**仓库名：** 任意（如 `my-blog`）

**访问地址：** `https://username.github.io/my-blog/`

**使用的工作流：** `deploy-with-base.yml`

**操作：** 重命名工作流文件
```bash
rm .github/workflows/deploy.yml
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml
```

### 第二步：推送代码

```bash
# 1. 检查 Git 远程仓库
git remote -v

# 2. 如果没有，添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "feat: 配置 GitHub Pages 自动部署"

# 5. 推送
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 打开 GitHub 仓库
2. 进入 `Settings` > `Pages`
3. Source 选择：**GitHub Actions**
4. 保存（自动保存）

### 第四步：等待部署

1. 进入 `Actions` 标签
2. 查看 "Deploy to GitHub Pages" workflow
3. 等待构建完成（约 2-3 分钟）
4. 看到绿色勾号表示成功

### 第五步：访问博客

- 用户站点：`https://username.github.io/`
- 项目站点：`https://username.github.io/repo-name/`

## 📋 工作流说明

### 触发条件

自动部署会在以下情况触发：

1. **推送到 main 分支**
```bash
git push origin main
```

2. **手动触发**
- 进入 Actions 标签
- 选择工作流
- 点击 "Run workflow"

### 部署流程

```
1. Checkout 代码
   ↓
2. 安装 Node.js 20
   ↓
3. 缓存 yarn 依赖
   ↓
4. 安装依赖 (yarn install)
   ↓
5. 生成静态站点 (yarn generate)
   ↓
6. 上传构建产物
   ↓
7. 部署到 GitHub Pages
   ↓
8. 完成 ✅
```

### 构建时间

- 首次构建：约 3-5 分钟（需要安装所有依赖）
- 后续构建：约 2-3 分钟（使用缓存）

## 🔧 配置说明

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `BASE_URL` | 站点基础路径 | `/` |
| `NODE_ENV` | Node 环境 | `production` |

### 项目站点配置

如果使用项目站点，工作流会自动设置：

```yaml
env:
  BASE_URL: /${{ github.event.repository.name }}/
  NODE_ENV: production
```

这样就不需要手动配置仓库名了！

### 自定义配置

如果需要自定义 BASE_URL：

```yaml
- name: Generate static site
  run: yarn generate
  env:
    BASE_URL: /my-custom-path/
    NODE_ENV: production
```

## 📊 部署监控

### 查看部署状态

**方法 1：GitHub Actions**
- 进入仓库 Actions 标签
- 查看最新的 workflow run
- 点击查看详细日志

**方法 2：添加徽章**

在 README.md 中添加：

```markdown
![Deploy Status](https://github.com/username/repo-name/actions/workflows/deploy.yml/badge.svg)
```

### 部署通知

GitHub 会在以下情况发送通知：
- 部署成功
- 部署失败
- 部署取消

可以在 GitHub 设置中配置通知方式。

## 🐛 故障排查

### 常见问题速查

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| Actions 失败 | 依赖安装错误 | 检查 package.json 和日志 |
| 404 页面 | Pages 未启用 | Settings > Pages 设置 |
| 样式丢失 | BASE_URL 不正确 | 检查项目站点配置 |
| 构建超时 | 依赖太大 | 优化依赖或增加超时 |
| 权限错误 | Token 权限不足 | 检查 Workflow permissions |

详细故障排查：查看 [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md#常见问题)

## 🎯 日常使用

### 发布新文章

```bash
# 1. 创建文章
vim content/blog/new-post.md

# 2. 本地预览
yarn dev

# 3. 提交并推送
git add content/blog/new-post.md
git commit -m "feat: 添加新文章《标题》"
git push

# 4. 等待自动部署（2-3 分钟）
# 5. 访问博客查看
```

### 更新配置

```bash
# 1. 修改配置
vim nuxt.config.ts

# 2. 本地测试
yarn dev

# 3. 提交并推送
git add nuxt.config.ts
git commit -m "chore: 更新配置"
git push

# 4. 等待自动部署
```

### 批量更新

```bash
# 1. 修改多个文件
# 2. 本地测试
yarn dev

# 3. 一次性提交
git add .
git commit -m "update: 批量更新内容"
git push

# 4. 等待自动部署
```

## 🚀 进阶功能

### 1. 添加自定义域名

```bash
# 创建 CNAME 文件
echo "yourdomain.com" > public/CNAME

# 提交并推送
git add public/CNAME
git commit -m "chore: 添加自定义域名"
git push
```

然后在域名商配置 DNS 记录。

### 2. 使用不同包管理器

**pnpm:**
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  
- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

**npm:**
```yaml
- name: Install dependencies
  run: npm ci
```

### 3. 启用构建缓存

工作流已自动配置缓存：

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    cache: 'yarn'  # 自动缓存 yarn
```

### 4. 部署到多个环境

可以创建多个工作流：
- `deploy-prod.yml` - 生产环境
- `deploy-dev.yml` - 开发环境
- `deploy-staging.yml` - 预发布环境

## 📈 性能优化

### 减少构建时间

1. **使用 pnpm**（更快的包管理器）
2. **优化依赖**（移除不必要的包）
3. **启用并行构建**
4. **使用更强的 runner**

### 减少部署体积

1. **优化图片**（压缩、转 WebP）
2. **代码分割**（按路由分割）
3. **Tree shaking**（移除未使用代码）
4. **压缩资源**（Gzip/Brotli）

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| [QUICK_START.md](./QUICK_START.md) | 快速开始（5分钟）|
| [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) | 完整部署文档 |
| [.github/CHECKLIST.md](./.github/CHECKLIST.md) | 部署检查清单 |
| [GUIDE.md](./GUIDE.md) | 博客使用指南 |
| [CODE_BLOCK_GUIDE.md](./CODE_BLOCK_GUIDE.md) | 代码块使用说明 |

## 🎉 完成！

现在你的博客已经配置好 GitHub Pages 自动部署了！

### 下一步

1. ✅ 按照 [QUICK_START.md](./QUICK_START.md) 完成首次部署
2. ✅ 创建你的第一篇文章
3. ✅ 自定义博客配置和样式
4. ✅ 分享你的博客给朋友

### 需要帮助？

- 查看文档：[DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md)
- 查看检查清单：[.github/CHECKLIST.md](./.github/CHECKLIST.md)
- GitHub Issues：提交问题
- GitHub Discussions：参与讨论

---

**祝你写作愉快！** ✨

每次 `git push`，你的博客就会自动更新！

