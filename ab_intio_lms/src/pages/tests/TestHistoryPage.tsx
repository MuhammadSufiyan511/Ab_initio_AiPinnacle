import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, Calendar, Award, Clock, ArrowRight, Eye, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/shared/Badge'
import { MotionPage } from '@/animations/MotionWrapper'
import { useTranslation } from 'react-i18next'

import fpscLogo from '@/assets/fpsc.webp'
import ppscLogo from '@/assets/ppsc.webp'
import spscLogo from '@/assets/spsc.webp'
import bpscLogo from '@/assets/bpsc.webp'
import kppscLogo from '@/assets/kppsc.webp'

const logoMap: Record<string, string> = {
  'fpsc': fpscLogo,
  'ppsc': ppscLogo,
  'spsc': spscLogo,
  'bpsc': bpscLogo,
  'kppsc': kppscLogo,
}

export default function TestHistoryPage() {
  const { t, i18n } = useTranslation()
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fetchHistory = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/exams/history')
      if (!res.ok) throw new Error('Failed to fetch history')
      const data = await res.json()
      if (data && Array.isArray(data.history)) {
        setHistory(data.history)
      }
    } catch (err) {
      console.error('Error fetching exam history:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}${t('dashboard.tests.history.units.m')} ${s}${t('dashboard.tests.history.units.s')}`
  }

  const formatDate = (dateStr: string) => {
    const isUr = i18n.language.toLowerCase().startsWith('ur')
    const locale = isUr ? 'ur-PK' : 'en-US'
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader 
        title={t('dashboard.tests.history.title')}
        subtitle={t('dashboard.tests.history.subtitle')}
      />

      {loading ? (
        <div className="min-h-[40vh] flex flex-col justify-center items-center font-sans" style={{ color: 'var(--text-primary)' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--color-primary)' }} />
            <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>{t('dashboard.tests.history.loading')}</p>
          </div>
        </div>
      ) : history.length === 0 ? (
        <div className="card p-12 text-center flex flex-col items-center justify-center gap-4 border-2 border-dashed" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-muted)]">
            <ClipboardList size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{t('dashboard.tests.history.emptyTitle')}</h3>
            <p className="text-xs max-w-sm mx-auto text-muted-foreground leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('dashboard.tests.history.emptyDesc')}
            </p>
          </div>
          <Link to="/test-preparations" className="py-2.5 px-6 rounded-xl gradient-brand text-white text-xs font-semibold hover:shadow-lg transition-all">
            {t('dashboard.tests.history.emptyCta')}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Attempts Table */}
          <div className="flex-1 card overflow-hidden border w-full" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th className="py-4 px-6">{t('dashboard.tests.history.th.commissionExam')}</th>
                    <th className="py-4 px-6 text-center">{t('dashboard.tests.history.th.score')}</th>
                    <th className="py-4 px-6 text-center">{t('dashboard.tests.history.th.percentage')}</th>
                    <th className="py-4 px-6 text-center">{t('dashboard.tests.history.th.duration')}</th>
                    <th className="py-4 px-6 text-center">{t('dashboard.tests.history.th.status')}</th>
                    <th className="py-4 px-6 text-right">{t('dashboard.tests.history.th.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  {history.map((row) => {
                    const scoreVal = typeof row.score === 'number' ? row.score : parseFloat(row.score || '0')
                    const pct = ((scoreVal / row.total_questions) * 100).toFixed(1)
                    const hasPassed = parseFloat(pct) >= row.passing_score
                    
                    const logoKey = (row.logo_url || row.exam_category || '').toLowerCase().trim()
                    const examLogo = logoMap[logoKey] ? logoMap[logoKey] : null

                    return (
                      <tr key={row.attempt_id} className="hover:bg-[var(--sidebar-hover)] transition-all">
                        <td className="py-4 px-6 flex items-center gap-3">
                          {examLogo ? (
                            <img src={examLogo} alt={row.exam_category} className="w-8 h-8 object-contain rounded-lg p-0.5 border bg-white" style={{ borderColor: 'var(--border-color)' }} />
                          ) : (
                            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                              {row.exam_category || 'AB'}
                            </div>
                          )}
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{row.exam_course}</span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-[var(--bg-elevated)] text-[var(--color-primary)]" style={{ borderColor: 'var(--border-color)' }}>{row.exam_category}</span>
                            </div>
                            <div className="text-[10px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                              <Calendar size={10} />
                              {formatDate(row.completed_at || row.created_at)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-bold">
                          <span style={{ color: scoreVal >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {scoreVal.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-normal" style={{ color: 'var(--text-secondary)' }}> / {row.total_questions}</span>
                        </td>
                        <td className="py-4 px-6 text-center font-bold">
                          {pct}%
                        </td>
                        <td className="py-4 px-6 text-center font-mono">
                          {formatTime(row.time_spent)}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Badge variant={hasPassed ? 'success' : 'error'}>
                            {hasPassed ? t('dashboard.tests.history.passed') : t('dashboard.tests.history.failed')}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link 
                            to={`/test-preparations/history/review/${row.attempt_id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:bg-[var(--sidebar-hover)] transition-all cursor-pointer font-semibold text-[11px]"
                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                          >
                            <Eye size={12} /> {t('dashboard.tests.history.review')}
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </MotionPage>
  )
}
