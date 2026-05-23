export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'student' | 'admin' | 'instructor'
}

export interface AuthResponse {
  user: User
}

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')

    return data
  },

  async signup(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.error || 'Signup failed')

    return result
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  },

  async getProfile(): Promise<AuthResponse | null> {
    const res = await fetch('/api/auth/profile', {
      credentials: 'include',
    })
    if (!res.ok) return null
    return res.json()
  }
}
