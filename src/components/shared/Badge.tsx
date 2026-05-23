import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary'
  size?: 'sm' | 'md'
  className?: string
}

const variantStyles: Record<string, string> = {
  default:   'bg-[rgba(99,102,241,0.12)] text-[var(--color-primary-light)]',
  success:   'bg-[rgba(34,197,94,0.12)] text-[var(--color-success)]',
  warning:   'bg-[rgba(245,158,11,0.12)] text-[var(--color-warning)]',
  error:     'bg-[rgba(239,68,68,0.12)] text-[var(--color-error)]',
  info:      'bg-[rgba(6,182,212,0.12)] text-[var(--color-info)]',
  secondary: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]',
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' }

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold flex-shrink-0 overflow-hidden', sizeMap[size], className)}
      style={{ background: 'var(--color-primary)', color: '#fff' }}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, max = 100, color = 'var(--color-primary)', className, showLabel }: ProgressBarProps) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      {showLabel && <span className="text-xs font-medium w-8 text-right" style={{ color: 'var(--text-secondary)' }}>{pct}%</span>}
    </div>
  )
}
