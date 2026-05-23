import { CheckCircle2, Clock, FileQuestion, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/shared/Badge'
import { cn } from '@/lib/utils'
import { normalizeMockExamTitle, logoMap, getLogoKey } from '../utils/mockTestsUtils'

interface MockTestCardProps {
  exam: any
  activeAttempt?: any
}

export function MockTestCard({ exam, activeAttempt }: MockTestCardProps) {
  const { t } = useTranslation()
  const examLogo = exam.logo_url && logoMap[getLogoKey(exam.logo_url)] ? logoMap[getLogoKey(exam.logo_url)] : null
  const answeredPct = activeAttempt && activeAttempt.total_questions > 0
    ? Math.round((activeAttempt.answered_count / activeAttempt.total_questions) * 100)
    : 0

  return (
    <div className="card group flex h-full flex-col overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl" style={{ borderColor: 'transparent' }} onMouseEnter={(event) => { event.currentTarget.style.borderColor = 'var(--color-primary)' }} onMouseLeave={(event) => { event.currentTarget.style.borderColor = 'transparent' }}>
      <div className="relative border-b p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <div className="mb-3 flex items-start justify-between">
          <div className="flex gap-1.5">
            <Badge variant="success" size="sm">{exam.category || 'FPSC'}</Badge>
            <Badge variant="info" size="sm">{t('dashboard.tests.catalog.badges.official')}</Badge>
          </div>
          <Badge variant="secondary" size="sm">{t('dashboard.tests.catalog.badges.expert')}</Badge>
        </div>

        <h3 className="mb-1 text-lg font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
          {`${exam.category || 'FPSC'} ${normalizeMockExamTitle(exam.title || exam.course || 'System Analyst')}`} {t('dashboard.tests.catalog.headerSuffix')}
        </h3>

        {exam.case_no && (
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {t('dashboard.tests.catalog.casePrefix')} {exam.case_no} {t('dashboard.tests.catalog.caseSuffix')}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <FileQuestion size={16} style={{ color: 'var(--text-muted)' }} />
              <span className="font-semibold">{exam.total_questions}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.catalog.questions')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <Clock size={16} style={{ color: 'var(--text-muted)' }} />
              <span className="font-semibold">{Math.floor(exam.duration / 60)}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.catalog.minutes')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
              <span className="font-semibold">40%</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.catalog.toPass')}</span>
            </div>
          </div>

          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-4 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
            {examLogo ? (
              <img src={examLogo} alt={exam.category || 'Exam'} className="h-10 w-10 object-contain" />
            ) : (
              <span className="text-center text-xs font-medium leading-tight" style={{ color: 'var(--text-muted)' }}>{exam.total_questions}<br />MCQs</span>
            )}
          </div>
        </div>

        {activeAttempt && (
          <div className="rounded-xl border bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            {t('dashboard.tests.catalog.resume')} {answeredPct}%
          </div>
        )}

        <div className="mt-auto border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="mb-3 text-center text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.catalog.unlimited')}</p>
          <Link to={`/test-preparations/exam/${exam.id}`} className={cn('flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg', activeAttempt ? 'bg-amber-500 hover:bg-amber-600' : 'gradient-brand')}>
            <Play size={16} className="shrink-0 fill-current" />
            {activeAttempt ? t('dashboard.tests.catalog.resume') : t('dashboard.tests.catalog.start')}
          </Link>
        </div>
      </div>
    </div>
  )
}
