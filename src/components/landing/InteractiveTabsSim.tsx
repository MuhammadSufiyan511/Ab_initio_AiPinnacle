import React from 'react'
import { useTranslation } from 'react-i18next'
import type { TabType, QuizState } from '@/hooks/useLandingPage'
import { QuizPanel } from '@/components/landing/QuizPanel'
import { FlashPanel } from '@/components/landing/FlashPanel'
import { HeatmapPanel } from '@/components/landing/HeatmapPanel'

interface TabDef {
  key: TabType
  icon: string
  iconBg: string
  iconColor: string
  titleKey: string
  descKey: string
}

const TABS: TabDef[] = [
  {
    key: 'quiz',
    icon: 'fa-gamepad',
    iconBg: 'bg-brand-100 dark:bg-brand-900',
    iconColor: 'text-brand-600 dark:text-brand-400',
    titleKey: 'public.landing.tabQuizTitle',
    descKey: 'public.landing.tabQuizDesc',
  },
  {
    key: 'flash',
    icon: 'fa-layer-group',
    iconBg: 'bg-violet-100 dark:bg-violet-900',
    iconColor: 'text-violet-600 dark:text-violet-400',
    titleKey: 'public.landing.tabFlashTitle',
    descKey: 'public.landing.tabFlashDesc',
  },
  {
    key: 'heat',
    icon: 'fa-chart-pie',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    titleKey: 'public.landing.tabHeatTitle',
    descKey: 'public.landing.tabHeatDesc',
  },
]

interface InteractiveTabsSimProps {
  activeTab: TabType
  quizState: QuizState
  flashFlipped: boolean
  onSwitchTab: (tab: TabType) => void
  onCheckAnswer: (opt: string) => void
  onResetDemo: () => void
  onFlipFlashcard: () => void
}

export function InteractiveTabsSim({
  activeTab,
  quizState,
  flashFlipped,
  onSwitchTab,
  onCheckAnswer,
  onResetDemo,
  onFlipFlashcard,
}: InteractiveTabsSimProps) {
  const { t } = useTranslation()

  return (
    <section id="features" className="py-24 bg-white dark:bg-darkbase-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm mb-3 block">
            {t('public.landing.featSubtitle')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight font-academic">
            {t('public.landing.featTitle')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('public.landing.featDesc')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Tab Buttons */}
          <div className="lg:col-span-4 space-y-4" dir="ltr">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => onSwitchTab(tab.key)}
                  id={`tab-${tab.key}`}
                  className={`w-full text-start p-6 rounded-2xl transition-all duration-300 border-2 flex gap-4 ${
                    isActive
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 shadow-sm'
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-darkbase-950/50'
                  }`}
                >
                  <div className={`w-10 h-10 ${tab.iconBg} ${tab.iconColor} rounded-xl flex items-center justify-center text-lg`}>
                    <i className={`fa-solid ${tab.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{t(tab.titleKey)}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t(tab.descKey)}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Tab Panels */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-darkbase-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg" dir="ltr">
            {activeTab === 'quiz' && (
              <div id="panel-quiz" dir="ltr" className="space-y-6">
                <QuizPanel quizState={quizState} onCheck={onCheckAnswer} onReset={onResetDemo} />
              </div>
            )}
            {activeTab === 'flash' && (
              <div id="panel-flash" dir="ltr" className="space-y-6">
                <FlashPanel flipped={flashFlipped} onFlip={onFlipFlashcard} />
              </div>
            )}
            {activeTab === 'heat' && (
              <div id="panel-heat" dir="ltr" className="space-y-6">
                <HeatmapPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
