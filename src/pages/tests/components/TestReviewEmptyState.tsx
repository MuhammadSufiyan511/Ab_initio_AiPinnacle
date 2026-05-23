import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function TestReviewEmptyState() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 font-sans" style={{ color: 'var(--text-primary)' }}>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.review.notFound')}</p>
      <Link to="/test-preparations/history" className="gradient-brand inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white">
        <ArrowLeft size={14} /> {t('dashboard.tests.review.backToHistory')}
      </Link>
    </div>
  )
}
