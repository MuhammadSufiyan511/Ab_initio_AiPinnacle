import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, Clock, ArrowRight, Hash, FileText } from 'lucide-react'
import { mockCourses } from '@/data/mockCourses'
import { examsData } from '@/data/examRegistry'
import { useNavigate } from 'react-router-dom'
import { scaleIn } from '@/animations/variants'

interface GlobalSearchModalProps {
  open: boolean
  onClose: () => void
}

export function GlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Dynamic Recent Searches backed by Local Storage
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recent_searches')
      return saved ? JSON.parse(saved) : ['React hooks', 'FPSC', 'System Analyst']
    } catch {
      return ['React hooks', 'FPSC', 'System Analyst']
    }
  })

  // Match local courses in real-time
  const courseResults = query.trim().length > 0
    ? mockCourses.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase())
      )
    : []

  // Match exam database in real-time (e.g. searching 'fpsc', 'analyst' yields immediate hits)
  const examResults = query.trim().length > 0
    ? Object.values(examsData).filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.category.toLowerCase().includes(query.toLowerCase()) ||
        e.course.toLowerCase().includes(query.toLowerCase()) ||
        (e.caseNo && e.caseNo.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  // Combine both course and exam lists into a single flat results list for seamless keyboard scrolling navigation
  const results = [
    ...courseResults.map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      subtitle: c.instructor,
      type: 'course' as const
    })),
    ...examResults.map(e => ({
      id: e.id,
      title: e.course, // e.g. "System Analyst (BS-18) Examination"
      category: e.category, // e.g. "FPSC"
      subtitle: e.caseNo, // e.g. "Case No. F.4-02/2026-R"
      type: 'exam' as const
    }))
  ]

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50) }
    else { setQuery('') }
  }, [open])

  const addToRecent = (term: string) => {
    if (!term.trim()) return
    const updated = [term.trim(), ...recent.filter(r => r.toLowerCase() !== term.trim().toLowerCase())].slice(0, 5)
    setRecent(updated)
    try {
      localStorage.setItem('recent_searches', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const removeFromRecent = (term: string) => {
    const updated = recent.filter(r => r.toLowerCase() !== term.toLowerCase())
    setRecent(updated)
    try {
      localStorage.setItem('recent_searches', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }

  const goTo = (item: typeof results[0]) => {
    addToRecent(item.title)
    if (item.type === 'course') {
      navigate(`/courses/${item.id}`)
    } else {
      navigate(`/test-preparations/exam/${item.id}`)
    }
    onClose()
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : undefined }
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(i => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIdx]) {
        e.preventDefault()
        goTo(results[activeIdx])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, results, activeIdx, navigate, onClose])

  useEffect(() => setActiveIdx(0), [query])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose} />

          {/* Modal */}
          <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="hidden"
            className="relative w-full max-w-lg card overflow-hidden z-10">
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input ref={inputRef} id="search-input" type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, exams, case numbers, topics…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)' }} />
              <button onClick={onClose} className="w-6 h-6 rounded flex items-center justify-center bg-[var(--bg-elevated)]">
                <X size={12} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            {/* Results / Recent */}
            <div className="max-h-80 overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-3">
                  <p className="text-[10px] font-semibold px-2 mb-2" style={{ color: 'var(--text-muted)' }}>RECENT SEARCHES</p>
                  {recent.map(r => (
                    <div 
                      key={r} 
                      onClick={() => setQuery(r)} 
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--bg-elevated)] group/item cursor-pointer" 
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Clock size={13} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
                        <span className="truncate">{r}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFromRecent(r)
                        }}
                        className="opacity-0 group-hover/item:opacity-100 p-1 rounded hover:bg-red-500/10 text-muted hover:text-red-400 transition-all shrink-0"
                        title="Remove search"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="py-10 text-center">
                  <Hash size={28} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No matches found for "{query}"</p>
                </div>
              ) : (
                <div className="p-2 flex flex-col gap-1">
                  <p className="text-[10px] font-semibold px-2 mb-1" style={{ color: 'var(--text-muted)' }}>MATCHED PREPARATIONS</p>
                  {results.map((item, i) => (
                    <button key={`${item.type}-${item.id}`} id={`search-result-${i}`} onClick={() => goTo(item)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all text-left"
                      style={{ background: i === activeIdx ? 'var(--bg-elevated)' : 'transparent', color: 'var(--text-primary)' }}>
                      
                      {item.type === 'course' ? (
                        <BookOpen size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      ) : (
                        <FileText size={14} className="text-emerald-400" style={{ flexShrink: 0 }} />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{item.title}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold shrink-0 ${item.type === 'course' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.category} · {item.subtitle}</p>
                      </div>
                      <ArrowRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-t text-[10px]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
              <span><kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: 'var(--bg-elevated)' }}>↑↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: 'var(--bg-elevated)' }}>↵</kbd> open</span>
              <span><kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: 'var(--bg-elevated)' }}>Esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
