/**
 * 浏览量 API
 * 这是一个示例实现，使用内存存储
 * 实际项目中应该使用数据库或 KV 存储（如 Vercel KV、Upstash Redis 等）
 */

// 内存存储（仅用于演示）
const viewsStore: Record<string, number> = {}

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    // 获取浏览量
    const query = getQuery(event)
    const path = query.path as string

    if (!path) {
      return { error: 'Path is required' }
    }

    return {
      path,
      views: viewsStore[path] || 0
    }
  }

  if (method === 'POST') {
    // 增加浏览量
    const body = await readBody(event)
    const path = body.path as string

    if (!path) {
      return { error: 'Path is required' }
    }

    if (!viewsStore[path]) {
      viewsStore[path] = 0
    }

    viewsStore[path] += 1

    return {
      path,
      views: viewsStore[path]
    }
  }

  return { error: 'Method not allowed' }
})

