import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, MessageSquare, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOBILE_NAV = [
  { label: 'Home',     icon: LayoutDashboard, href: '/dashboard' },
  // { label: 'Courses',  icon: BookOpen,        href: '/courses' },
  // { label: 'Messages', icon: MessageSquare,   href: '/messages' },
  // { label: 'Analytics',icon: BarChart3,       href: '/analytics' },
  { label: 'Settings', icon: Settings,        href: '/settings' },
]

export function MobileBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
      style={{ background: 'var(--sidebar-bg)', borderTop: '1px solid var(--border-color)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {MOBILE_NAV.map(({ label, icon: Icon, href }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            cn('flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors',
              isActive ? '' : 'opacity-50')
          }
          style={({ isActive }) => ({ color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)' })}
        >
          {({ isActive }) => (
            <>
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
