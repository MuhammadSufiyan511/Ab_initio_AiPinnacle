import React from 'react'
import { useTranslation } from 'react-i18next'

export function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-slate-50/30 dark:bg-darkbase-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
          {t('public.landing.trustedTitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <p className="text-5xl sm:text-6xl font-black text-brand-600 dark:text-brand-500 mb-2">
              {t('public.landing.statsQuestionsValue')}
            </p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-300">
              {t('public.landing.statsQuestionsLabel')}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {t('public.landing.statsQuestionsSub')}
            </p>
          </div>
          <div>
            <p className="text-5xl sm:text-6xl font-black text-brand-600 dark:text-brand-500 mb-2">
              {t('public.landing.statsMasteryValue')}
            </p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-300">
              {t('public.landing.statsMasteryLabel')}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {t('public.landing.statsMasterySub')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
