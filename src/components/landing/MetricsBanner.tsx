import React from 'react'
import { useTranslation } from 'react-i18next'

const METRICS = [
  { valueKey: 'public.landing.metric1Value', labelKey: 'public.landing.metric1Label' },
  { valueKey: 'public.landing.metric2Value', labelKey: 'public.landing.metric2Label' },
  { valueKey: 'public.landing.metric3Value', labelKey: 'public.landing.metric3Label' },
]

export function MetricsBanner() {
  const { t } = useTranslation()

  return (
    <section className="py-12 bg-[#e6f9f6] dark:bg-teal-950/20 border-y border-teal-200 dark:border-teal-900/30 text-teal-950 dark:text-teal-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-teal-300/40 rtl:divide-x-reverse font-sans">
          {METRICS.map((m, i) => (
            <div key={i} className="py-4 md:py-0">
              <p className="text-4xl font-extrabold mb-1">{t(m.valueKey)}</p>
              <p className="text-sm font-semibold text-teal-800 dark:text-teal-400">{t(m.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
