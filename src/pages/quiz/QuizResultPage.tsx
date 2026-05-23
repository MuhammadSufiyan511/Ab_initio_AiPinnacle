import { useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { CheckCircle2, XCircle, RotateCcw, Home, Award, ChevronDown, ChevronUp, Clock, Target, Zap } from 'lucide-react'
import { MotionPage } from '@/animations/MotionWrapper'
import { mockQuizzes, type Quiz } from '@/data/mockQuizzes'
import { cn } from '@/lib/utils'

export default function QuizResultPage() {
  const { id } = useParams()
  const location = useLocation()
  const quiz = mockQuizzes.find(q => q.id === id) ?? mockQuizzes[0]
  
  const answers: Record<string, number> = location.state?.answers ?? {}
  const timeSpent: number = location.state?.timeSpent ?? 450 // Default 7m 30s if direct access

  const correct = quiz.questions.filter(q => answers[q.id] === q.correct).length
  const total = quiz.questions.length
  const score = Math.round((correct / total) * 100)
  const passed = score >= quiz.passingScore

  const [expandedQ, setExpandedQ] = useState<string | null>(null)

  // Metrics
  const avgTimePerQ = Math.round(timeSpent / total)
  
  // Confetti effect setup (simulated via CSS and framer motion)
  const pieData = [
    { name: 'Correct',   value: correct, fill: 'var(--color-success)' },
    { name: 'Incorrect', value: total - correct, fill: 'var(--bg-elevated)' },
  ]

  const accuracyData = [
    { name: 'Accuracy', value: score, fill: passed ? 'var(--color-success)' : 'var(--color-warning)' }
  ]

  return (
    <MotionPage className="max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* Hero Score Board */}
      <div className="card relative overflow-hidden p-8 lg:p-12 flex flex-col items-center text-center border-2" 
        style={{ borderColor: passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }}>
        
        {/* Background glow */}
        <div className="absolute inset-0 opacity-10" 
          style={{ background: passed ? 'radial-gradient(circle, var(--color-success) 0%, transparent 70%)' : 'radial-gradient(circle, var(--color-error) 0%, transparent 70%)' }} />

        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}>
          {passed ? <Award size={64} style={{ color: 'var(--color-success)' }} className="mb-4" /> : <Target size={64} style={{ color: 'var(--color-error)' }} className="mb-4" />}
        </motion.div>

        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} 
          className="text-6xl lg:text-8xl font-black tracking-tighter mb-2" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
          {score}%
        </motion.h1>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{passed ? 'Assessment Passed! 🎉' : 'Assessment Failed'}</p>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            You scored {correct} out of {total} correct answers. Passing mark is {quiz.passingScore}%.
          </p>
        </motion.div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
             <Target size={16} style={{ color: 'var(--color-primary)' }}/> Accuracy Profile
           </div>
           <div className="mt-4 flex-1">
             <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} />
                </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="card p-6 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
             <Clock size={16} style={{ color: 'var(--color-warning)' }}/> Time Spent
           </div>
           <div className="mt-auto pt-4">
             <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{Math.floor(timeSpent/60)}m {timeSpent%60}s</div>
             <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Total assessment time</p>
           </div>
        </div>

        <div className="card p-6 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
             <Zap size={16} style={{ color: 'var(--color-accent)' }}/> Speed
           </div>
           <div className="mt-auto pt-4">
             <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgTimePerQ}s</div>
             <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Average time per question</p>
           </div>
        </div>
      </div>

      {/* Solutions & Explanations Accordion */}
      <div className="card flex flex-col overflow-hidden">
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Solutions & Explanations</h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Review your answers to understand your mistakes.</p>
        </div>

        <div className="flex flex-col">
          {quiz.questions.map((q, i) => {
            const isCorrect = answers[q.id] === q.correct
            const isExpanded = expandedQ === q.id

            return (
              <div key={q.id} className="border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                <button onClick={() => setExpandedQ(isExpanded ? null : q.id)} 
                  className={cn("w-full flex items-start gap-4 p-6 text-left transition-colors hover:bg-[var(--bg-elevated)]", isExpanded ? "bg-[var(--bg-elevated)]" : "")}>
                  
                  <div className="mt-0.5 flex-shrink-0">
                    {isCorrect ? <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} /> : <XCircle size={20} style={{ color: 'var(--color-error)' }} />}
                  </div>
                  
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Question {i + 1}</p>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>{q.question}</p>
                  </div>

                  <div className="flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }}/> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }}/>}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 pl-14">
                        
                        {/* Selected vs Correct */}
                        <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-bold w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Your Answer:</span>
                            <span className="font-medium" style={{ color: isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}>
                              {answers[q.id] !== undefined ? q.options[answers[q.id]] : 'Skipped'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="flex items-start gap-2 text-sm pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="font-bold w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Correct Answer:</span>
                              <span className="font-medium" style={{ color: 'var(--color-success)' }}>{q.options[q.correct]}</span>
                            </div>
                          )}
                        </div>

                        {/* Explanation block */}
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.05)', borderLeft: '4px solid var(--color-primary)' }}>
                          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-primary)' }}>Explanation</p>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                            {q.explanation || 'No detailed explanation provided for this question.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl border font-bold text-sm transition-colors hover:bg-[var(--bg-elevated)] shadow-sm"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          <Home size={16} /> Return to Dashboard
        </Link>
        <Link to="/test-preparations" className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
          <RotateCcw size={16} /> Take Another Test
        </Link>
      </div>

    </MotionPage>
  )
}
