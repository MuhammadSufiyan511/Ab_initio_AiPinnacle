import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, CheckCircle2, FileText, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'

/**
 * AssignmentDetailPage Component:
 * - Details specific assignment profiles including description content, points, and due dates.
 * - Implements a premium Drag-and-Drop file uploader workspace supporting interactive progress gauges.
 * - Handles simple submission success state transitions and toast notifications.
 */
import { mockAssignments } from '@/data/mockAssignments'
import { toast } from 'sonner'

export default function AssignmentDetailPage() {
  const { id } = useParams()
  const assignment = mockAssignments.find(a => a.id === id) ?? mockAssignments[0]
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [submitted, setSubmitted] = useState(assignment.status === 'submitted' || assignment.status === 'graded')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setProgress(0)
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); return 100 } return p + 10 }), 80)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    toast.success('Assignment submitted successfully!')
  }

  return (
    <MotionPage className="max-w-2xl mx-auto flex flex-col gap-6">
      <Link to="/assignments" className="flex items-center gap-1.5 text-sm hover:underline w-fit" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={14} /> Back to Assignments
      </Link>

      <div className="card p-6 flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{assignment.title}</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{assignment.course}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Due Date', value: new Date(assignment.dueDate).toLocaleDateString() },
            { label: 'Max Grade', value: `${assignment.maxGrade} pts` },
            { label: 'Status', value: assignment.status },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
              <p className="text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{s.label.toUpperCase()}</p>
              <p className="text-sm font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>Description</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{assignment.description}</p>
        </div>
      </div>

      {/* Submission area */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="card p-8 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 size={40} style={{ color: 'var(--color-success)' }} />
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Assignment Submitted!</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your instructor will review and grade it soon.</p>
          </motion.div>
        ) : (
          <motion.div key="upload" className="card p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Submit Your Work</h3>

            <div id="drop-zone" onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200"
              style={{ borderColor: dragging ? 'var(--color-primary)' : 'var(--border-color)', background: dragging ? 'rgba(99,102,241,0.05)' : 'var(--input-bg)' }}>
              <input ref={inputRef} type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <Upload size={28} style={{ color: dragging ? 'var(--color-primary)' : 'var(--text-muted)' }} />
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Drop your file here</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>or click to browse · PDF, DOCX, ZIP up to 50MB</p>
              </div>
            </div>

            {file && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                  <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                  <span className="flex-1 text-xs truncate" style={{ color: 'var(--text-primary)' }}>{file.name}</span>
                  <button onClick={() => { setFile(null); setProgress(0) }}><X size={13} style={{ color: 'var(--text-muted)' }} /></button>
                </div>
                {progress < 100 && (
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="h-full rounded-full transition-all duration-100" style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
                  </div>
                )}
              </motion.div>
            )}

            <button id="submit-assignment" onClick={handleSubmit} disabled={!file}
              className="w-full py-3 rounded-xl gradient-brand text-white text-sm font-semibold disabled:opacity-40 transition-opacity">
              Submit Assignment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionPage>
  )
}
