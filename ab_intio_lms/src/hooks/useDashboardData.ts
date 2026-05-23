import { useState, useEffect } from 'react'

export interface DashboardStats {
  totalTaken: number
  passedCount: number
  failedCount: number
  avgScore: number
}

export interface ActiveAttempt {
  attempt_id: string
  exam_id: string
  exam_title: string
  exam_category: string
  logo_url?: string
  answered_count: number
  total_questions: number
  remaining_time: number
}

export function useDashboardData() {
  const [activeAttempts, setActiveAttempts] = useState<ActiveAttempt[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalTaken: 0,
    passedCount: 0,
    failedCount: 0,
    avgScore: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [activeRes, historyRes] = await Promise.all([
          fetch('/api/exams/active-attempts'),
          fetch('/api/exams/history'),
        ])

        if (activeRes.ok) {
          const data = await activeRes.json()
          setActiveAttempts(data.activeAttempts || [])
        }

        if (historyRes.ok) {
          const data = await historyRes.json()
          const history: any[] = data.history || []

          const processed = history.map((a) => {
            const totalQ = Number(a.total_questions || 1)
            const scoreVal = Number(a.score || 0)
            const pct = (scoreVal / totalQ) * 100
            return { ...a, pct }
          })

          const totalTaken = processed.length
          const passedCount = processed.filter(
            (a) => a.pct >= Number(a.passing_score || 40)
          ).length
          const failedCount = processed.filter(
            (a) => a.pct < Number(a.passing_score || 40)
          ).length

          let avgScore = 0
          if (processed.length > 0) {
            const sum = processed.reduce((acc, a) => acc + a.pct, 0)
            const avg = sum / processed.length
            avgScore = isNaN(avg) ? 0 : Math.round(avg)
          }

          setStats({ totalTaken, passedCount, failedCount, avgScore })
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { activeAttempts, stats, loading, error }
}
