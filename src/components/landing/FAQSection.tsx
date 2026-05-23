import React from 'react'
import { useTranslation } from 'react-i18next'

const FAQ_ITEMS = [
  { qKey: 'public.landing.faq1Q', aKey: 'public.landing.faq1A' },
  { qKey: 'public.landing.faq2Q', aKey: 'public.landing.faq2A' },
  { qKey: 'public.landing.faq3Q', aKey: 'public.landing.faq3A' },
  { qKey: 'public.landing.faq4Q', aKey: 'public.landing.faq4A' },
  { qKey: 'public.landing.faq5Q', aKey: 'public.landing.faq5A' },
]

export function FAQSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-white dark:bg-darkbase-900 cv-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-academic mb-4">
            {t('public.landing.faqTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t('public.landing.faqSubtitle')}
          </p>
        </header>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className="group bg-slate-50 dark:bg-darkbase-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex justify-between items-center font-bold text-lg text-slate-950 dark:text-white font-academic">
                <span>{t(item.qKey)}</span>
                <span className="transition-transform group-open:rotate-180 text-brand-600 dark:text-brand-400">
                  <i className="fa-solid fa-chevron-down" />
                </span>
              </summary>
              <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-light text-sm font-sans">
                {t(item.aKey)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
