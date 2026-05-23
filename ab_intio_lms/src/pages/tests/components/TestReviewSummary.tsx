import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/shared/Badge'

interface TestReviewSummaryProps {
  attempt: any
  totalQuestions: number
  scoreVal: number
  pct: string
  hasPassed: boolean
}

export function TestReviewSummary({ attempt, totalQuestions, scoreVal, pct, hasPassed }: TestReviewSummaryProps) {
  const { t } = useTranslation()

  return (
    <div className="card flex flex-col items-center border-2 bg-[var(--bg-surface)] p-6 shadow-sm" style={{ borderColor: hasPassed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }}>
      <div className="mb-4 mt-1 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-lg" style={{ borderColor: hasPassed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)', background: hasPassed ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', color: hasPassed ? 'var(--color-success)' : 'var(--color-error)' }}>
        <Award className="h-10 w-10" />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">{t('dashboard.tests.review.attemptPerformance')}</span>
        <Badge variant={hasPassed ? 'success' : 'error'}>{hasPassed ? t('dashboard.tests.review.passed') : t('dashboard.tests.review.failed')}</Badge>
      </div>

      <h1 className="mb-1 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{t('dashboard.tests.review.title')}</h1>
      <p className="mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>
        {t('dashboard.tests.review.scoreAchieved')} <span style={{ color: scoreVal >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>{scoreVal.toFixed(2)}</span>
        <span className="text-sm font-normal text-[var(--text-secondary)]"> / {totalQuestions} ({pct}%)</span>
      </p>
      <p className="mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.review.passingStandard', { score: attempt.passing_score })}</p>

      <div className="grid w-full grid-cols-3 gap-3 text-center">
        <div className="flex flex-col gap-0.5 rounded-xl border bg-[var(--bg-elevated)] p-3" style={{ borderColor: 'var(--border-color)' }}>
          <span className="block text-lg font-bold text-[var(--color-success)]">{attempt.correct_answers}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('dashboard.tests.review.correct')}</span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border bg-[var(--bg-elevated)] p-3" style={{ borderColor: 'var(--border-color)' }}>
          <span className="block text-lg font-bold text-[var(--color-error)]">{attempt.wrong_answers}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('dashboard.tests.review.wrong')}</span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border bg-[var(--bg-elevated)] p-3" style={{ borderColor: 'var(--border-color)' }}>
          <span className="block text-lg font-bold text-[var(--color-muted)]">{attempt.skipped_answers}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('dashboard.tests.review.skipped')}</span>
        </div>
      </div>
    </div>
  )
}
