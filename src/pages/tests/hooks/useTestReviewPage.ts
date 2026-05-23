import { useEffect, useMemo, useState } from 'react'

export function useTestReviewPage(attemptId?: string) {
  const [loading, setLoading] = useState(true)
  const [attemptDetails, setAttemptDetails] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  useEffect(() => {
    async function fetchAttemptDetails() {
      if (!attemptId) return
      setLoading(true)
      try {
        const response = await fetch(`/api/exams/attempts/${attemptId}/results`, { credentials: 'include' })
        if (!response.ok) throw new Error('Failed to fetch attempt details')
        const data = await response.json()
        setAttemptDetails(data)
      } catch {
        // Silently handle fetch errors
      } finally {
        setLoading(false)
      }
    }

    fetchAttemptDetails()
  }, [attemptId])

  const attempt = attemptDetails?.attempt
  const questions = attemptDetails?.questions || []
  const totalQuestions = questions.length
  const totalPages = Math.ceil(totalQuestions / itemsPerPage)
  const paginatedQuestions = questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const scoreVal = typeof attempt?.score === 'number' ? attempt.score : parseFloat(attempt?.score || '0')
  const pct = totalQuestions > 0 ? ((scoreVal / totalQuestions) * 100).toFixed(1) : '0.0'
  const hasPassed = parseFloat(pct) >= (attempt?.passing_score || 0)
  const from = (currentPage - 1) * itemsPerPage + 1
  const to = Math.min(currentPage * itemsPerPage, totalQuestions)

  return {
    loading,
    attemptDetails,
    attempt,
    questions,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalQuestions,
    totalPages,
    paginatedQuestions,
    scoreVal,
    pct,
    hasPassed,
    from,
    to,
  }
}
