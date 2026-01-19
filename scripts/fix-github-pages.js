#!/usr/bin/env node

/**
 * GitHub Pages SPA Fallback 修复脚本
 * 将 404.html 内容复制并修改为 SPA fallback
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '../.output/public')
const notFoundPath = path.join(publicDir, '404.html')
const indexPath = path.join(publicDir, '200.html')

console.log('📝 Fixing GitHub Pages SPA routing...')

try {
  // 检查 200.html 是否存在
  if (fs.existsSync(indexPath)) {
    console.log('✅ 200.html already exists')
  } else {
    console.log('⚠️  200.html not found')
  }

  // 检查 404.html 是否存在
  if (fs.existsSync(notFoundPath)) {
    console.log('✅ 404.html exists')
    
    // 读取 404.html 内容
    const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8')
    
    // 为了更好的 SPA 支持，我们需要修改 404.html
    // 使其在客户端尝试加载正确的路由
    const spaFallbackScript = `
<script>
  // GitHub Pages SPA 路由回退
  (function() {
    const path = window.location.pathname;
    // 如果不是真正的 404 页面，尝试客户端路由
    if (path !== '/404.html' && path !== '/404') {
      // Nuxt 会接管路由
      console.log('SPA fallback for:', path);
    }
  })();
</script>
`
    
    // 在 </body> 前插入脚本
    let modifiedContent = notFoundContent
    if (notFoundContent.includes('</body>')) {
      modifiedContent = notFoundContent.replace('</body>', spaFallbackScript + '</body>')
      fs.writeFileSync(notFoundPath, modifiedContent, 'utf-8')
      console.log('✅ Updated 404.html with SPA fallback')
    }
  } else {
    console.log('⚠️  404.html not found, creating one...')
    
    // 如果 404.html 不存在，从 200.html 创建
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath)
      console.log('✅ Created 404.html from 200.html')
    }
  }

  // 确保 .nojekyll 存在
  const nojekyllPath = path.join(publicDir, '.nojekyll')
  if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '', 'utf-8')
    console.log('✅ Created .nojekyll file')
  }

  console.log('✨ GitHub Pages SPA routing fixed!')
} catch (error) {
  console.error('❌ Error fixing GitHub Pages routing:', error)
  process.exit(1)
}

