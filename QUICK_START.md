# 🚀 快速开始 - GitHub Pages 部署

## 第一步：准备 GitHub 仓库

### 1. 创建 GitHub 仓库

有两种选择：

**选项 A：用户/组织站点（推荐）**
- 仓库名：`username.github.io`（username 替换为你的 GitHub 用户名）
- 访问地址：`https://username.github.io/`

**选项 B：项目站点**
- 仓库名：任意名称（如 `my-blog`）
- 访问地址：`https://username.github.io/my-blog/`

### 2. 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 添加所有文件
git add .

# 提交
git commit -m "feat: 初始化博客"

# 推送到 main 分支
git push -u origin main
```

## 第二步：启用 GitHub Pages

1. 打开你的 GitHub 仓库
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 **Source** 下拉菜单中选择：`GitHub Actions`
5. 保存（会自动保存）

## 第三步：触发自动部署

### 方式 1：推送代码（自动触发）

每次推送到 main 分支都会自动部署：

```bash
git add .
git commit -m "update: 更新内容"
git push origin main
```

### 方式 2：手动触发

1. 进入仓库的 `Actions` 标签
2. 选择 "Deploy to GitHub Pages" workflow
3. 点击 `Run workflow` 按钮
4. 选择 `main` 分支
5. 点击绿色的 `Run workflow` 按钮

## 第四步：查看部署状态

1. 进入 `Actions` 标签
2. 查看最新的 workflow run
3. 等待构建完成（绿色勾号表示成功）
4. 构建时间约 2-3 分钟

## 第五步：访问你的博客

部署成功后，访问你的博客：

- **用户站点**：`https://username.github.io/`
- **项目站点**：`https://username.github.io/repo-name/`

## 🔧 针对项目站点的额外配置

如果你使用的是**项目站点**（非 username.github.io），需要额外配置：

### 自动配置（推荐）

使用 `deploy-with-base.yml` 工作流：

```bash
# 删除旧的工作流
rm .github/workflows/deploy.yml

# 重命名新的工作流
mv .github/workflows/deploy-with-base.yml .github/workflows/deploy.yml

# 提交更改
git add .github/workflows/
git commit -m "chore: 使用自动 BASE_URL 配置"
git push origin main
```

这会自动设置正确的 BASE_URL。

### 手动配置

或者手动编辑 `.github/workflows/deploy.yml`：

```yaml
- name: Generate static site
  run: yarn generate
  env:
    BASE_URL: /my-blog/  # 替换为你的仓库名
    NODE_ENV: production
```

## ✅ 验证部署

### 检查清单

- [ ] GitHub Actions 运行成功（绿色勾号）
- [ ] Pages 设置正确（Settings > Pages）
- [ ] 可以访问博客网址
- [ ] 样式正常显示
- [ ] 图片正常加载
- [ ] 链接正常工作

### 如果遇到问题

**1. 部署失败（红色叉号）**
- 点击失败的 workflow 查看日志
- 检查是否有依赖安装错误
- 确认 yarn.lock 文件已提交

**2. 页面显示 404**
- 检查 Pages 设置是否正确
- 确认部署完成（查看 Actions）
- 项目站点检查 BASE_URL 配置

**3. 样式丢失**
- 项目站点需要配置 BASE_URL
- 检查浏览器控制台的错误信息
- 确认 baseURL 以斜杠结尾：`/repo-name/`

## 📝 日常使用

### 创建新文章

```bash
# 1. 创建文章
vim content/blog/my-new-post.md

# 2. 本地预览
yarn dev

# 3. 提交并推送
git add .
git commit -m "feat: 添加新文章"
git push origin main

# 4. 等待自动部署（2-3 分钟）
```

### 修改配置

```bash
# 1. 修改配置文件
vim nuxt.config.ts

# 2. 本地测试
yarn dev

# 3. 提交并推送
git add .
git commit -m "chore: 更新配置"
git push origin main
```

## 🎯 进阶配置

### 添加自定义域名

1. 创建 `public/CNAME` 文件：
```bash
echo "yourdomain.com" > public/CNAME
```

2. 在域名商配置 DNS 记录

3. 在 GitHub Pages 设置中添加自定义域名

详见：[DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md#添加自定义域名)

### 修改部署分支

编辑 `.github/workflows/deploy.yml`：

```yaml
on:
  push:
    branches:
      - main  # 改为你想要的分支
```

## 📚 相关文档

- [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) - 完整部署文档
- [README.md](./README.md) - 项目说明
- [GUIDE.md](./GUIDE.md) - 使用指南

## 🎉 完成！

恭喜！你的博客已经配置好自动部署了。

每次推送代码，GitHub Actions 会自动构建和部署你的博客。

享受写作吧！✨

