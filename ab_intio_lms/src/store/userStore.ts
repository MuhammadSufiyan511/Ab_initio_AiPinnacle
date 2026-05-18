import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'student' | 'instructor' | 'admin'

export interface CurrentUser {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
  joinedAt: string
}

interface UserState {
  user: CurrentUser
  setRole: (role: UserRole) => void
  setUser: (user: Partial<CurrentUser>) => void
}

const defaultUser: CurrentUser = {
  id: 'usr-001',
  name: 'Alex Johnson',
  email: 'alex@abinitio.edu',
  avatar: '',
  role: 'student',
  joinedAt: '2025-09-01',
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: defaultUser,
      setRole: (role) => set((s) => ({ user: { ...s.user, role } })),
      setUser: (partial) => set((s) => ({ user: { ...s.user, ...partial } })),
    }),
    { name: 'ab-initio-user' }
  )
)
