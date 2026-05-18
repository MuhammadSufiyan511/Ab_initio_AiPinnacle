import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, ClipboardList, Brain,
  Calendar, MessageSquare, BarChart3, Settings,
  Award, ChevronLeft, ChevronRight, GraduationCap, FileQuestion
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { sidebarVariants } from '@/animations/variants'

const NAV_ITEMS = [
  { label: 'Dashboard',   icon: LayoutDashboard, href: '/dashboard' },
  // { label: 'Courses',     icon: BookOpen,         href: '/courses' },
  // { label: 'Assignments', icon: ClipboardList,    href: '/assignments' },
  { label: 'Test preparations', icon: Brain,      href: '/test-preparations' },
  // { label: 'Calendar',   icon: Calendar,         href: '/calendar' },
  // { label: 'Messages',   icon: MessageSquare,    href: '/messages' },
  // { label: 'Analytics',  icon: BarChart3,        href: '/analytics' },
  // { label: 'Certificates', icon: Award,          href: '/certificates' },
  { label: 'Settings',   icon: Settings,         href: '/settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      className="fixed left-0 top-0 h-full z-40 flex flex-col overflow-hidden"
      style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border-color)' }}
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
              Ab Initio LMS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = location.pathname.startsWith(href)
          return (
            <NavLink
              key={href}
              to={href}
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
