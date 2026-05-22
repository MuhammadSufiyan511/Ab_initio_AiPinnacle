import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockCourses } from '@/data/mockCourses'

interface GlobalSearchModalProps {
  open: boolean
  onClose: () => void
}

type SearchResult = {
  id: string | number
  title: string
  category: string
  subtitle: string
  type: 'course' | 'exam'
}

const DEFAULT_RECENT = ['React hooks', 'FPSC', 'System Analyst']

function loadRecentSearches() {
  try {
    const saved = localStorage.getItem('recent_searches')
    return saved ? JSON.parse(saved) : DEFAULT_RECENT
  } catch {
    return DEFAULT_RECENT
  }
}

export function useGlobalSearchModal({ open, onClose }: GlobalSearchModalProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [exams, setExams] = useState<any[]>([])
  const [recent, setRecent] = useState<string[]>(() => loadRecentSearches())

  const courseResults = useMemo(() => {
    if (!query.trim()) return []
    const search = query.toLowerCase()
    return mockCourses.filter((course) => course.title.toLowerCase().includes(search) || course.category.toLowerCase().includes(search) || course.instructor.toLowerCase().includes(search))
  }, [query])

  const examResults = useMemo(() => {
    if (!query.trim()) return []
    const search = query.toLowerCase()
    return exams.filter((exam) => exam.title.toLowerCase().includes(search) || exam.category.toLowerCase().includes(search) || exam.course.toLowerCase().includes(search) || (exam.case_no && exam.case_no.toLowerCase().includes(search)))
  }, [exams, query])

  const results: SearchResult[] = useMemo(() => [
    ...courseResults.map((course) => ({ id: course.id, title: course.title, category: course.category, subtitle: course.instructor, type: 'course' as const })),
    ...examResults.map((exam) => ({ id: exam.id, title: exam.course, category: exam.category, subtitle: exam.case_no, type: 'exam' as const })),
  ], [courseResults, examResults])

  const addToRecent = (term: string) => {
    if (!term.trim()) return
    const updated = [term.trim(), ...recent.filter((item) => item.toLowerCase() !== term.trim().toLowerCase())].slice(0, 5)
    setRecent(updated)
    try {
      localStorage.setItem('recent_searches', JSON.stringify(updated))
    } catch (error) {
      console.error(error)
    }
  }

  const removeFromRecent = (term: string) => {
    const updated = recent.filter((item) => item.toLowerCase() !== term.toLowerCase())
    setRecent(updated)
    try {
      localStorage.setItem('recent_searches', JSON.stringify(updated))
    } catch (error) {
      console.error(error)
    }
  }

  const goTo = (item: SearchResult) => {
    addToRecent(item.title)
    navigate(item.type === 'course' ? `/courses/${item.id}` : `/test-preparations/exam/${item.id}`)
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIdx(0)
      return
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    fetch('/api/exams')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.exams)) setExams(data.exams)
      })
      .catch((error) => console.error('Error fetching exams for search:', error))

    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        if (open) onClose()
      }
      if (!open) return
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIdx((index) => Math.min(index + 1, results.length - 1))
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIdx((index) => Math.max(index - 1, 0))
      }
      if (event.key === 'Enter' && results[activeIdx]) {
        event.preventDefault()
        goTo(results[activeIdx])
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIdx, onClose, open, results])

  return {
    query,
    setQuery,
    activeIdx,
    setActiveIdx,
    inputRef,
    recent,
    results,
    goTo,
    removeFromRecent,
  }
}
