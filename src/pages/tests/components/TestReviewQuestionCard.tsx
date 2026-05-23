import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TestReviewQuestionCardProps {
  question: any
  index: number
}

export function TestReviewQuestionCard({ question, index }: TestReviewQuestionCardProps) {
  const { t } = useTranslation()
  const isCorrect = question.selected_option_index === question.correct_answer_index
  const isSkipped = question.selected_option_index === -1

  return (
    <div className="card flex flex-col gap-3 bg-[var(--bg-surface)] p-5 lg:p-6" style={{ borderColor: isCorrect ? 'rgba(34, 197, 94, 0.25)' : isSkipped ? 'var(--border-color)' : 'rgba(239, 68, 68, 0.25)' }}>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-md border bg-[var(--bg-elevated)] px-2 py-0.5 text-xs font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>{t('dashboard.tests.review.question', { index })}</span>
        {isCorrect ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500"><CheckCircle2 size={14} /> {t('dashboard.tests.review.correctLabel')}</span>
        ) : isSkipped ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500"><AlertCircle size={14} /> {t('dashboard.tests.review.skippedLabel')}</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-500"><XCircle size={14} /> {t('dashboard.tests.review.incorrectLabel')}</span>
        )}
      </div>

      <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>{question.question_text}</p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {question.options.map((option: string, optionIndex: number) => {
          const isSelected = question.selected_option_index === optionIndex
          const isCorrectOption = question.correct_answer_index === optionIndex
          return (
            <div key={optionIndex} className="flex items-center justify-between gap-2 rounded-xl border p-3 text-xs font-semibold leading-normal transition-all" style={{ borderColor: isCorrectOption ? 'var(--color-success)' : isSelected ? 'var(--color-error)' : 'var(--border-color)', background: isCorrectOption ? 'rgba(34, 197, 94, 0.08)' : isSelected ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-elevated)', color: isCorrectOption ? 'var(--color-success)' : isSelected ? 'var(--color-error)' : 'var(--text-primary)' }}>
              <span>{option}</span>
              {isCorrectOption && <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-[var(--color-success)]">✓ {t('dashboard.tests.review.correct')}</span>}
              {isSelected && !isCorrectOption && <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-[var(--color-error)]">✗ {t('dashboard.tests.review.selected')}</span>}
            </div>
          )
        })}
      </div>

      {question.explanation && (
        <div className="mt-2 rounded-lg border-l-4 bg-[var(--bg-elevated)] p-3.5 text-xs leading-normal" style={{ borderLeftColor: 'var(--color-primary)', color: 'var(--text-secondary)' }}>
          <span className="mb-1 block font-bold text-[var(--text-primary)]">{t('dashboard.tests.review.explanationTitle')}</span>
          {question.explanation}
        </div>
      )}
    </div>
  )
}
