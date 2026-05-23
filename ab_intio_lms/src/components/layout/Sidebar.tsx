import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, ClipboardList, Brain,
  Calendar, MessageSquare, BarChart3, Settings,
  Award, ChevronLeft, ChevronRight, GraduationCap, FileQuestion
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const NAV_ITEMS = [
  { key: 'dashboard.nav.dashboard', icon: LayoutDashboard, href: '/dashboard' },
  // { label: 'Courses',     icon: BookOpen,         href: '/courses' },
  // { label: 'Assignments', icon: ClipboardList,    href: '/assignments' },
  { key: 'dashboard.nav.testPreparations', icon: Brain, href: '/test-preparations' },
  { key: 'dashboard.nav.testHistory', icon: ClipboardList, href: '/test-preparations/history' },
  // { label: 'Calendar',   icon: Calendar,         href: '/calendar' },
  // { label: 'Messages',   icon: MessageSquare,    href: '/messages' },
  // { label: 'Analytics',  icon: BarChart3,        href: '/analytics' },
  // { label: 'Certificates', icon: Award,          href: '/certificates' },
  { key: 'dashboard.nav.settings', icon: Settings, href: '/settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  placement?: 'left' | 'right'
}

export function Sidebar({ collapsed, onToggle, placement = 'left' }: SidebarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const localVariants = {
    expanded: { width: isTablet ? 200 : 260, transition: { duration: 0.3, ease: 'easeInOut' as const } },
    collapsed: { width: 68, transition: { duration: 0.3, ease: 'easeInOut' as const } },
  }

  return (
    <motion.aside
      variants={localVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      className={`fixed top-0 h-full z-40 flex flex-col overflow-hidden ${placement === 'right' ? 'right-0' : 'left-0'}`}
      style={{
        background: 'var(--sidebar-bg)',
        borderLeft: placement === 'right' ? '1px solid var(--border-color)' : undefined,
        borderRight: placement === 'left' ? '1px solid var(--border-color)' : undefined,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-base whitespace-nowrap overflow-hidden"
              style={{ color: 'var(--text-primary)' }}
            >
              PrepPro
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ key, icon: Icon, href }) => {
          const label = t(key)
          const isActive = href === '/test-preparations'
            ? location.pathname.startsWith('/test-preparations') && !location.pathname.startsWith('/test-preparations/history')
            : location.pathname.startsWith(href)
          return (
            <NavLink
              key={href}
              to={href}
              onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) onToggle() }}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group',
                isActive
                  ? 'text-white'
                  : 'hover:bg-[var(--sidebar-hover)]'
              )}
              style={isActive ? { background: 'var(--color-primary)' } : { color: 'var(--text-secondary)' }}
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>
    </motion.aside>
  )
}
