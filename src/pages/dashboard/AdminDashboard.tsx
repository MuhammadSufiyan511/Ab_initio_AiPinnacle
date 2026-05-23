import { Users, BookOpen, TrendingUp, Award } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { userGrowthData, adminMetrics } from '@/data/mockAnalytics'

const ACTIVITY = [
  { user: 'Priya Sharma', action: 'Enrolled in React Masterclass', time: '3m ago', type: '📚' },
  { user: 'Carlos Ruiz', action: 'Completed ML Fundamentals', time: '12m ago', type: '🏆' },
  { user: 'Emma Liu', action: 'Posted a course review', time: '28m ago', type: '⭐' },
  { user: 'James Osei', action: 'Submitted Data Science project', time: '1h ago', type: '📊' },
  { user: 'Aisha Khan', action: 'Created instructor account', time: '2h ago', type: '👩‍🏫' },
]

export default function AdminDashboard() {
  const adminStats = [
    { label: 'Total Users',      value: adminMetrics.totalUsers.toLocaleString(), icon: <Users size={18} />, trend: { value: 8, positive: true },  accent: 'var(--color-primary)' },
    { label: 'Active Users',     value: adminMetrics.activeUsers.toLocaleString(), icon: <TrendingUp size={18} />, trend: { value: 5, positive: true }, accent: 'var(--color-accent)' },
    { label: 'Total Courses',    value: adminMetrics.totalCourses.toString(), icon: <BookOpen size={18} />, trend: { value: 3, positive: true }, accent: 'var(--color-secondary)' },
    { label: 'Completion Rate',  value: `${adminMetrics.completionRate}%`, icon: <Award size={18} />, trend: { value: 2, positive: true }, accent: 'var(--color-warning)' },
  ]

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Admin Dashboard" subtitle="Platform overview and system metrics" />

      <MotionList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map(s => <MotionItem key={s.label}><StatCard {...s} /></MotionItem>)}
      </MotionList>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User growth */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>User Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={userGrowthData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="studentsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} />
              <Area type="monotone" dataKey="students" stroke="var(--color-primary)" strokeWidth={2} fill="url(#studentsGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly revenue */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Revenue Overview</h3>
            <span className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>${adminMetrics.monthlyRevenue.toLocaleString()}</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={userGrowthData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} />
              <Bar dataKey="students" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live activity feed */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Live Activity Feed</h3>
        <div className="flex flex-col gap-0">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-xl w-8 text-center flex-shrink-0">{a.type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-semibold">{a.user}</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{a.action}</span>
                </p>
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
