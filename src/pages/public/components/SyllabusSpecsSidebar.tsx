import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CommissionSyllabus } from '@/data/syllabusData'
import { useTranslation } from 'react-i18next'

interface SpecsSidebarProps {
  activeTab: string
  currentSyllabus: CommissionSyllabus
}

export function SyllabusSpecsSidebar({ activeTab, currentSyllabus }: SpecsSidebarProps) {
  const { t } = useTranslation()
  const specT = (key: keyof CommissionSyllabus['specifications']) =>
    t(`public.syllabus.${activeTab}.specs.${key}`, { defaultValue: currentSyllabus.specifications[key] })

  return (
    <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-6">
      <div className="card p-6 md:p-8 border flex flex-col gap-6 bg-[var(--bg-surface)] relative overflow-hidden shadow-lg" style={{ borderColor: 'var(--border-color)' }}>
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
        <h3 className="font-extrabold text-base border-b pb-3" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>{t('public.mockDetails.specsTitle')}</h3>
        
        <div className="flex flex-col gap-4">
          {[
            { label: t('public.mockDetails.specLabels.level'), val: specT('level') },
            { label: t('public.mockDetails.specLabels.questions'), val: specT('questions') },
            { label: t('public.mockDetails.specLabels.time'), val: specT('time') },
            { label: t('public.mockDetails.specLabels.penalty'), val: specT('penalty') },
            { label: t('public.mockDetails.specLabels.passing'), val: specT('passing') }
          ].map((spec, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span style={{ color: 'var(--text-muted)' }}>{spec.label}</span>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{spec.val}</span>
            </div>
          ))}
        </div>

        {activeTab === 'FPSC' ? (
          <Link to="/test-preparations/exam/fpsc-system-analyst" className="w-full py-3.5 rounded-xl text-center text-xs font-bold text-white gradient-brand shadow-md hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
            {t('public.mockDetails.launchProctored')} <ArrowRight size={14} />
          </Link>
        ) : (
          <Link to="/test-preparations/exam/fpsc-system-analyst" className="w-full py-3.5 rounded-xl text-center text-xs font-bold text-white gradient-brand shadow-md hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
            {t('public.mockDetails.launchActiveFpsc')} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}
