import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLandingPage } from '@/hooks/useLandingPage'

import { FloatingCards } from '@/components/landing/FloatingCards'
import { TrustedAuthoritiesCarousel } from '@/components/landing/TrustedAuthoritiesCarousel'
import { StatsSection } from '@/components/landing/StatsSection'
import { DashboardDemo } from '@/components/landing/DashboardDemo'
import { InteractiveTabsSim } from '@/components/landing/InteractiveTabsSim'
import { MetricsBanner } from '@/components/landing/MetricsBanner'
import { JobsSection } from '@/components/landing/JobsSection'
import { AsymmetricBlocks } from '@/components/landing/AsymmetricBlocks'
import { FAQSection } from '@/components/landing/FAQSection'
import { FinalCTA } from '@/components/landing/FinalCTA'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    activeTab,
    flashFlipped,
    quizState,
    switchTab,
    checkAnswer,
    resetDemo,
    flipFlashcard,
  } = useLandingPage()

  return (
    <div id="main-view" className="w-full">
      <div id="home-view" className="view-section">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-slate-50/50 dark:bg-darkbase-950">
          <FloatingCards />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200/50 dark:border-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-bold mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
              </span>
              <span>{t('public.landing.heroBadge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white font-academic mb-6" dangerouslySetInnerHTML={{ __html: t('public.landing.heroTitle') }} />

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              {t('public.landing.heroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/signup')}
                className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-wand-magic-sparkles" /> {t('public.landing.btnTrySim')}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-full font-bold text-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-darkbase-900 transition-all"
              >
                {t('public.landing.navLogin')}
              </button>
            </div>
          </div>
        </section>

        <TrustedAuthoritiesCarousel />
        <StatsSection />
        <DashboardDemo />

        <InteractiveTabsSim
          activeTab={activeTab}
          quizState={quizState}
          flashFlipped={flashFlipped}
          onSwitchTab={switchTab}
          onCheckAnswer={checkAnswer}
          onResetDemo={resetDemo}
          onFlipFlashcard={flipFlashcard}
        />

        <MetricsBanner />
        <JobsSection />
        <AsymmetricBlocks />
        <FAQSection />
        <FinalCTA />
      </div>
    </div>
  )
}
