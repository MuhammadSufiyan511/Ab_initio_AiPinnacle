import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Award, CheckCircle2, TrendingUp } from 'lucide-react'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { CourseProgressCard } from '@/components/dashboard/CourseProgressCard'
import { AssignmentTimeline } from '@/components/dashboard/AssignmentTimeline'
import { LearningAnalyticsWidget } from '@/components/dashboard/LearningAnalyticsWidget'
import { PageHeader } from '@/components/shared/PageHeader'
import { mockCourses } from '@/data/mockCourses'
import { mockNotifications } from '@/data/mockQuizzes'
import { cn } from '@/lib/utils'

const enrolled = mockCourses.filter(c => c.progress !== undefined)

export default function StudentDashboard() {
  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="My Dashboard" subtitle="Track your learning progress" />

      {/* Welcome Banner displays user info and custom greeting */}
      <WelcomeBanner />

      {/* Main dashboard content - showing only My Progress section taking the full width */}
      <div className="w-full card p-6 lg:p-8">
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>My Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <BookOpen size={20} />, value: '3', label: 'Enrolled', colorClass: 'bg-indigo-500/10 text-indigo-400' },
            { icon: <Award size={20} />, value: '2', label: 'Certificates', colorClass: 'bg-amber-500/10 text-amber-400' },
            { icon: <CheckCircle2 size={20} />, value: '47', label: 'Lessons Done', colorClass: 'bg-emerald-500/10 text-emerald-400' },
            { icon: <TrendingUp size={20} />, value: '84%', label: 'Avg Score', colorClass: 'bg-rose-500/10 text-rose-400' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center flex flex-col items-center justify-center border hover:shadow-md transition-shadow" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", s.colorClass)}>
                {s.icon}
              </div>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
