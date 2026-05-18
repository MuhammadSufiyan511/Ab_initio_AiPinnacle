import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, Clock, CheckCircle2, Play, Award, RotateCcw, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'
import { PageHeader } from '@/components/shared/PageHeader'
import { mockQuizzes } from '@/data/mockQuizzes'
import { Badge } from '@/components/shared/Badge'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'FPSC', 'PPSC', 'SPSC', 'BPSC']

function ProgressRing({ radius, stroke, progress, color }: { radius: number, stroke: number, progress: number, color: string }) {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference
  return (
    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
      <circle stroke="var(--bg-elevated)" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
      <circle stroke={color} fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} />
    </svg>
  )
}

export default function MockTestsPage() {
  const [filter, setFilter] = useState('All')

  const filtered = mockQuizzes.filter(q => filter === 'All' || q.category === filter)

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Mock Tests Portfolio" subtitle="Proctored assessments to validate your skills" />

      {/* Filters */}
      <div className="flex gap-2 p-1 rounded-xl w-fit" style={{ background: 'var(--bg-elevated)' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={cn('px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200')}
            style={filter === c ? { background: 'var(--color-primary)', color: '#fff' } : { color: 'var(--text-secondary)' }}>
            {c}
          </button>
        ))}
      </div>

      <MotionList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filter === 'All' || filter === 'FPSC') && (
          <MotionItem key="fpsc-system-analyst-exam">
            <div className="card flex flex-col h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden border-2" style={{ borderColor: 'transparent', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
              
              {/* Header */}
              <div className="p-5 border-b relative" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-1.5">
                    <Badge variant="success" size="sm">FPSC</Badge>
                    <Badge variant="info" size="sm">Official Exam</Badge>
                  </div>
                  <Badge variant="secondary" size="sm">Expert</Badge>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>System Analyst (BS-18) Official Exam</h3>
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>FPSC Case No. F.4-02/2026-R Examination</p>
              </div>

              {/* Body Metrics */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <FileQuestion size={16} style={{ color: 'var(--text-muted)' }} />
                      <span className="font-semibold">200</span> <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <Clock size={16} style={{ color: 'var(--text-muted)' }} />
                      <span className="font-semibold">200</span> <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                      <span className="font-semibold">40%</span> <span className="text-xs" style={{ color: 'var(--text-muted)' }}>To Pass</span>
                    </div>
                  </div>

                  <div className="w-[68px] h-[68px] rounded-full border-4 border-dashed flex items-center justify-center" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: 'var(--text-muted)' }}>200<br/>MCQs</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-xs text-center mb-3" style={{ color: 'var(--text-muted)' }}>
                    Unlimited practice attempts allowed
                  </p>
                  <Link to="/test-preparations/exam/fpsc-system-analyst" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-brand text-white text-sm font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <Play size={16} /> Start Preparation Examination
                  </Link>
                </div>
              </div>
            </div>
          </MotionItem>
        )}

        {(filter !== 'All' && filter !== 'FPSC') && (
          <MotionItem key="empty-state" className="col-span-full py-12 flex flex-col items-center justify-center text-center gap-3 card p-8 border-2 border-dashed" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-muted)]">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>No {filter} Examination Material Yet</h4>
              <p className="text-xs max-w-xs mx-auto mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Official diagnostic study plans and mock examinations for {filter} commission are currently being compiled and will be available shortly.
              </p>
            </div>
          </MotionItem>
        )}
      </MotionList>
    </MotionPage>
  )
}
