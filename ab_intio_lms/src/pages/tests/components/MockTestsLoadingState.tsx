import { useTranslation } from 'react-i18next'

export function MockTestsLoadingState() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center font-sans" style={{ color: 'var(--text-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--color-primary)' }} />
        <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.catalog.loading')}</p>
      </div>
    </div>
  )
}
