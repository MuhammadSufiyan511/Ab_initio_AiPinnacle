import { create } from 'zustand'

export type UserRole = 'student' | 'instructor' | 'admin'

export interface CurrentUser {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  role?: UserRole
  joinedAt?: string
}

interface UserState {
  user: CurrentUser | null
  setRole: (role: UserRole) => void
  setUser: (user: CurrentUser | null) => void
  fetchProfile: () => Promise<boolean>
  updateProfile: (data: Partial<CurrentUser>) => Promise<boolean>
  logoutStore: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  (set, get) => ({
    user: null,
    setRole: (role) => set((s) => ({ user: s.user ? { ...s.user, role } : null })),
    setUser: (user) => set({ user }),
    fetchProfile: async () => {
      try {
        const res = await fetch('/api/auth/profile', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          set({ user: { ...data.user, role: 'student' } })
          return true
        }
      } catch {
        // Silently handle network errors
      }
      set({ user: null })
      return false
    },
    updateProfile: async (data) => {
      try {
        const res = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data)
        })
        if (res.ok) {
          const resData = await res.json()
          set((s) => ({ user: { ...s.user, ...resData.user } }))
          return true
        }
      } catch {
        // Silently handle network errors
      }
      return false
    },
    logoutStore: async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      } catch {
        // Silently handle network errors
      }
      set({ user: null })
    }
  })
)
