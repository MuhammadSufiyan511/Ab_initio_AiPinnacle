import React, { useState } from 'react'
import { FileText, Clock, CheckCircle2, ShieldAlert, PlayCircle, CheckSquare, Square } from 'lucide-react'
import type { ExamTestData } from '@/data/examRegistry'

interface FPSCStartScreenProps {
  activeTest: ExamTestData
  totalQuestions: number
  onLaunch: () => void
}

export default function FPSCStartScreen({ activeTest, totalQuestions, onLaunch }: FPSCStartScreenProps) {
  const [declared, setDeclared] = useState(false)

  return (
    <div className="card p-6 lg:p-8 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
      
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <FileText className="w-4 h-4 text-blue-500" /> Examination Structure & Content
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                {section.questions.length} Questions / Marks
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <Clock className="w-8 h-8 text-yellow-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Time Allowed</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{Math.floor(activeTest.duration / 60)} Minutes. Active countdown begins immediately upon launching.</p>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Qualifying Standard</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Achieve a minimum of <strong style={{ color: 'var(--text-primary)' }}>{activeTest.passingScore}% ({Math.round(totalQuestions * activeTest.passingScore / 100)} Marks)</strong> to pass.</p>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 p-5 rounded-2xl border flex items-start gap-4" style={{ borderColor: 'var(--color-error)' }}>
        <ShieldAlert className="w-8 h-8 text-red-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm mb-1 text-red-500">Official Negative Marking</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A penalty of <strong style={{ color: 'var(--text-primary)' }}>0.25 marks</strong> is deducted for each incorrect response. Use the <strong style={{ color: 'var(--text-primary)' }}>Skip</strong> option if you are unsure of the correct answer.
          </p>
        </div>
      </div>

      {/* Honor declaration */}
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
            I hereby declare that I will take this official {totalQuestions}-question examination independently, without any external assistance, references, or secondary screens, adhering strictly to the commission's code of conduct.
          </p>
        </div>
      </div>

      <button
        onClick={onLaunch}
        disabled={!declared}
        className="w-full flex items-center justify-center space-x-3 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg text-base disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}
      >
        <PlayCircle className="w-6 h-6" />
        <span>Launch Preparation {totalQuestions}-Question Examination</span>
      </button>

    </div>
  )
}
