import React, { useState } from 'react'
import { FileText, Clock, CheckCircle2, ShieldAlert, PlayCircle, CheckSquare, Square } from 'lucide-react'
import type { ExamTestData } from '@/data/examRegistry'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface FPSCStartScreenProps {
  activeTest: ExamTestData
  totalQuestions: number
  sidebarCollapsed: boolean
  onLaunch: () => void
}

export default function FPSCStartScreen({ activeTest, totalQuestions, sidebarCollapsed, onLaunch }: FPSCStartScreenProps) {
  const [declared, setDeclared] = useState(true)
  const { t } = useTranslation()

  return (
    <div className="card p-4 sm:p-6 lg:p-8 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
      <div className="bg-[var(--bg-surface)] p-4 sm:p-6 rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <FileText className="w-4 h-4 text-blue-500" /> {t('dashboard.quiz.start.title')}
        </h3>

        <div className={cn('grid gap-4 grid-cols-1', sidebarCollapsed ? 'md:grid-cols-3' : 'md:grid-cols-2', 'lg:grid-cols-3')}>
          {activeTest.sections.map((section, idx) => (
            <div
              key={section.id}
              className="p-4 rounded-xl border flex flex-col gap-2 relative overflow-hidden transition-all hover:border-[var(--color-primary)] bg-[var(--bg-elevated)]"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-xl flex items-center justify-center font-mono text-[10px] font-bold opacity-30 bg-blue-500/10 text-blue-500">
                0{idx + 1}
              </div>
              <span className="text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-primary)' }}>{section.id}</span>
              <h4 className="text-xs font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{section.name}</h4>
              <p className="text-[10px] mt-auto font-medium" style={{ color: 'var(--text-secondary)' }}>
                {section.questions.length} {t('dashboard.quiz.start.sectionsMarks')}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={cn('grid gap-4 grid-cols-1', sidebarCollapsed ? 'md:grid-cols-2' : 'md:grid-cols-1', 'lg:grid-cols-2')}>
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <Clock className="w-8 h-8 text-yellow-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{t('dashboard.quiz.start.timeAllowed')}</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {Math.floor(activeTest.duration / 60)} {t('dashboard.quiz.start.timeDescription')}
            </p>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{t('dashboard.quiz.start.qualifyingStandard')}</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {t('dashboard.quiz.start.qualifyingDescription', {
                score: activeTest.passingScore,
                marks: Math.round(totalQuestions * activeTest.passingScore / 100),
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--color-error)' }}>
        <ShieldAlert className="w-8 h-8 text-red-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm mb-1 text-red-500">{t('dashboard.quiz.start.negativeMarking')}</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('dashboard.quiz.start.negativeMarkingDescription')}
          </p>
        </div>
      </div>

      <div
        className="p-4 rounded-2xl border flex items-start gap-3 cursor-pointer select-none transition-all hover:bg-[var(--bg-elevated)]"
        style={{ borderColor: declared ? 'var(--color-primary)' : 'var(--border-color)', background: 'var(--bg-surface)' }}
        onClick={() => setDeclared(!declared)}
      >
        <div className="mt-0.5" style={{ color: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}>
          {declared ? <CheckSquare size={18} /> : <Square size={18} />}
        </div>
        <div>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('dashboard.quiz.start.declarationTitle')}</p>
          <p className="text-[11px] mt-1 leading-normal" style={{ color: 'var(--text-muted)' }}>
            {t('dashboard.quiz.start.declarationBody', { questions: totalQuestions })}
          </p>
        </div>
      </div>

      <button
        onClick={onLaunch}
        disabled={!declared}
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}
      >
        <PlayCircle className="w-5 h-5" />
        <span>{t('dashboard.quiz.start.startExam')}</span>
      </button>
    </div>
  )
}
