import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, LogOut, User, Shield, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Avatar } from '@/components/shared/Badge'
import { useUserStore, type UserRole } from '@/store/userStore'
import { mockNotifications } from '@/data/mockQuizzes'
import { cn } from '@/lib/utils'

interface TopNavbarProps {
  onSearchOpen: () => void
  sidebarCollapsed: boolean
  onToggle?: () => void
}

const ROLES: { role: UserRole; label: string; icon: React.ReactNode }[] = [
  { role: 'student',    label: 'Student View',    icon: <User size={14} /> },
  { role: 'instructor', label: 'Instructor View', icon: <Shield size={14} /> },
  { role: 'admin',      label: 'Admin View',      icon: <Shield size={14} /> },
]

export function TopNavbar({ onSearchOpen, sidebarCollapsed, onToggle }: TopNavbarProps) {
  const { user, setRole } = useUserStore()
  const [showNotif, setShowNotif] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const navigate = useNavigate()
  const unread = mockNotifications.filter(n => !n.read).length

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-3 px-4 transition-all duration-300"
      style={{
        height: 'var(--navbar-height)',
        left: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Hamburger Toggle */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={16} />
        </button>
      )}

      {/* Search trigger */}
      <button
        onClick={onSearchOpen}
        id="global-search-btn"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors flex-1 max-w-xs"
        style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
      >
        <Search size={14} />
        <span className="hidden sm:inline">Search anything...</span>
        <kbd className="hidden md:inline ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>⌘K</kbd>
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />

        {/* 
          Notifications Dropdown:
          - Queries `mockNotifications` data to filter out unread notifications and show an indicators count.
          - Utilizes Framer Motion's `AnimatePresence` and `motion.div` for premium fluid layout transitions.
          - Conditionally toggles visibility state and handles simple unread highlighting.
        */}
        {/*
        <div className="relative">
          <button id="notif-btn" onClick={() => { setShowNotif(v => !v); setShowUser(false) }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-colors hover:bg-[var(--bg-elevated)]"
            style={{ borderColor: 'var(--border-color)' }}>
            <Bell size={16} style={{ color: 'var(--text-secondary)' }} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: 'var(--color-error)' }}>{unread}</span>
            )}
          </button>
          <AnimatePresence>
            {showNotif && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-11 w-72 card py-2 z-50 overflow-hidden">
                <p className="px-4 py-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>NOTIFICATIONS</p>
                {mockNotifications.map(n => (
                  <div key={n.id} className={cn('px-4 py-3 text-sm cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors', !n.read && 'border-l-2')} style={!n.read ? { borderColor: 'var(--color-primary)' } : {}}>
                    <p style={{ color: 'var(--text-primary)' }} className="leading-snug">{n.message}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        */}

        {/* User menu */}
        <div className="relative">
          <button id="user-menu-btn" onClick={() => { setShowUser(v => !v); setShowNotif(false) }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-colors hover:bg-[var(--bg-elevated)]"
            style={{ borderColor: 'var(--border-color)' }}>
            <Avatar name={user.name} src={user.avatar} size="sm" />
            <span className="hidden md:inline text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.name.split(' ')[0]}</span>
            <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
          </button>
          <AnimatePresence>
            {showUser && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-11 w-52 card py-2 z-50">
                <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                </div>
                {/*
                <div className="py-1">
                  <p className="px-4 py-1 text-[10px] font-semibold tracking-wider" style={{ color: 'var(--text-muted)' }}>SWITCH ROLE</p>
                  {ROLES.map(r => (
                    <button key={r.role} onClick={() => { setRole(r.role); setShowUser(false); navigate('/dashboard') }}
                      className={cn('w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--bg-elevated)]', user.role === r.role && 'font-semibold')}
                      style={{ color: user.role === r.role ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                      {r.icon} {r.label}
                    </button>
                  ))}
                </div>
                */}
                <div className="border-t pt-1" style={{ borderColor: 'var(--border-color)' }}>
                  <button onClick={() => navigate('/login')} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-elevated)] transition-colors" style={{ color: 'var(--color-error)' }}>
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
