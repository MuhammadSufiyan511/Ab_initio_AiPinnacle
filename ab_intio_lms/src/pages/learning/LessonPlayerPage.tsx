import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp, Bookmark, ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'
import { mockCourses, mockModules } from '@/data/mockCourses'

const TABS = ['Notes', 'Resources', 'Transcript', 'Discussion'] as const
type Tab = typeof TABS[number]

export default function LessonPlayerPage() {
  const { courseId } = useParams()
  const course = mockCourses.find(c => c.id === courseId) ?? mockCourses[0]
  const [activeTab, setActiveTab] = useState<Tab>('Notes')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [note, setNote] = useState('')
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <MotionPage className="flex flex-col h-screen overflow-hidden -m-6 -mt-6">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-12 border-b flex-shrink-0 z-10" style={{ background: 'var(--bg-base)', borderColor: 'var(--border-color)' }}>
        <Link to={`/courses/${courseId}`} className="flex items-center gap-1.5 text-xs hover:underline" style={{ color: 'var(--color-primary)' }}>
          <ArrowLeft size={12} /> {course.title}
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setBookmarked(v => !v)} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border-color)', color: bookmarked ? 'var(--color-warning)' : 'var(--text-muted)' }}>
            <Bookmark size={12} fill={bookmarked ? 'var(--color-warning)' : 'none'} /> Bookmark
          </button>
          <button onClick={() => setSidebarOpen(v => !v)} className="text-xs px-2.5 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
            {sidebarOpen ? 'Hide' : 'Show'} Curriculum
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video + Tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video area */}
          <div className="relative flex-shrink-0" style={{ background: '#000', aspectRatio: '16/9', maxHeight: '55vh' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <Play size={28} fill="white" className="text-white ml-1" />
              </div>
            </div>
            <img src={course.thumbnail} alt="" className="w-full h-full object-cover opacity-40" />
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full transition-all duration-300" style={{ width: '35%', background: 'var(--color-primary)' }} />
            </div>
          </div>

          {/* Tabs panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex border-b px-4" style={{ borderColor: 'var(--border-color)' }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-3 text-xs font-medium border-b-2 transition-colors"
                  style={{ borderColor: activeTab === tab ? 'var(--color-primary)' : 'transparent', color: activeTab === tab ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'Notes' && (
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Take notes here… they're saved automatically."
                  className="w-full h-full min-h-32 bg-transparent outline-none text-sm resize-none"
                  style={{ color: 'var(--text-primary)' }} />
              )}
              {activeTab === 'Transcript' && (
                <div className="flex flex-col gap-3">
                  {['[00:00] Welcome to this lesson on React hooks.', '[00:45] Today we cover useState, useEffect, and useCallback.', '[02:10] Let\'s start with a simple counter example.', '[04:30] Now we\'ll explore side effects with useEffect.'].map((line, i) => (
                    <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{line}</p>
                  ))}
                </div>
              )}
              {activeTab === 'Resources' && (
                <ul className="flex flex-col gap-2">
                  {['Lesson Slides.pdf', 'Starter Code.zip', 'Further Reading Links'].map(r => (
                    <li key={r} className="text-xs px-3 py-2.5 rounded-lg border flex items-center gap-2" style={{ borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}>
                      📎 {r}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'Discussion' && (
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Discussion is available for enrolled students.</p>
              )}
            </div>
          </div>

          {/* Prev/Next nav */}
          <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors hover:bg-[var(--bg-elevated)]"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <ArrowLeft size={12} /> Previous Lesson
            </button>
            <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg gradient-brand text-white">
              Next Lesson <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Curriculum sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
              className="border-l flex flex-col overflow-hidden flex-shrink-0" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
              <p className="text-xs font-semibold px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>CURRICULUM</p>
              <div className="flex-1 overflow-y-auto">
                {mockModules.map(mod => (
                  <div key={mod.id}>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--sidebar-hover)] transition-colors">
                      <span className="text-xs font-semibold text-left" style={{ color: 'var(--text-primary)' }}>{mod.title}</span>
                      <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
                    </button>
                    {mod.lessons.map(l => (
                      <div key={l.id} className="flex items-center gap-2.5 px-4 pl-8 py-2 hover:bg-[var(--sidebar-hover)] transition-colors cursor-pointer">
                        {l.completed ? <CheckCircle2 size={12} style={{ color: 'var(--color-success)' }} /> : <Play size={10} style={{ color: 'var(--text-muted)' }} />}
                        <span className="text-xs flex-1 truncate" style={{ color: l.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}>{l.title}</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{l.duration}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionPage>
  )
}
