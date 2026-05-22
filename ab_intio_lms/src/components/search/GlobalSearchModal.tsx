import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock, FileText, Hash, Search, X } from 'lucide-react'
import { scaleIn } from '@/animations/variants'
import { useGlobalSearchModal } from './hooks/useGlobalSearchModal'

interface GlobalSearchModalProps {
  open: boolean
  onClose: () => void
}

export function GlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
  const { query, setQuery, activeIdx, inputRef, recent, results, goTo, removeFromRecent } = useGlobalSearchModal({ open, onClose })

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          <motion.div variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="relative z-10 w-full max-w-lg overflow-hidden card">
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--border-color)' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                id="search-input"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses, exams, case numbers, topics..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
              <button onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded bg-[var(--bg-elevated)]">
                <X size={12} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-3">
                  <p className="mb-2 px-2 text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>RECENT SEARCHES</p>
                  {recent.map((term) => (
                    <div
                      key={term}
                      onClick={() => setQuery(term)}
                      className="group/item flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--bg-elevated)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Clock size={13} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
                        <span className="truncate">{term}</span>
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          removeFromRecent(term)
                        }}
                        className="shrink-0 rounded p-1 text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover/item:opacity-100"
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
                <div className="flex flex-col gap-1 p-2">
                  <p className="mb-1 px-2 text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>MATCHED PREPARATIONS</p>
                  {results.map((item, index) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      id={`search-result-${index}`}
                      onClick={() => goTo(item)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all"
                      style={{ background: index === activeIdx ? 'var(--bg-elevated)' : 'transparent', color: 'var(--text-primary)' }}
                    >
                      {item.type === 'course' ? <BookOpen size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} /> : <FileText size={14} className="text-emerald-400" style={{ flexShrink: 0 }} />}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium">{item.title}</span>
                          <span
                            className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase font-mono"
                            style={{
                              background: item.type === 'course' ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)',
                              color: item.type === 'course' ? 'rgb(96,165,250)' : 'rgb(52,211,153)',
                            }}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-muted)' }}>{item.category} · {item.subtitle}</p>
                      </div>
                      <ArrowRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-t px-4 py-2.5 text-[10px]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
              <span><kbd className="rounded px-1 py-0.5 text-[9px]" style={{ background: 'var(--bg-elevated)' }}>↑↓</kbd> navigate</span>
              <span><kbd className="rounded px-1 py-0.5 text-[9px]" style={{ background: 'var(--bg-elevated)' }}>↵</kbd> open</span>
              <span><kbd className="rounded px-1 py-0.5 text-[9px]" style={{ background: 'var(--bg-elevated)' }}>Esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
