import React, { useState } from 'react'
import { AlertCircle, Award, Clock, FastForward, CheckCircle2, XCircle, ArrowRight, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ExamTestData } from '@/data/examRegistry'

interface FPSCActiveExamScreenProps {
  activeTest: ExamTestData
  questions: any[]
  currentQuestionIndex: number
  selectedOption: number | null
  isAnswered: boolean
  timeLeft: number
  sectionScores: Record<string, number>
  totalQuestions: number
  onOptionClick: (index: number) => void
  onSkip: () => void
  onAdvance: () => void
  onEndExam: () => void
}

export default function FPSCActiveExamScreen({
  activeTest,
  questions,
  currentQuestionIndex,
  selectedOption,
  isAnswered,
  timeLeft,
  sectionScores,
  totalQuestions,
  onOptionClick,
  onSkip,
  onAdvance,
  onEndExam
}: FPSCActiveExamScreenProps) {
  const [showEndConfirmModal, setShowEndConfirmModal] = useState(false)
  const currentQuestion = questions[currentQuestionIndex]
  const currentScore = Object.values(sectionScores).reduce((sum, val) => sum + val, 0)
  const isCurrentlyCorrect = selectedOption === currentQuestion?.answer
  const isSkipped = selectedOption === -1
  const showExplanation = isAnswered

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] p-0 font-sans flex justify-center w-full">
      <div className="w-full flex flex-col gap-6">

        {/* Exam Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{activeTest.course}</h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <p className="text-[10px] md:text-xs text-red-500 flex items-center gap-1 font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <AlertCircle className="w-3.5 h-3.5" /> 0.25 Negative Penalty
              </p>
              <p className="text-[10px] md:text-xs text-blue-500 flex items-center gap-1 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                <Award className="w-3.5 h-3.5" /> {totalQuestions} Questions
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 bg-[var(--bg-surface)] p-3.5 rounded-2xl border shadow-sm w-full md:w-auto" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-3 pr-4 border-r" style={{ borderColor: 'var(--border-color)' }}>
              <Clock className={cn("w-7 h-7", timeLeft < 1800 ? 'text-red-400 animate-pulse' : 'text-blue-400')} />
              <div>
                <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Time Remaining</div>
                <div className="text-base font-mono font-bold tracking-wider" style={{ color: timeLeft < 1800 ? 'var(--color-error)' : 'var(--text-primary)' }}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <div className="pr-4 border-r" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Question</div>
              <div className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{currentQuestionIndex + 1} <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>/ {totalQuestions}</span></div>
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Live Score</div>
              <div className={cn("text-base font-bold", currentScore < 0 ? 'text-red-400' : 'text-green-400')}>
                {currentScore.toFixed(2)}
              </div>
            </div>
          </div>
        </header>

        {/* Card Body */}
        <div className="card p-6 md:p-10 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
          
          <div className="w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface)] border" style={{ borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
            {currentQuestion?.category}
          </div>

          <h2 className="text-lg md:text-xl font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {currentQuestion?.question}
          </h2>

          {/* Explanation Overlay */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl border-2 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex-1">
                  {selectedOption !== null && (
                    <span className={cn("font-bold text-xs uppercase tracking-wider block mb-2", isSkipped ? 'text-yellow-400' : isCurrentlyCorrect ? 'text-green-400' : 'text-red-400')}>
                      {isSkipped ? 'Skipped! Solution Explanation:' : isCurrentlyCorrect ? 'Correct! Solution Explanation:' : 'Incorrect! Solution Explanation:'}
                    </span>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {currentQuestion?.explanation}
                  </p>
                </div>
                <button
                  onClick={onAdvance}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex-shrink-0 shadow-sm"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <span>{currentQuestionIndex + 1 === totalQuestions ? 'Submit Examination' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options grid */}
          <div className="flex flex-col gap-3">
            {currentQuestion?.options && currentQuestion.options.map((option: string, index: number) => {
              const optionLetter = ['A', 'B', 'C', 'D'][index] || '•'
              let btnBorderColor = 'var(--border-color)'
              let btnBgColor = 'var(--bg-surface)'
              let btnTextColor = 'var(--text-secondary)'
              let prefixBg = 'var(--bg-elevated)'
              let prefixText = 'var(--text-muted)'
              let prefixBorder = 'var(--border-color)'
              let displayBadge = null

              if (isAnswered) {
                if (index === currentQuestion.answer) {
                  btnBorderColor = 'var(--color-success)'
                  btnBgColor = 'rgba(16,185,129,0.08)'
                  btnTextColor = 'var(--text-primary)'
                  prefixBg = 'var(--color-success)'
                  prefixText = '#ffffff'
                  prefixBorder = 'transparent'
                  displayBadge = !isSkipped ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-400 text-[10px] font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">+1.00</span>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  ) : <CheckCircle2 className="w-5 h-5 text-green-400" />
                } else if (index === selectedOption) {
                  btnBorderColor = 'var(--color-error)'
                  btnBgColor = 'rgba(239,68,68,0.08)'
                  btnTextColor = 'var(--text-primary)'
                  prefixBg = 'var(--color-error)'
                  prefixText = '#ffffff'
                  prefixBorder = 'transparent'
                  displayBadge = (
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">-0.25</span>
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                  )
                } else {
                  btnBorderColor = 'transparent'
                  btnBgColor = 'var(--bg-base)'
                  btnTextColor = 'var(--text-muted)'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => onOptionClick(index)}
                  disabled={isAnswered}
                  className="w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-[var(--color-primary)] hover:translate-x-1"
                  style={{ borderColor: btnBorderColor, background: btnBgColor, color: btnTextColor }}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-7 h-7 rounded-xl border flex items-center justify-center font-mono text-xs font-black select-none shrink-0 transition-colors"
                      style={{ background: prefixBg, color: prefixText, borderColor: prefixBorder }}
                    >
                      {optionLetter}
                    </span>
                    <span className="text-sm font-semibold">{option}</span>
                  </div>
                  {displayBadge}
                </button>
              )
            })}
          </div>

          {/* Bottom control bar */}
          <div className="flex justify-between items-center pt-4 border-t mt-4" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setShowEndConfirmModal(true)}
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 py-2.5 px-4 rounded-xl transition-all border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10"
            >
              <XCircle className="w-4 h-4" /> End Examination
            </button>

            {!isAnswered && (
              <button
                onClick={onSkip}
                className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 py-2 px-4 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                Skip Question <FastForward className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Dynamic Custom End Confirmation Modal Overlay */}
      <AnimatePresence>
        {showEndConfirmModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 15 }}
              className="card border max-w-md w-full p-6 md:p-8 flex flex-col items-center gap-4 text-center relative overflow-hidden"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-2">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white">End Preparation Examination?</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Are you sure you want to end your examination session? Your current progress will be finalized and submitted for scoring immediately. This action is permanent and cannot be undone.
              </p>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowEndConfirmModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                >
                  Resume Test
                </button>
                <button
                  onClick={() => {
                    setShowEndConfirmModal(false)
                    onEndExam()
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-shadow shadow-md hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                >
                  End & Submit Exam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
