import React from 'react'
import { Award, AlertCircle, RotateCcw, Target, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExamTestData } from '@/data/examRegistry'
import { useTranslation } from 'react-i18next'

interface FPSCResultsScreenProps {
  activeTest: ExamTestData
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  skippedAnswers: number
  sectionScores: Record<string, number>
  timeLeft: number
  onRetake: () => void
}

export default function FPSCResultsScreen({
  activeTest,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  skippedAnswers,
  sectionScores,
  timeLeft,
  onRetake
}: FPSCResultsScreenProps) {
  const { t } = useTranslation()
  const PENALTY = (activeTest as any).negativeMarking ?? (activeTest as any).negative_marking ?? 0.25
  const totalScore = Object.values(sectionScores).reduce((sum, val) => sum + val, 0)
  const totalDeductions = wrongAnswers * PENALTY

  const calculatedPercentage = Math.max(0, Math.min(100, (totalScore / totalQuestions) * 100)).toFixed(1)
  const hasPassed = parseFloat(calculatedPercentage) >= activeTest.passingScore

  const sectionBreakdowns = activeTest.sections.map((section) => {
    const score = sectionScores[section.id] ?? 0
    const total = section.questions.length
    const pct = total > 0 ? Math.max(0, Math.min(100, (score / total) * 100)) : 0
    return {
      name: section.name,
      score: pct,
      id: section.id,
      marks: score,
    }
  })

  const sortedBreakdowns = [...sectionBreakdowns].sort((a, b) => a.score - b.score)
  const weakestSection = sortedBreakdowns[0]

  return (
    <div
      className="card relative overflow-hidden p-8 lg:p-10 border-2 flex flex-col items-center"
      style={{ borderColor: hasPassed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 py-2.5 text-white font-black tracking-widest text-[10px] uppercase shadow-sm text-center"
        style={{ background: hasPassed ? 'var(--color-success)' : 'var(--color-error)' }}
      >
        {hasPassed ? t('dashboard.quiz.results.passed') : t('dashboard.quiz.results.failed')}
      </div>

      <div className={cn(
        'w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg mb-4 mt-6',
        hasPassed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      )}>
        <Award className="w-10 h-10" />
      </div>

      <h1 className="text-3xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>
        {t('dashboard.quiz.results.title')}
      </h1>
      <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
        {timeLeft === 0 ? t('dashboard.quiz.results.summaryExpired') : t('dashboard.quiz.results.summaryPassed')}{' '}
        {t('dashboard.quiz.results.qualifyingStandard', {
          score: activeTest.passingScore,
          marks: Math.round(totalQuestions * activeTest.passingScore / 100),
        })}
      </p>

      <div className="grid grid-cols-3 gap-4 w-full mb-6">
        <div className="bg-[var(--bg-surface)] p-4 rounded-2xl border-l-4 border flex flex-col gap-1 shadow-sm" style={{ borderColor: 'var(--border-color)', borderLeftColor: 'var(--color-success)' }}>
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.results.correct')}</span>
          <span className="text-xl font-black text-green-400 leading-none">{correctAnswers}</span>
        </div>
        <div className="bg-[var(--bg-surface)] p-4 rounded-2xl border-l-4 border flex flex-col gap-1 shadow-sm" style={{ borderColor: 'var(--border-color)', borderLeftColor: 'var(--color-error)' }}>
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.results.wrong')}</span>
          <span className="text-xl font-black text-red-400 leading-none">{wrongAnswers}</span>
        </div>
        <div className="bg-[var(--bg-surface)] p-4 rounded-2xl border-l-4 border flex flex-col gap-1 shadow-sm" style={{ borderColor: 'var(--border-color)', borderLeftColor: 'var(--color-warning)' }}>
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.results.skipped')}</span>
          <span className="text-xl font-black text-yellow-400 leading-none">{skippedAnswers}</span>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl p-5 w-full text-left border mb-6 flex flex-col gap-4" style={{ borderColor: 'var(--border-color)' }}>
        {sectionBreakdowns.map((sec) => (
          <div key={sec.id} className="flex flex-col gap-1.5 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {sec.name} ({activeTest.sections.find(s => s.id === sec.id)?.questions.length} {t('dashboard.quiz.results.sectionMarks')})
              </span>
              <div className="text-right">
                <span className="font-mono font-bold" style={{ color: 'var(--color-primary)' }}>{sec.marks.toFixed(2)}</span>
                <span className="text-[10px] ml-1.5" style={{ color: 'var(--text-muted)' }}>({sec.score.toFixed(0)}%)</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${sec.score}%`,
                  background: sec.score >= activeTest.passingScore ? 'var(--color-success)' : 'var(--color-warning)',
                }}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pb-2 border-b text-red-400" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> {t('dashboard.quiz.results.negativePenalty')}
          </span>
          <span className="text-sm font-bold">-{totalDeductions.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-end pt-2">
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text-primary)' }}>{t('dashboard.quiz.results.aggregateScore')}</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.results.totalOutOf', { total: totalQuestions })}</span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black" style={{ color: hasPassed ? 'var(--color-success)' : 'var(--color-error)' }}>
              {totalScore.toFixed(2)}
            </span>
            <div className="text-xs font-bold mt-0.5" style={{ color: hasPassed ? 'var(--color-success)' : 'var(--color-error)' }}>
              {calculatedPercentage}%
            </div>
          </div>
        </div>
      </div>

      {weakestSection && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5 mb-6 text-left w-full">
          <h3 className="text-yellow-500 font-bold text-xs uppercase flex items-center gap-2 mb-2">
            <Target className="w-4 h-4" /> {t('dashboard.quiz.results.syllabusAnalysis')}
          </h3>
          <p className="text-xs leading-normal mb-2" style={{ color: 'var(--text-secondary)' }}>
            {t('dashboard.quiz.results.weakestIntro')} <strong style={{ color: 'var(--text-primary)' }}>{weakestSection.name}</strong>, {t('dashboard.quiz.results.weakestScored', { score: weakestSection.score.toFixed(1) })}.
          </p>
          <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
            <BookOpen className="w-3.5 h-3.5 inline mr-1" /> {t('dashboard.quiz.results.coreRecommendation')} {activeTest.sections.find(s => s.id === weakestSection.id)?.studyTip}
          </p>
        </div>
      )}

      <button
        onClick={onRetake}
        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-md"
        style={{ background: 'var(--color-primary)' }}
      >
        <RotateCcw className="w-5 h-5" />
        <span>{t('dashboard.quiz.results.retake')}</span>
      </button>
    </div>
  )
}
