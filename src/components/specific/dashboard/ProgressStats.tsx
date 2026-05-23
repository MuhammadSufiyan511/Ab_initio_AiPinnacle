import React from 'react'
import { ClipboardList, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import type { DashboardStats } from '@/hooks/useDashboardData'

interface ProgressStatsProps {
  stats: DashboardStats
}

export function ProgressStats({ stats }: ProgressStatsProps) {
  const { t } = useTranslation()
  const { totalTaken, passedCount, failedCount, avgScore } = stats

  const capsules = [
    {
      icon: <ClipboardList size={14} />,
      value: totalTaken.toString(),
      label: t('dashboard.student.totalTests'),
      colorClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      icon: <CheckCircle2 size={14} />,
      value: passedCount.toString(),
      label: t('dashboard.student.passedTests'),
      colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      icon: <XCircle size={14} />,
      value: failedCount.toString(),
      label: t('dashboard.student.failedTests'),
      colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
    {
      icon: <TrendingUp size={14} />,
      value: `${avgScore}%`,
      label: t('dashboard.student.averageMarks'),
      colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {capsules.map((s) => (
        <div
          key={s.label}
          className={cn(
            'px-4 py-2 rounded-full border flex items-center gap-2.5 text-xs font-bold shadow-sm',
            s.colorClass
          )}
        >
          {s.icon}
          <span style={{ color: 'var(--text-secondary)' }}>{s.label}:</span>
          <span style={{ color: 'var(--text-primary)' }}>{s.value}</span>
        </div>
      ))}
    </div>
  )
}
