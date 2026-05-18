import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FileText, Clock, AlertTriangle, ShieldCheck, ChevronRight, CheckSquare, Square, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'
import { mockQuizzes } from '@/data/mockQuizzes'
import { Badge } from '@/components/shared/Badge'
import { PageHeader } from '@/components/shared/PageHeader'

export default function QuizInstructionsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quiz = mockQuizzes.find(q => q.id === id) ?? mockQuizzes[0]
  
  const [declared, setDeclared] = useState(false)

  // Commission full name mapper
  const getCommissionName = (cat: string) => {
    switch (cat) {
      case 'FPSC': return 'Federal Public Service Commission'
      case 'PPSC': return 'Punjab Public Service Commission'
      case 'SPSC': return 'Sindh Public Service Commission'
      case 'BPSC': return 'Balochistan Public Service Commission'
      default: return 'Public Service Commission'
    }
  }

  return (
    <MotionPage className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Back to Test list */}
      <Link to="/test-preparations" className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: 'var(--text-muted)' }}>
        <ArrowLeft size={14} /> Back to Test Preparations
      </Link>

      <PageHeader 
        title={`${quiz.category} Examination Portal`} 
        subtitle={getCommissionName(quiz.category)} 
      />

      {/* Main card */}
      <div className="card p-6 lg:p-8 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
        
        {/* Banner header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>Official Proctor Guidelines</span>
            <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{quiz.title}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Subject: {quiz.course}</p>
          </div>
          <Badge variant={
            quiz.category === 'FPSC' ? 'success' :
            quiz.category === 'PPSC' ? 'info' :
            quiz.category === 'SPSC' ? 'warning' : 'error'
          } size="md">
            {quiz.category} Official
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>QUESTIONS</p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{quiz.questions.length} MCQ Items</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>DURATION</p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{Math.floor(quiz.duration / 60)} Minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>PASSING MARK</p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{quiz.passingScore}% Correct</p>
            </div>
          </div>
        </div>

        {/* Rules & Warnings */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <AlertTriangle size={16} className="text-amber-500" /> Essential Proctor Rules
          </h3>
          <ul className="text-xs leading-relaxed flex flex-col gap-2.5 list-disc pl-4" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Strict Proctoring Mode:</strong> Switching browser tabs, minimizing the window, or launching external tools is strictly logged and may lead to automatic disqualification.</li>
            <li><strong>Timer Policy:</strong> The exam is timed and will automatically submit once the clock reaches <code>00:00</code>.</li>
            <li><strong>Negative Marking:</strong> Each correct response awards full credit. A deduction of <code>0.25</code> applies for each incorrect choice. Unanswered questions carry zero penalty.</li>
            <li><strong>Attempts Counter:</strong> You are allowed a maximum of <code>{quiz.attemptsAllowed} attempts</code>. Submitting this exam consumes exactly 1 attempt.</li>
            <li><strong>Calculators & Aids:</strong> Manual calculation tools or references are strictly prohibited.</li>
          </ul>
        </div>

        {/* Declaration Box */}
        <div className="p-4 rounded-2xl border flex items-start gap-3 cursor-pointer select-none transition-all hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: declared ? 'var(--color-primary)' : 'var(--border-color)', background: 'var(--bg-surface)' }}
          onClick={() => setDeclared(!declared)}
        >
          <div className="mt-0.5" style={{ color: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}>
            {declared ? <CheckSquare size={18} /> : <Square size={18} />}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Candidate Honor Declaration</p>
            <p className="text-[11px] mt-1 leading-normal" style={{ color: 'var(--text-muted)' }}>
              I hereby declare that I am the authorized candidate logged into this assessment session. I agree to comply with all commission examination proctor guidelines and certify that I will answer the test items using my own knowledge without external assistance.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            disabled={!declared}
            onClick={() => navigate(`/test-preparations/${quiz.id}/take`)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            style={{ background: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}
          >
            Confirm & Start Assessment <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </MotionPage>
  )
}
