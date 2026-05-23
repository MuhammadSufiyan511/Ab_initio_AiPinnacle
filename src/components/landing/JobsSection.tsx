import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface JobCard {
  icon: string
  iconBgLight: string
  iconBgDark: string
  iconColorLight: string
  iconColorDark: string
  badge: string
  titleKey: string
  descKey: string
  progressColor: string
  progressWidth: string
  hoverBorder: string
  hoverBorderDark: string
  hoverShadow: string
  titleHoverLight: string
  titleHoverDark: string
  ctaColorLight: string
  ctaColorDark: string
  ctaLabel: string
  preparing: string
}

const JOB_CARDS: JobCard[] = [
  {
    icon: 'fa-shield-halved',
    iconBgLight: 'bg-emerald-50',
    iconBgDark: 'bg-emerald-900/30',
    iconColorLight: 'text-emerald-600',
    iconColorDark: 'text-emerald-400',
    badge: 'FPSC ADV 04',
    titleKey: 'public.landing.f1Title',
    descKey: 'public.landing.f1Desc',
    progressColor: 'bg-emerald-500',
    progressWidth: 'w-3/4',
    hoverBorder: 'hover:border-emerald-500',
    hoverBorderDark: 'dark:hover:border-emerald-400',
    hoverShadow: 'hover:shadow-emerald-500/10',
    titleHoverLight: 'group-hover:text-emerald-600',
    titleHoverDark: 'dark:group-hover:text-emerald-400',
    ctaColorLight: 'text-emerald-600',
    ctaColorDark: 'dark:text-emerald-400',
    ctaLabel: 'Start Prep',
    preparing: '1,240 Preparing',
  },
  {
    icon: 'fa-user-tie',
    iconBgLight: 'bg-brand-50',
    iconBgDark: 'bg-brand-900/30',
    iconColorLight: 'text-brand-600',
    iconColorDark: 'text-brand-400',
    badge: 'MOD',
    titleKey: 'public.landing.f2Title',
    descKey: 'public.landing.f2Desc',
    progressColor: 'bg-brand-500',
    progressWidth: 'w-1/2',
    hoverBorder: 'hover:border-brand-500',
    hoverBorderDark: 'dark:hover:border-brand-400',
    hoverShadow: 'hover:shadow-brand-500/10',
    titleHoverLight: 'group-hover:text-brand-600',
    titleHoverDark: 'dark:group-hover:text-brand-400',
    ctaColorLight: 'text-brand-600',
    ctaColorDark: 'dark:text-brand-400',
    ctaLabel: 'Start Prep',
    preparing: '890 Preparing',
  },
  {
    icon: 'fa-building-columns',
    iconBgLight: 'bg-violet-50',
    iconBgDark: 'bg-violet-900/30',
    iconColorLight: 'text-violet-600',
    iconColorDark: 'text-violet-400',
    badge: 'CSS Screening',
    titleKey: 'public.landing.f3Title',
    descKey: 'public.landing.f3Desc',
    progressColor: 'bg-violet-500',
    progressWidth: 'w-full',
    hoverBorder: 'hover:border-violet-500',
    hoverBorderDark: 'dark:hover:border-violet-400',
    hoverShadow: 'hover:shadow-violet-500/10',
    titleHoverLight: 'group-hover:text-violet-500',
    titleHoverDark: '',
    ctaColorLight: 'text-violet-600',
    ctaColorDark: 'dark:text-violet-400',
    ctaLabel: 'Start Prep',
    preparing: '3,400 Preparing',
  },
]

export function JobsSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section id="jobs" className="py-24 bg-white dark:bg-darkbase-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-academic">
              {t('public.landing.jobTitle')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {t('public.landing.jobDesc')}
            </p>
          </div>
          <button
            onClick={() => navigate('/signup')}
            className="text-brand-600 dark:text-brand-400 font-bold hover:text-brand-700 text-sm flex items-center gap-2 transition-colors bg-brand-50 dark:bg-brand-950/20 px-4 py-2 rounded-full"
          >
            {t('public.landing.jobLink')} <i className="fa-solid fa-arrow-right rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOB_CARDS.map((card, idx) => (
            <article
              key={idx}
              onClick={() => navigate('/signup')}
              className={`bg-white dark:bg-darkbase-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-6 ${card.hoverBorder} ${card.hoverBorderDark} hover:shadow-xl ${card.hoverShadow} transition-all duration-300 cursor-pointer group`}
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-14 h-14 ${card.iconBgLight} ${card.iconBgDark} ${card.iconColorLight} ${card.iconColorDark} rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm`}
                  dir="ltr"
                >
                  <i className={`fa-solid ${card.icon}`} />
                </div>
                <span
                  className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                  dir="ltr"
                >
                  {card.badge}
                </span>
              </div>
              <h3
                className={`text-xl font-bold text-slate-900 dark:text-white mb-2 ${card.titleHoverLight} ${card.titleHoverDark} transition-colors font-academic`}
                dir="ltr"
              >
                {t(card.titleKey)}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium" dir="ltr">
                {t(card.descKey)}
              </p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
                <div className={`${card.progressWidth} h-full ${card.progressColor} rounded-full`} />
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-user-group text-slate-400" /> {card.preparing}
                </span>
                <span className={`${card.ctaColorLight} ${card.ctaColorDark} group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform`}>
                  {card.ctaLabel} <i className="fa-solid fa-arrow-right rtl:rotate-180 ms-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
