const DEFAULT_TIMEOUT = 10000

interface RequestOptions extends RequestInit {
  timeout?: number
}

export async function apiFetch(path: string, options: RequestOptions = {}) {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(path, {
      ...fetchOptions,
      credentials: 'include',
      signal: controller.signal,
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}
