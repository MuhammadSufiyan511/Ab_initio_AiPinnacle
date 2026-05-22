import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, LogOut, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { Avatar } from '@/components/shared/Badge'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface TopNavbarProps {
  onSearchOpen: () => void
  sidebarCollapsed: boolean
  onToggle?: () => void
  sidebarPlacement?: 'left' | 'right'
}

export function TopNavbar({ onSearchOpen, sidebarCollapsed, onToggle, sidebarPlacement = 'left' }: TopNavbarProps) {
  const { t } = useTranslation()
  const { user, logoutStore } = useUserStore()
  const [showNotif, setShowNotif] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const navigate = useNavigate()

  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showUser && userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUser(false)
      }
      if (showNotif && notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showUser, showNotif])

  const offsetClass = sidebarCollapsed
    ? sidebarPlacement === 'right'
      ? 'md:mr-[68px]'
      : 'md:ml-[68px]'
    : sidebarPlacement === 'right'
      ? 'md:mr-[200px] lg:mr-[260px]'
      : 'md:ml-[200px] lg:ml-[260px]'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 transition-all duration-300',
        offsetClass
      )}
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {onToggle && (
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          aria-label={sidebarCollapsed ? t('dashboard.expandSidebar', 'Expand sidebar') : t('dashboard.collapseSidebar', 'Collapse sidebar')}
        >
          <Menu size={16} />
        </button>
      )}

      <button
        onClick={onSearchOpen}
        id="global-search-btn"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors flex-1 max-w-xs"
        style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
      >
        <Search size={14} />
        <span className="hidden sm:inline">{t('common.searchAnything')}</span>
        <kbd className="hidden md:inline ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
          Ctrl+K
        </kbd>
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <LanguageToggle />
        <ThemeToggle />

        <div className="relative" ref={userMenuRef}>
          <button
            id="user-menu-btn"
            onClick={() => {
              setShowUser(v => !v)
              setShowNotif(false)
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-colors hover:bg-[var(--bg-elevated)]"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <Avatar name={user?.name || ''} src={user?.avatar || ''} size="sm" />
            <span className="hidden md:inline text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {(user?.name || t('dashboard.topbar.studentFallback')).split(' ')[0]}
            </span>
            <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
          </button>

          <AnimatePresence>
            {showUser && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-11 w-52 card py-2 z-50"
              >
                <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.name || ''}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role || 'student'}</p>
                </div>
                <div className="border-t pt-1" style={{ borderColor: 'var(--border-color)' }}>
                  <button
                    onClick={async () => {
                      await logoutStore()
                      navigate('/login')
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-elevated)] transition-colors"
                    style={{ color: 'var(--color-error)' }}
                  >
                    <LogOut size={14} /> {t('common.logout')}
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
