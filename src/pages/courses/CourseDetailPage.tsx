import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Users, Clock, ChevronDown, ChevronUp, CheckCircle2, Play, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'

/**
 * CourseDetailPage Component:
 * - Details a single course with description overview, category badges, tags, and instructor biographies.
 * - Embeds curriculum course-content mapping inside collapsible accordion components (`CurriculumModule`).
 * - Includes a sticky sidebar call-to-action allowing immediate progress continuation or enrolment.
 */
import { Badge, ProgressBar } from '@/components/shared/Badge'
import { mockCourses, mockModules } from '@/data/mockCourses'
import { formatCount } from '@/lib/utils'

function CurriculumModule({ mod }: { mod: typeof mockModules[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-elevated)] transition-colors text-left">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{mod.title}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{mod.lessons.length} lessons</span>
          {open ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
            {mod.lessons.map(l => (
              <div key={l.id} className="flex items-center gap-3 px-4 py-2.5 border-t" style={{ borderColor: 'var(--border-color)' }}>
                {l.completed ? <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} /> : <Play size={12} style={{ color: 'var(--text-muted)' }} />}
                <span className="flex-1 text-xs" style={{ color: l.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{l.title}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{l.duration}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const course = mockCourses.find(c => c.id === id) ?? mockCourses[0]

  return (
    <MotionPage className="flex flex-col gap-6">
      <Link to="/courses" className="flex items-center gap-1.5 text-sm hover:underline w-fit" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={14} /> Back to Courses
      </Link>

      {/* Hero banner */}
      <div className="relative h-56 rounded-2xl overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2))' }} />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <Badge variant="default" className="mb-2 w-fit">{course.category}</Badge>
          <h1 className="text-2xl font-bold text-white mb-2 max-w-2xl">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><Star size={13} fill="#fbbf24" style={{ color: '#fbbf24' }} />{course.rating}</span>
            <span className="flex items-center gap-1"><Users size={13} />{formatCount(course.students)} students</span>
            <span className="flex items-center gap-1"><Clock size={13} />{course.duration}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Description */}
          <div className="card p-5">
            <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>About this course</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{course.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Curriculum</h2>
            {mockModules.map(m => <CurriculumModule key={m.id} mod={m} />)}
          </div>

          {/* Instructor */}
          <div className="card p-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {course.instructor.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>INSTRUCTOR</p>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{course.instructor}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Expert educator with 10+ years of industry experience and 50,000+ students taught.</p>
            </div>
          </div>
        </div>

        {/* Sticky sidebar CTA */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="card p-5 flex flex-col gap-4">
            <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>${course.price}</div>
            {course.progress !== undefined && (
              <div>
                <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  <span>Your progress</span><span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} />
              </div>
            )}
            <Link to={`/learn/${course.id}/l1`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white gradient-brand hover:opacity-90 transition-opacity">
              <Play size={16} /> {course.progress ? 'Continue Learning' : 'Enroll Now'}
            </Link>
            <ul className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {[`${mockModules.length} modules`, `${mockModules.flatMap(m => m.lessons).length} lessons`, 'Certificate of completion', 'Lifetime access'].map(f => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 size={12} style={{ color: 'var(--color-success)' }} />{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MotionPage>
  )
}
