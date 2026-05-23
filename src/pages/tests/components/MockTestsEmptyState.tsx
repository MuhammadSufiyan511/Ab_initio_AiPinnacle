import { FileText, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function MockTestsEmptyState({ filter }: { filter: string }) {
  const { t } = useTranslation()

  return (
    <div className="card col-span-full flex flex-col items-center justify-center gap-3 border-2 border-dashed bg-[var(--bg-surface)] px-8 py-12 text-center" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-elevated)] text-[var(--text-muted)]">
        <FileText size={24} />
      </div>
      <div>
        <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
          {t('dashboard.tests.catalog.emptyTitle', { filter })}
        </h4>
        <p className="mx-auto mt-1 mb-4 max-w-xs text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('dashboard.tests.catalog.emptyDesc', { filter })}
        </p>
        <Link to="/test-preparations/exam/fpsc-system-analyst" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 px-4 py-2.5 text-center text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md">
          <Play size={12} className="shrink-0" />
          <span>{t('dashboard.tests.catalog.emptyCta')}</span>
        </Link>
      </div>
    </div>
  )
}
