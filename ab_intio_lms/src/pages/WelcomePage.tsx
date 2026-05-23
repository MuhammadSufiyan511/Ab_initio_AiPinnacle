import { lazy, Suspense } from 'react'
import HeroSection from '../components/Hero'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const LogoTicker = lazy(() =>
  import('@/components/shared/LogoTicker').then((module) => ({ default: module.LogoTicker })),
)

export default function WelcomePage() {
  const { t } = useTranslation()
  const featureItems = ['i01', 'i02', 'i03', 'i04', 'i05', 'i06'] as const
  const steps = ['s01', 's02', 's03', 's04'] as const
  const stats = ['s01', 's02', 's03', 's04'] as const

  return (
    <div className="w-full font-sans overflow-hidden" style={{ color: 'var(--text-primary)', background: 'var(--bg-base)' }}>
      <HeroSection />

      <div className="relative z-20 bg-[var(--bg-base)]">
        <Suspense fallback={<div className="h-28" />}>
          <LogoTicker />
        </Suspense>

        <section className="pt-8 pb-16 md:pt-12 md:pb-18 lg:pt-16 lg:pb-24 px-4 sm:px-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mt-2 leading-tight">
              {t('public.welcome.capabilities.title1')}<br />
              <span className="gradient-text">{t('public.welcome.capabilities.title2')}</span>
            </h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('public.welcome.capabilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {featureItems.map((k) => (
              <div key={k} className="p-6 rounded-2xl border flex flex-col gap-3.5 bg-[var(--bg-surface)] hover:shadow-md transition-all duration-300" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-xs font-bold text-blue-500">{t(`public.welcome.capabilities.items.${k}.step`)}</div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {t(`public.welcome.capabilities.items.${k}.title`)}
                  </h3>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {t(`public.welcome.capabilities.items.${k}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      <section className="py-16 md:py-20 px-4 sm:px-6 border-b bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mt-2 leading-tight">{t('public.welcome.onboarding.title')}</h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="hidden xl:block absolute top-5 left-[12%] right-[12%] h-[1px] bg-[var(--border-color)] pointer-events-none" />
            {steps.map((k) => (
              <div key={k} className="flex flex-col items-center text-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold bg-[var(--bg-surface)]" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                  {t(`public.welcome.onboarding.steps.${k}.step`)}
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t(`public.welcome.onboarding.steps.${k}.title`)}</h4>
                  <p className="text-[11px] leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>{t(`public.welcome.onboarding.steps.${k}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((k) => (
            <div key={k} className="flex flex-col gap-1">
              <span className="text-3xl font-black gradient-text">{t(`public.welcome.platformStats.${k}.metric`)}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {t(`public.welcome.platformStats.${k}.label`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-18 md:py-24 px-4 sm:px-6 relative overflow-hidden border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="text-4xl sm:text-5xl font-black leading-[1.75]">
            {t('public.welcome.finalCta.title1')}<br />
            <span className="gradient-text">{t('public.welcome.finalCta.title2')}</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
            {t('public.welcome.finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold text-white gradient-brand shadow-lg hover:shadow-xl hover:opacity-95 transition-all hover:-translate-y-0.5">
              {t('common.signUpFree')}
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold border hover:bg-[var(--bg-elevated)] transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              {t('public.welcome.finalCta.secondary')} <ChevronRight size={13} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
