import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function PrivacyPage() {
  const { t } = useTranslation()

  const sections = ['section1', 'section2', 'section3', 'section4'] as const

  return (
    <div className="py-12 md:py-20 flex flex-col gap-10 max-w-5xl mx-auto px-6 w-full">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
        <h1 className="mt-3 text-4xl md:text-5xl font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
          {t('public.privacy.title1')} <span className="gradient-text">{t('public.privacy.title2')}</span>
        </h1>
        <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('public.privacy.subtitle')}
        </p>
      </motion.div>

      <div className="grid gap-5">
        {sections.map((section) => (
          <div key={section} className="card p-6 md:p-7 bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-color)' }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t(`public.privacy.${section}.title`)}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t(`public.privacy.${section}.body`)}
            </p>
          </div>
        ))}
      </div>

      <div className="card p-6 md:p-7 bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t('public.privacy.lastUpdatedLabel')}: <span style={{ color: 'var(--text-secondary)' }}>{t('public.privacy.lastUpdated')}</span>
        </p>
      </div>
    </div>
  )
}
