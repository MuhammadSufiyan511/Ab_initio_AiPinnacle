import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ensureLanguageResources } from '@/i18n'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const isUrdu = i18n.language.toLowerCase().startsWith('ur')
  const nextLanguage = isUrdu ? 'en' : 'ur'

  const switchLanguage = () => {
    window.dispatchEvent(new CustomEvent('app:language-change-start', { detail: { nextLanguage } }))
    void ensureLanguageResources(nextLanguage)
      .then(() => i18n.changeLanguage(nextLanguage))
      .finally(() => {
        window.dispatchEvent(new CustomEvent('app:language-change-end'))
      })
  }

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold hover:bg-[var(--bg-elevated)] transition-colors"
      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      aria-label={t('common.language')}
      title={t('common.language')}
    >
      <Languages size={14} />
      <span>{isUrdu ? t('common.english') : t('common.urdu')}</span>
    </button>
  )
}
