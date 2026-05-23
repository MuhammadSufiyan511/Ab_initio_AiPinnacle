import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && (
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
        >
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

interface SkeletonProps { className?: string }

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton h-4 w-full', className)} />
}

export function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <Skeleton className="h-36 rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('animate-spin', className)}
      style={{ color: 'var(--color-primary)' }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
