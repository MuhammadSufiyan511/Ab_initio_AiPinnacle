import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Flag, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { mockQuizzes } from '@/data/mockQuizzes'
import { cn } from '@/lib/utils'

export default function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quiz = mockQuizzes.find(q => q.id === id) ?? mockQuizzes[0]
  
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(quiz.duration)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Timer logic
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => { 
      if (s <= 1) { clearInterval(t); handleSubmit(); return 0 } 
      return s - 1 
    }), 1000)
    return () => clearInterval(t)
  }, []) // eslint-disable-line

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      navigate(`/test-preparations/${quiz.id}/results`, { state: { answers, quiz, timeSpent: quiz.duration - timeLeft } })
    }, 1500)
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(q.id)) next.delete(q.id)
      else next.add(q.id)
      return next
    })
  }

  const q = quiz.questions[current]
  const totalAnswered = Object.keys(answers).length
  const progress = (totalAnswered / quiz.questions.length) * 100

  // Format time
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
  }

  const isLowTime = timeLeft < 60 // Less than 1 minute

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-base)]">
      {/* Sticky Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b bg-[var(--bg-surface)] shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-sm">
            AB
          </div>
          <div>
            <h1 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{quiz.title}</h1>
            <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{quiz.course}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Progress</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
              </div>
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{totalAnswered}/{quiz.questions.length}</span>
            </div>
          </div>

          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors", isLowTime ? "animate-pulse" : "")}
            style={{ 
              background: isLowTime ? 'rgba(239,68,68,0.1)' : 'var(--bg-elevated)', 
              borderColor: isLowTime ? 'var(--color-error)' : 'var(--border-color)',
              color: isLowTime ? 'var(--color-error)' : 'var(--text-primary)'
            }}>
            <Clock size={16} />
            <span className="font-mono font-bold text-sm tracking-widest">{formatTime(timeLeft)}</span>
          </div>

          <button onClick={handleSubmit} className="px-5 py-2 rounded-lg gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Finish Test
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Question Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Question {current + 1}</h2>
            <button onClick={toggleFlag} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border"
              style={{ 
                background: flagged.has(q.id) ? 'rgba(245,158,11,0.1)' : 'transparent',
                borderColor: flagged.has(q.id) ? 'var(--color-warning)' : 'var(--border-color)',
                color: flagged.has(q.id) ? 'var(--color-warning)' : 'var(--text-secondary)'
              }}>
              <Flag size={14} fill={flagged.has(q.id) ? "var(--color-warning)" : "none"} />
              {flagged.has(q.id) ? 'Flagged for Review' : 'Flag for Review'}
            </button>
          </div>

          <p className="text-lg leading-relaxed font-medium mb-8" style={{ color: 'var(--text-primary)' }}>
            {q.question}
          </p>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              const isSelected = answers[q.id] === i
              return (
                <motion.button key={i} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={() => setAnswers(a => ({ ...a, [q.id]: i }))}
                  className={cn(
                    "flex items-center gap-4 p-4 lg:p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden"
                  )}
                  style={{
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                    background: isSelected ? 'rgba(99,102,241,0.05)' : 'var(--bg-surface)',
                  }}>
                  {/* Subtle active background */}
                  <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity", isSelected ? 'hidden' : 'block')} style={{ background: 'var(--bg-elevated)' }} />
                  
                  <div className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors"
                    style={{ 
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                      background: isSelected ? 'var(--color-primary)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--text-muted)'
                    }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="relative z-10 text-base flex-1" style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {opt}
                  </span>
                  {isSelected && <CheckCircle2 className="relative z-10" size={20} style={{ color: 'var(--color-primary)' }} />}
                </motion.button>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-auto pt-8 flex items-center justify-between">
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm disabled:opacity-30 transition-colors hover:bg-[var(--bg-elevated)]"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={() => setCurrent(c => Math.min(quiz.questions.length - 1, c + 1))} disabled={current === quiz.questions.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm disabled:opacity-30 transition-colors hover:bg-[var(--bg-elevated)]"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: Navigator Sidebar */}
        <div className="w-80 border-l bg-[var(--bg-surface)] shrink-0 flex flex-col" style={{ borderColor: 'var(--border-color)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Question Navigator</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Jump to any question. Review flagged items before submitting.</p>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-4 gap-3">
              {quiz.questions.map((_, i) => {
                const isAns = answers[quiz.questions[i].id] !== undefined
                const isCurr = i === current
                const isFlag = flagged.has(quiz.questions[i].id)

                return (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="relative w-full aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border-2"
                    style={{
                      background: isCurr ? 'var(--color-primary)' : isAns ? 'rgba(99,102,241,0.1)' : 'var(--bg-elevated)',
                      borderColor: isCurr ? 'var(--color-primary)' : isAns ? 'var(--color-primary)' : 'var(--border-color)',
                      color: isCurr ? '#fff' : isAns ? 'var(--color-primary)' : 'var(--text-secondary)'
                    }}>
                    {i + 1}
                    {isFlag && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-[var(--bg-surface)]" style={{ borderColor: 'var(--bg-surface)' }}>
                         <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-warning)' }} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
             <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm border-2" style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'var(--color-primary)' }}/> Answered</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm border-2" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}/> Unanswered</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-warning)' }}/> Flagged</div>
             </div>
          </div>
        </div>

      </div>

      {/* Submitting Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)' }}>
             <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: 'var(--color-primary)' }} />
             <h2 className="text-xl font-bold text-white">Submitting Assessment...</h2>
             <p className="text-white/60 mt-2 text-sm">Please do not close this window.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
