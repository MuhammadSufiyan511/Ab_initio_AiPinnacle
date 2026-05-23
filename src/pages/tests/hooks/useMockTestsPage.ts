import { useEffect, useMemo, useState } from 'react'

export function useMockTestsPage() {
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [exams, setExams] = useState<any[]>([])
  const [activeAttempts, setActiveAttempts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const [examsRes, attemptsRes] = await Promise.all([
          fetch('/api/exams', { credentials: 'include' }),
          fetch('/api/exams/active-attempts', { credentials: 'include' }),
        ])
        if (examsRes.ok) {
          const data = await examsRes.json()
          if (active && Array.isArray(data?.exams)) setExams(data.exams)
        }
        if (attemptsRes.ok) {
          const data = await attemptsRes.json()
          if (active && Array.isArray(data?.activeAttempts)) setActiveAttempts(data.activeAttempts)
        }
      } catch {
          // Silently handle fetch errors
        } finally {
        if (active) setLoading(false)
      }
    }

    loadData()
    return () => { active = false }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, searchQuery])

  const filteredExams = useMemo(() => {
    const searchLower = searchQuery.toLowerCase()
    return exams.filter((exam) => {
      const matchesFilter = filter === 'All' || (exam.category && exam.category.toUpperCase() === filter.toUpperCase())
      const matchesSearch = [exam.title, exam.course, exam.case_no].some((value) => (value || '').toLowerCase().includes(searchLower))
      return matchesFilter && matchesSearch
    })
  }, [exams, filter, searchQuery])

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage)
  const paginatedExams = filter === 'All'
    ? filteredExams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredExams

  const categories = ['All', ...Array.from(new Set(exams.map((exam) => exam.category ? exam.category.toUpperCase() : ''))).filter(Boolean)]

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    exams,
    activeAttempts,
    loading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredExams,
    paginatedExams,
    totalPages,
    categories,
  }
}
