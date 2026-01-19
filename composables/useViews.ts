/**
 * 浏览量统计
 * 使用 localStorage 存储（客户端）或调用 API（服务端）
 */
export const useViews = (path: string): Ref<number> => {
  const views = ref(0)

  // 客户端逻辑
  if (process.client) {
    // 从 localStorage 获取浏览量
    const storageKey = `views_${path}`
    const storedViews = localStorage.getItem(storageKey)
    
    if (storedViews) {
      views.value = parseInt(storedViews, 10)
    } else {
      // 首次访问，设置初始值
      views.value = Math.floor(Math.random() * 100) + 50
      localStorage.setItem(storageKey, views.value.toString())
    }

    // 增加浏览量
    views.value += 1
    localStorage.setItem(storageKey, views.value.toString())

    // 可选：调用 API 记录到服务端
    // $fetch('/api/views', {
    //   method: 'POST',
    //   body: { path }
    // }).catch(() => {})
  } else {
    // 服务端渲染时的默认值
    views.value = 128
  }

  return views
}

/**
 * 获取所有文章的总浏览量
 */
export const useTotalViews = (): Ref<number> => {
  const totalViews = ref(0)

  if (process.client) {
    // 统计所有文章的浏览量
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('views_')) {
        const value = localStorage.getItem(key)
        if (value) {
          totalViews.value += parseInt(value, 10)
        }
      }
    }
  }

  return totalViews
}

