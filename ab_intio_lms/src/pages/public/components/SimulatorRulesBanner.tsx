import React from 'react'
import { ShieldCheck, AlertCircle, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SimulatorRulesBanner() {
  const { t } = useTranslation()
  return (
    <section className="max-w-6xl mx-auto px-6 w-full mt-4">
      <div className="p-8 rounded-3xl border flex flex-col gap-6 relative overflow-hidden bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{t('public.mockDetails.rulesTitle')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />,
              title: t('public.mockDetails.rules.r1.title'),
              desc: t('public.mockDetails.rules.r1.desc')
            },
            {
              icon: <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />,
              title: t('public.mockDetails.rules.r2.title'),
              desc: t('public.mockDetails.rules.r2.desc')
            },
            {
              icon: <BookOpen className="w-6 h-6 text-blue-400 shrink-0" />,
              title: t('public.mockDetails.rules.r3.title'),
              desc: t('public.mockDetails.rules.r3.desc')
            }
          ].map((rule, idx) => (
            <div key={idx} className="flex flex-col gap-3 p-5 rounded-2xl bg-[var(--bg-elevated)] border" style={{ borderColor: 'var(--border-color)' }}>
              <div className="p-2 bg-[var(--bg-surface)] w-fit rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>{rule.icon}</div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{rule.title}</h4>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
