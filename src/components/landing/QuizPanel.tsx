import React from 'react'
import type { QuizState } from '@/hooks/useLandingPage'

interface QuizPanelProps {
  quizState: QuizState
  onCheck: (opt: string) => void
  onReset: () => void
}

const OPTIONS = [
  { key: 'a', label: 'Application Software' },
  { key: 'b', label: 'Operating System' },
  { key: 'c', label: 'Motherboard' },
]

const CORRECT_ANSWER = 'b'

export function QuizPanel({ quizState, onCheck, onReset }: QuizPanelProps) {
  const isAnswered = quizState.answered

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-sans uppercase">
            Federal Public Service Commission (FPSC) Demo
          </span>
        </div>
        <span className="bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-mono text-xs px-3 py-1.5 rounded-full font-bold">
          Question 1 of 100
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug font-academic">
        Which of the following acts as an interface between the user and the computer hardware?
      </h3>

      <div className="space-y-4">
        {OPTIONS.map((opt) => {
          const isSelected = quizState.selected === opt.key
          const showCorrect = isAnswered && opt.key === CORRECT_ANSWER
          const showWrong = isAnswered && isSelected && !quizState.isCorrect

          return (
            <button
              key={opt.key}
              onClick={() => !isAnswered && onCheck(opt.key)}
              disabled={isAnswered}
              className={`w-full text-start px-6 py-4 border rounded-2xl transition-all font-semibold flex items-center group
                ${showWrong ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : ''}
                ${showCorrect || (isSelected && quizState.isCorrect) ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-darkbase-900'}
                ${isAnswered && !isSelected && opt.key !== CORRECT_ANSWER ? 'opacity-50' : ''}`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center me-4 text-xs font-bold transition-colors
                  ${showCorrect || (isSelected && quizState.isCorrect) ? 'bg-green-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20 text-slate-500 group-hover:text-brand-600'}`}
              >
                {opt.key.toUpperCase()}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div
          className={`mt-8 p-6 rounded-2xl border-2 ${
            quizState.isCorrect
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
          } text-slate-800 dark:text-slate-200`}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl mt-1">
              <i className={`fa-solid ${quizState.isCorrect ? 'fa-circle-check text-green-500' : 'fa-circle-xmark text-red-500'}`} />
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-2 ${quizState.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {quizState.isCorrect ? 'Correct! Operating System' : 'Incorrect. The correct answer is B.'}
              </h4>
              <p className="text-sm md:text-base leading-relaxed font-light">
                {quizState.isCorrect
                  ? 'An Operating System (OS) acts as the vital bridge (interface) between the physical computer hardware and the application software.'
                  : 'Key Concept: The Operating System is the master control program that acts as the necessary interface between the user/applications and the raw computer hardware.'}
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="mt-6 bg-white dark:bg-darkbase-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-darkbase-950 px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-rotate-right text-brand-500" /> Reset Simulation
          </button>
        </div>
      )}
    </div>
  )
}
