import React from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, CheckCircle2, Clock, Play, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ActiveAttempt } from '@/hooks/useDashboardData'

import fpscLogo from '@/assets/fpsc.webp'
import ppscLogo from '@/assets/ppsc.webp'
import spscLogo from '@/assets/spsc.webp'
import bpscLogo from '@/assets/bpsc.webp'
import kppscLogo from '@/assets/kppsc.webp'

const logoMap: Record<string, string> = {
  fpsc: fpscLogo,
  ppsc: ppscLogo,
  spsc: spscLogo,
  bpsc: bpscLogo,
  kppsc: kppscLogo,
}

const formatSeconds = (sec: number): string => {
  const hrs = Math.floor(sec / 3600)
  const mins = Math.floor((sec % 3600) / 60)
  const secs = sec % 60
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

interface ActiveSessionsProps {
  attempts: ActiveAttempt[]
  loading: boolean
}

export function ActiveSessions({ attempts, loading }: ActiveSessionsProps) {
  const { t } = useTranslation()

  return (
    <div
      className="w-full card p-6 lg:p-8 relative overflow-hidden bg-[var(--bg-surface)] border"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 pb-3 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>
            {t('dashboard.student.activeSessions')}
          </h3>
        </div>
        {attempts.length > 0 && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
            {attempts.length} Active
          </span>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div
            className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: 'var(--border-color)',
              borderTopColor: 'var(--color-primary)',
            }}
          />
          <p className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            Checking active exam attempts...
          </p>
        </div>
      ) : attempts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {attempts.map((attempt) => {
            const answeredPct =
              attempt.total_questions > 0
                ? Math.round((attempt.answered_count / attempt.total_questions) * 100)
                : 0

            const logoKey = (attempt.logo_url || attempt.exam_category || '').toLowerCase().trim()
            const examLogo = logoMap[logoKey] ?? null

            const cleanTitle = (attempt.exam_title || '')
              .replace(/Mock Exam/gi, '')
              .replace(/Proctored Simulation/gi, '')
              .replace(/Simulation/gi, '')
              .replace(/Mock/gi, '')
              .trim()

            return (
              <div
                key={attempt.attempt_id}
                className="p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-elevated)] hover:shadow-md transition-all duration-200"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto">
                  {examLogo ? (
                    <img
                      src={examLogo}
                      alt=""
                      className="w-12 h-12 object-contain bg-[var(--bg-surface)] p-2 rounded-xl border shrink-0"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border text-[var(--color-primary)] font-bold text-xs shrink-0"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      {attempt.exam_category || 'FPSC'}
                    </div>
                  )}

                  <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <h4 className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>
                      {`${attempt.exam_category || 'FPSC'} ${cleanTitle} Official Exam`}
                    </h4>

                    <div
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Answered: <strong>{attempt.answered_count}</strong> / {attempt.total_questions}
                      </span>
                      <span className="hidden sm:inline text-[var(--text-muted)]">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Time Remaining: <strong>{formatSeconds(attempt.remaining_time)}</strong>
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="w-full sm:w-64 h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden mt-1 border"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <div
                        className="h-full rounded-full gradient-brand"
                        style={{ width: `${answeredPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={`/test-preparations/exam/${attempt.exam_id}`}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t('dashboard.student.resume')}</span>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div
          className="py-6 px-4 rounded-2xl border border-dashed text-center flex flex-col items-center gap-3 bg-[var(--bg-elevated)]"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div
            className="p-3 rounded-full bg-[var(--bg-surface)] border text-[var(--text-muted)]"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <ClipboardList className="w-6 h-6" />
          </div>
          <div className="max-w-md flex flex-col gap-1">
            <h4 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('dashboard.student.noActive')}
            </h4>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              You don't have any in-progress examinations. Start a new proctored exam from the
              Examinations catalog to test your skills.
            </p>
          </div>
          <Link
            to="/test-preparations"
            className="mt-1 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:shadow-md transition-all flex items-center gap-1"
          >
            {t('dashboard.student.browse')} <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
