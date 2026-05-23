import { Clock, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/shared/Badge'
import { mockAssignments } from '@/data/mockAssignments'

function getDaysLeft(dueDate: string) {
  const diff = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000)
  return diff
}

const statusMap = {
  pending:   { variant: 'warning' as const,   label: 'Pending' },
  submitted: { variant: 'info' as const,      label: 'Submitted' },
  graded:    { variant: 'success' as const,   label: 'Graded' },
  late:      { variant: 'error' as const,     label: 'Late' },
}

export function AssignmentTimeline() {
  const upcoming = mockAssignments.filter(a => a.status === 'pending' || a.status === 'late').slice(0, 4)

  return (
    <div className="card p-5">
      <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Assignments</h3>
      <div className="flex flex-col gap-3">
        {upcoming.map(a => {
          const days = getDaysLeft(a.dueDate)
          const isUrgent = days <= 2 && days >= 0
          return (
            <div key={a.id} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
              <div className="mt-0.5 flex-shrink-0">
                <AlertCircle size={15} style={{ color: isUrgent ? 'var(--color-error)' : 'var(--color-warning)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.course}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <Badge variant={statusMap[a.status].variant} size="sm">{statusMap[a.status].label}</Badge>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: days < 0 ? 'var(--color-error)' : 'var(--text-muted)' }}>
                  <Clock size={9} />
                  {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Due today' : `${days}d left`}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
