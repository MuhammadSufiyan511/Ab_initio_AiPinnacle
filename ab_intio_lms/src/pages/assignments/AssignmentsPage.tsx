import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'

/**
 * AssignmentsPage Component:
 * - Lists course assignments classified by status filters (All, Pending, Submitted, Graded).
 * - Visualizes countdown time limits, submission statuses, and earned grades.
 * - Seamlessly routes students to details for active file uploads and submission portals.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/shared/Badge'
import { mockAssignments, type Assignment } from '@/data/mockAssignments'
import { cn } from '@/lib/utils'

const TABS = ['All', 'Pending', 'Submitted', 'Graded'] as const
type Tab = typeof TABS[number]

const statusIcons = {
  pending:   <Clock size={14} style={{ color: 'var(--color-warning)' }} />,
  submitted: <CheckCircle2 size={14} style={{ color: 'var(--color-info)' }} />,
  graded:    <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />,
  late:      <AlertCircle size={14} style={{ color: 'var(--color-error)' }} />,
}

const statusVariant: Record<Assignment['status'], 'warning' | 'info' | 'success' | 'error'> = {
  pending: 'warning', submitted: 'info', graded: 'success', late: 'error',
}

function AssignmentCard({ a }: { a: Assignment }) {
  const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / 86400000)
  return (
    <Link to={`/assignments/${a.id}`}>
      <motion.div whileHover={{ y: -2 }} className="card p-4 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex-shrink-0">{statusIcons[a.status]}</div>
            <div>
              <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{a.course}</p>
            </div>
          </div>
          <Badge variant={statusVariant[a.status]} size="sm">{a.status}</Badge>
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <FileText size={11} /> {a.attachments} file{a.attachments !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'Due today' : `Due in ${daysLeft}d`}
          </span>
          {a.grade !== undefined && (
            <span className="font-semibold" style={{ color: 'var(--color-success)' }}>{a.grade}/{a.maxGrade}</span>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const filtered = mockAssignments.filter(a =>
    activeTab === 'All' ? true : a.status === activeTab.toLowerCase()
  )

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Assignments" subtitle={`${mockAssignments.length} total assignments`}
        actions={
          <Link to="/assignments/new" className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-xs font-semibold">
            <Upload size={13} /> Submit Work
          </Link>
        }
      />

      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--bg-elevated)' }}>
        {TABS.map(tab => (
          <button key={tab} id={`tab-${tab.toLowerCase()}`} onClick={() => setActiveTab(tab)}
            className={cn('px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200')}
            style={activeTab === tab ? { background: 'var(--color-primary)', color: '#fff' } : { color: 'var(--text-secondary)' }}>
            {tab}
          </button>
        ))}
      </div>

      <MotionList className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(a => <MotionItem key={a.id}><AssignmentCard a={a} /></MotionItem>)}
      </MotionList>
    </MotionPage>
  )
}
