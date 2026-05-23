import React from 'react'
import { Brain, Cpu, Layers } from 'lucide-react'
import type { CommissionSyllabus } from '@/data/syllabusData'
import { useTranslation } from 'react-i18next'

interface PartsListProps {
  currentSyllabus: CommissionSyllabus
}

export function SyllabusPartsList({ currentSyllabus }: PartsListProps) {
  const { t } = useTranslation()
  const tab = currentSyllabus.id
  const partT = (part: 'part1' | 'part2' | 'part3', field: 'title' | 'subtitle') =>
    t(`public.syllabus.${tab}.parts.${part}.${field}`, { defaultValue: currentSyllabus.parts[part][field] })
  const partTopics = (part: 'part1' | 'part2' | 'part3') => {
    const translated = t(`public.syllabus.${tab}.parts.${part}.topics`, { returnObjects: true }) as unknown
    if (Array.isArray(translated) && translated.length > 0) return translated as string[]
    return currentSyllabus.parts[part].topics
  }

  return (
    <div className="flex-1 flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>{t('public.mockDetails.patternTag')}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
          {t(`public.syllabus.${tab}.blueprintTitle`, { defaultValue: currentSyllabus.blueprintTitle })}
        </h2>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('public.mockDetails.patternDesc')}
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        
        {/* Part I Card */}
        <div className="p-6 rounded-2xl border bg-[var(--bg-surface)] flex flex-col gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{partT('part1', 'title')}</h4>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{partT('part1', 'subtitle')}</p>
            </div>
          </div>
          <ul className="text-xs leading-relaxed flex flex-col gap-2 pl-4 list-disc" style={{ color: 'var(--text-secondary)' }}>
            {partTopics('part1').map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* Part II Card */}
        <div className="p-6 rounded-2xl border bg-[var(--bg-surface)] flex flex-col gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{partT('part2', 'title')}</h4>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{partT('part2', 'subtitle')}</p>
            </div>
          </div>
          <ul className="text-xs leading-relaxed flex flex-col gap-2 pl-4 list-disc" style={{ color: 'var(--text-secondary)' }}>
            {partTopics('part2').map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* Part III Card */}
        <div className="p-6 rounded-2xl border bg-[var(--bg-surface)] flex flex-col gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{partT('part3', 'title')}</h4>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{partT('part3', 'subtitle')}</p>
            </div>
          </div>
          <ul className="text-xs leading-relaxed flex flex-col gap-2 pl-4 list-disc" style={{ color: 'var(--text-secondary)' }}>
            {partTopics('part3').map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
