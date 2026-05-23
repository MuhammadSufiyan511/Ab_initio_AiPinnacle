import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function FinalCTA() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className="py-24 relative overflow-hidden bg-brand-600 dark:bg-darkbase-900">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 dark:from-brand-900 dark:via-violet-950 dark:to-darkbase-900 opacity-90" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-academic tracking-tight">
          {t('public.landing.ctaTitle')}
        </h2>
        <p className="text-lg text-brand-100 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          {t('public.landing.ctaDesc')}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-brand-600 dark:bg-brand-500 dark:text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform font-sans shadow-2xl"
          >
            {t('public.landing.ctaBtn')}
          </button>
        </div>
      </div>
    </section>
  )
}
