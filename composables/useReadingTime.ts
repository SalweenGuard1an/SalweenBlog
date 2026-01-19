/**
 * 计算文章阅读时间
 * 基于平均阅读速度：每分钟 200-250 个中文字符
 */
export const useReadingTime = (content: any[]): number => {
  if (!content || !Array.isArray(content)) return 1

  // 递归提取文本内容
  const extractText = (nodes: any[]): string => {
    let text = ''
    
    for (const node of nodes) {
      if (node.type === 'text') {
        text += node.value || ''
      } else if (node.children) {
        text += extractText(node.children)
      }
    }
    
    return text
  }

  const fullText = extractText(content)
  
  // 计算字符数（包括中英文）
  const charCount = fullText.length
  
  // 计算阅读时间（分钟）
  // 中文约 200 字/分钟，英文约 250 词/分钟
  const readingTime = Math.ceil(charCount / 200)
  
  // 至少 1 分钟
  return Math.max(1, readingTime)
}

