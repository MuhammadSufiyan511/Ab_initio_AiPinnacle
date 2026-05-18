import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import { Users, BookOpen, TrendingUp, Star } from 'lucide-react'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { studentEngagementData, courseCompletionData } from '@/data/mockAnalytics'

const INSTRUCTOR_STATS = [
  { label: 'Total Students', value: '1,248', icon: <Users size={18} />, trend: { value: 12, positive: true }, accent: 'var(--color-primary)' },
  { label: 'Active Courses', value: '6', icon: <BookOpen size={18} />, trend: { value: 0, positive: true }, accent: 'var(--color-accent)' },
  { label: 'Avg Rating', value: '4.8', icon: <Star size={18} />, trend: { value: 3, positive: true }, accent: 'var(--color-warning)' },
  { label: 'Completion Rate', value: '73%', icon: <TrendingUp size={18} />, trend: { value: 5, positive: true }, accent: 'var(--color-secondary)' },
]

const SUBMISSIONS = [
  { student: 'Priya Sharma', course: 'React Masterclass', assignment: 'Hooks Report', grade: 92, time: '2h ago' },
  { student: 'Liam Chen', course: 'React Masterclass', assignment: 'Final Project', grade: 88, time: '5h ago' },
  { student: 'Sofia Gomez', course: 'UI/UX Design', assignment: 'Design System', grade: 95, time: '1d ago' },
]

export default function InstructorDashboard() {
  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Instructor Dashboard" subtitle="Manage your courses and students" />

      <MotionList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INSTRUCTOR_STATS.map(s => <MotionItem key={s.label}><StatCard {...s} /></MotionItem>)}
      </MotionList>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student engagement chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Student Engagement</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={studentEngagementData} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} />
              <Line type="monotone" dataKey="active" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="new" stroke="var(--color-accent)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{ color: 'var(--color-primary)', label: 'Active students' }, { color: 'var(--color-accent)', label: 'New enrollments' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-3 h-0.5 rounded inline-block" style={{ background: l.color }} /> {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Course completion */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Course Completion</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={courseCompletionData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 8 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10, fontSize: 11 }} formatter={(v) => [`${v}%`, 'Completion']} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {courseCompletionData.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent submissions */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Recent Submissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
              {['Student', 'Course', 'Assignment', 'Grade', 'Submitted'].map(h => <th key={h} className="pb-3 pr-4 font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {SUBMISSIONS.map((s, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: 'var(--text-primary)' }}>{s.student}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{s.course}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{s.assignment}</td>
                  <td className="py-3 pr-4"><span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: 'var(--color-success)' }}>{s.grade}/100</span></td>
                  <td className="py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MotionPage>
  )
}
