import React, { useState } from 'react'
import { AlertCircle, Award, Clock, FastForward, CheckCircle2, XCircle, ArrowRight, ShieldAlert, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ExamTestData } from '@/data/examRegistry'
import { useTranslation } from 'react-i18next'

interface FPSCActiveExamScreenProps {
  activeTest: ExamTestData
  questions: any[]
  currentQuestionIndex: number
  selectedOption: number | null
  isAnswered: boolean
  timeLeft: number
  sectionScores: Record<string, number>
  totalQuestions: number
  examLogo?: string | null
  sidebarCollapsed: boolean
  onOptionClick: (index: number) => void
  onSkip: () => void
  onAdvance: () => void
  onEndExam: () => void
  onResetExam: () => void
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
  examLogo,
  sidebarCollapsed,
  onOptionClick,
  onSkip,
  onAdvance,
  onEndExam,
  onResetExam,
}: FPSCActiveExamScreenProps) {
  const { t, i18n } = useTranslation()
  const [showEndConfirmModal, setShowEndConfirmModal] = useState(false)
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false)
  const currentQuestion = questions[currentQuestionIndex]
  const currentScore = Object.values(sectionScores).reduce((sum, val) => sum + val, 0)
  const isCurrentlyCorrect = selectedOption === currentQuestion?.answer
  const isSkipped = selectedOption === -1
  const showExplanation = isAnswered
  const isRTL = i18n.dir() === 'rtl' || i18n.language?.toLowerCase().startsWith('ur')

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const explanationLabel = isSkipped
    ? t('dashboard.quiz.active.skippedSolution')
    : isCurrentlyCorrect
      ? t('dashboard.quiz.active.correctSolution')
      : t('dashboard.quiz.active.incorrectSolution')

  return (
    <div dir="ltr" className="quiz-ltr min-h-screen bg-[var(--bg-base)] p-0 font-sans flex justify-center w-full text-left">
      <div className="w-full flex flex-col gap-6">
        <header
          className={cn(
            'flex flex-col pb-4 border-b gap-4',
            sidebarCollapsed
              ? 'md:flex-row md:items-center md:justify-between'
              : 'md:flex-col md:items-start lg:flex-row lg:items-center lg:justify-between'
          )}
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {`${activeTest.category || 'FPSC'} ${
                (activeTest.title || activeTest.course || 'System Analyst')
                  .replace(/Mock Exam/ig, '')
                  .replace(/Proctored Simulation/ig, '')
                  .replace(/Simulation/ig, '')
                  .replace(/Mock/ig, '')
                  .trim()
              } ${t('dashboard.quiz.active.officialExam')}`}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <p className="text-[10px] md:text-xs text-red-500 flex items-center gap-1 font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <AlertCircle className="w-3.5 h-3.5" /> {t('dashboard.quiz.active.negativePenalty')}
              </p>
              <p className="text-[10px] md:text-xs text-blue-500 flex items-center gap-1 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                <Award className="w-3.5 h-3.5" /> {totalQuestions} {t('dashboard.quiz.active.questions')}
              </p>
            </div>
          </div>

          <div
            className={cn(
              'flex items-center justify-between gap-2 sm:gap-4 bg-[var(--bg-surface)] p-2.5 sm:p-3.5 rounded-2xl border shadow-sm w-full',
              sidebarCollapsed ? 'md:w-auto' : 'md:w-full lg:w-auto'
            )}
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div
              className={cn(
                'flex items-center gap-2 sm:gap-3',
                isRTL ? 'pl-2 sm:pl-4 border-l' : 'pr-2 sm:pr-4 border-r'
              )}
              style={{ borderColor: 'var(--border-color)' }}
            >
              <Clock className={cn('w-5 h-5 sm:w-7 h-7 shrink-0', timeLeft < 1800 ? 'text-red-400 animate-pulse' : 'text-blue-400')} />
              <div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                  {t('dashboard.quiz.active.timeRemaining')}
                </div>
                <div className="text-sm sm:text-base font-mono font-bold tracking-wider" style={{ color: timeLeft < 1800 ? 'var(--color-error)' : 'var(--text-primary)' }}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <div className={cn('border-r', isRTL ? 'pl-2 sm:pl-4 border-l border-r-0' : 'pr-2 sm:pr-4 border-r')} style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                {t('dashboard.quiz.active.question')}
              </div>
              <div className="text-sm sm:text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {currentQuestionIndex + 1} <span className="text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>/ {totalQuestions}</span>
              </div>
            </div>

            <div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                {t('dashboard.quiz.active.liveScore')}
              </div>
              <div className={cn('text-sm sm:text-base font-bold', currentScore < 0 ? 'text-red-400' : 'text-green-400')}>
                {currentScore.toFixed(2)}
              </div>
            </div>
          </div>
        </header>

        <div className="card p-6 md:p-10 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
          <div className="flex items-center justify-between gap-4">
            <div className="w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface)] border flex items-center gap-2" style={{ borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
              {examLogo && <img src={examLogo} alt="Logo" className="w-10 h-10 object-contain" />}
              {currentQuestion?.category}
            </div>
            {!isAnswered && (
              <button
                onClick={onSkip}
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl border hover:bg-[var(--bg-elevated)] transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}
              >
                {t('dashboard.quiz.active.skipQuestion')} <FastForward className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <h2 className="text-lg md:text-xl font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {currentQuestion?.question}
          </h2>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl border-2 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex-1">
                  {selectedOption !== null && (
                    <span className={cn('font-bold text-xs uppercase tracking-wider block mb-2', isSkipped ? 'text-yellow-400' : isCurrentlyCorrect ? 'text-green-400' : 'text-red-400')}>
                      {explanationLabel}
                    </span>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {currentQuestion?.explanation}
                  </p>
                </div>
                <button
                  onClick={onAdvance}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex-shrink-0 shadow-sm"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <span>{currentQuestionIndex + 1 === totalQuestions ? t('dashboard.quiz.active.submit') : t('dashboard.quiz.active.nextQuestion')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t mt-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowEndConfirmModal(true)}
                className="text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl transition-all border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 cursor-pointer"
              >
                <XCircle className="w-4 h-4" /> {t('dashboard.quiz.active.endExam')}
              </button>

              <button
                onClick={() => setShowResetConfirmModal(true)}
                className="text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl transition-all border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-500/10 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> {t('dashboard.quiz.active.resetExam')}
              </button>
            </div>
          </div>
        </div>
      </div>

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

              <h3 className="text-xl font-bold text-white">{t('dashboard.quiz.active.endModal.title')}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('dashboard.quiz.active.endModal.body')}
              </p>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowEndConfirmModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                >
                  {t('dashboard.quiz.active.endModal.resume')}
                </button>
                <button
                  onClick={() => {
                    setShowEndConfirmModal(false)
                    onEndExam()
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-shadow shadow-md hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                >
                  {t('dashboard.quiz.active.endModal.confirm')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResetConfirmModal && (
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
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-2">
                <RotateCcw className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-white">{t('dashboard.quiz.active.resetModal.title')}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('dashboard.quiz.active.resetModal.body')}
              </p>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowResetConfirmModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                >
                  {t('dashboard.quiz.active.resetModal.keep')}
                </button>
                <button
                  onClick={() => {
                    setShowResetConfirmModal(false)
                    onResetExam()
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-shadow shadow-md hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                >
                  {t('dashboard.quiz.active.resetModal.confirm')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
