import React from 'react'
import { useTranslation } from 'react-i18next'

export function DashboardDemo() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-slate-50 dark:bg-darkbase-950">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-academic mb-4">
            {t('public.landing.featTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t('public.landing.featDesc')}
          </p>
        </header>
        <div className="relative bg-brand-950 dark:bg-darkbase-900 rounded-3xl p-4 sm:p-8 border-4 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-video">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-24 w-full animate-pulse pointer-events-none" />
          <iframe
            className="w-full h-full rounded-2xl shadow-inner border border-white/5"
            src="https://www.youtube.com/embed/4V-UfN63b_Q?rel=0&modestbranding=1"
            title="PrepPro Academy Demo — How AI transforms syllabus preparation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
