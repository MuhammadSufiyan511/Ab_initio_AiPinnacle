import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
  accent?: string
  className?: string
}

export function StatCard({ label, value, icon, trend, accent = 'var(--color-primary)', className }: StatCardProps) {
  return (
    <div className={cn('card p-5 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200', className)}>
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}18`, color: accent }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: trend.positive ? '#22c55e18' : '#ef444418',
              color: trend.positive ? '#22c55e' : '#ef4444',
            }}
          >
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      </div>
    </div>
  )
}
