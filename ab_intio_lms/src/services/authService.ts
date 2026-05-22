export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'student' | 'admin' | 'instructor'
}

export interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  async login(credentials: any): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    
    // Store token if available
    if (data.token) localStorage.setItem('auth_token', data.token)
    
    return data
  },

  async signup(data: any): Promise<AuthResponse> {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.error || 'Signup failed')
    
    if (result.token) localStorage.setItem('auth_token', result.token)
    
    return result
  },

  logout() {
    localStorage.removeItem('auth_token')
  },

  getToken() {
    return localStorage.getItem('auth_token')
  }
}
