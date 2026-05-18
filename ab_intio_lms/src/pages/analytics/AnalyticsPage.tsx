import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'
import { StatCard } from '@/components/shared/StatCard'

/**
 * AnalyticsPage Component:
 * - Displays a premium learning performance visualization dashboard.
 * - Integrates Recharts (BarChart, AreaChart, and custom tooltips) to plot daily study hours and monthly progress.
 * - Features an interactive 12-week grid-based Activity Heatmap showing learning sessions intensity.
 * - Details course-by-course progress breakdowns utilizing custom gradient assets.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { weeklyStudyData, monthlyProgressData, heatmapData, courseCompletionData } from '@/data/mockAnalytics'
import { Clock, BookOpen, Target, TrendingUp } from 'lucide-react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const INTENSITY = ['', 'rgba(99,102,241,0.15)', 'rgba(99,102,241,0.35)', 'rgba(99,102,241,0.6)', 'rgba(99,102,241,0.9)']

export default function AnalyticsPage() {
  const totalHrs = weeklyStudyData.reduce((s, d) => s + d.hours, 0).toFixed(1)

  const stats = [
    { label: 'Study Hours (Week)',  value: `${totalHrs}h`, icon: <Clock size={18} />,       trend: { value: 18, positive: true }, accent: 'var(--color-primary)' },
    { label: 'Courses Active',      value: '3',            icon: <BookOpen size={18} />,     trend: { value: 0,  positive: true }, accent: 'var(--color-accent)' },
    { label: 'Avg Quiz Score',      value: '84%',          icon: <Target size={18} />,       trend: { value: 6,  positive: true }, accent: 'var(--color-secondary)' },
    { label: 'Completion Rate',     value: '72%',          icon: <TrendingUp size={18} />,   trend: { value: 4,  positive: true }, accent: 'var(--color-warning)' },
  ]

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Learning Analytics" subtitle="Your learning performance at a glance" />

      <MotionList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <MotionItem key={s.label}><StatCard {...s} /></MotionItem>)}
      </MotionList>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly study */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Daily Study Hours</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyStudyData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} formatter={v => [`${v}h`, 'Studied']} />
              <Bar dataKey="hours" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" fill="var(--border-color)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly progress */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyProgressData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} />
              <Area type="monotone" dataKey="completed" stroke="var(--color-accent)" strokeWidth={2} fill="url(#compGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity heatmap */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Activity Heatmap (12 Weeks)</h3>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 mr-1">
            {DAYS.map(d => <div key={d} className="h-5 flex items-center text-[10px]" style={{ color: 'var(--text-muted)' }}>{d}</div>)}
          </div>
          <div className="flex gap-1 flex-1 overflow-x-auto">
            {Array.from({ length: 12 }, (_, col) => (
              <div key={col} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, row) => {
                  const cell = heatmapData.find(d => d.row === row && d.col === col)
                  return (
                    <div key={row} title={`${cell?.value ?? 0} sessions`}
                      className="w-5 h-5 rounded-[3px] transition-colors cursor-pointer hover:opacity-80"
                      style={{ background: INTENSITY[cell?.value ?? 0] || 'var(--bg-elevated)' }} />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px]" style={{ color: 'var(--text-muted)' }}>
          <span>Less</span>
          {INTENSITY.map((bg, i) => <div key={i} className="w-3 h-3 rounded-sm" style={{ background: bg || 'var(--bg-elevated)' }} />)}
          <span>More</span>
        </div>
      </div>

      {/* Course breakdown */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Course Completion</h3>
        <div className="flex flex-col gap-3">
          {courseCompletionData.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <p className="text-xs w-40 truncate" style={{ color: 'var(--text-secondary)' }}>{c.name}</p>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.value}%`, background: c.fill }} />
              </div>
              <span className="text-xs font-semibold w-10 text-right" style={{ color: 'var(--text-primary)' }}>{c.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
