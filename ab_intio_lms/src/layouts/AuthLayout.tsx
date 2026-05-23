import { Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { Toaster } from 'sonner'
import { useTranslation } from 'react-i18next'

export function AuthLayout() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      {/* Left — Illustrated panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-10 w-[45%] flex-shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1060 0%, #0f1629 40%, #0a1628 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">{t('common.appName')}</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            {t('auth.panel.heading1')}<br />
            <span className="gradient-text">{t('auth.panel.heading2')}</span>
          </h2>
          <p className="text-[#94a3b8] text-lg leading-relaxed max-w-sm">
            {t('auth.panel.description')}
          </p>

          {/* Onboarding Steps for Signup */}
          <div className="mt-10 flex flex-col gap-6">
            {[
              { step: 1, title: t('auth.panel.step1'), desc: t('auth.panel.step1d') },
              { step: 2, title: t('auth.panel.step2'), desc: t('auth.panel.step2d') },
              { step: 3, title: t('auth.panel.step3'), desc: t('auth.panel.step3d') },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-white/10 text-white shrink-0 border border-white/20">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Testimonial */}
        <div className="relative z-10 glass rounded-2xl p-5">
          <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            "Preparing for the FPSC exam was incredibly stressful until I used this portal. The proctored simulators, negative marking rules, and instant section-wise analytics gave me the exact practice I needed to clear the exam with confidence."
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-xs text-white font-bold">MA</div>
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Muhammad A.</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Assistant Director (FPSC Candidate)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-8 py-5 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{t('common.appName')}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 hidden lg:block">
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
