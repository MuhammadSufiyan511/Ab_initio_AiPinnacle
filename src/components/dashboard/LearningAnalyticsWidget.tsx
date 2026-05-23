import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { weeklyStudyData } from '@/data/mockAnalytics'

interface CustomTooltipProps { active?: boolean; payload?: { value: number }[]; label?: string }

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="card px-3 py-2 text-xs" style={{ color: 'var(--text-primary)' }}>
      <p className="font-semibold">{label}</p>
      <p style={{ color: 'var(--color-primary)' }}>{payload[0].value}h studied</p>
    </div>
  )
}

export function LearningAnalyticsWidget() {
  const totalHours = weeklyStudyData.reduce((s, d) => s + d.hours, 0).toFixed(1)

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Weekly Study Time</h3>
        <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{totalHours}h</span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={weeklyStudyData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
          <defs>
            <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="hours" stroke="var(--color-primary)" strokeWidth={2}
            fill="url(#studyGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--color-primary)' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
