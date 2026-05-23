import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'

/**
 * CalendarPage Component:
 * - Renders a premium monthly calendar grid (using May 2026 as example).
 * - Maps dates dynamically to display color-coded event markers (Live Sessions, Deadlines, Study Groups).
 * - Incorporates Framer Motion micro-interactions and hover states for individual event cards.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const EVENTS = [
  { id: 1, date: 15, title: 'React Masterclass Live Q&A', time: '10:00 AM', type: 'live' },
  { id: 2, date: 18, title: 'UI/UX Assignment Due', time: '11:59 PM', type: 'deadline' },
  { id: 3, date: 22, title: 'Machine Learning Study Group', time: '02:00 PM', type: 'group' },
  { id: 4, date: 25, title: 'CSS Animations Workshop', time: '04:00 PM', type: 'live' },
]

export default function CalendarPage() {
  const [currentDate] = useState(new Date(2026, 4, 15)) // May 2026 as example
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1
    return {
      day,
      isCurrentMonth: day > 0 && day <= daysInMonth,
      isToday: day === 15, // Mock today
      events: EVENTS.filter(e => e.date === day)
    }
  })

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Calendar" subtitle="Track your classes, assignments, and study sessions" />

      <div className="card p-6 flex flex-col gap-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>May 2026</h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 h-8 rounded-lg border text-xs font-medium hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Today
            </button>
            <button className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="border rounded-2xl overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
          {/* Weekdays */}
          <div className="grid grid-cols-7 border-b bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)' }}>
            {WEEK_DAYS.map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{day}</div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7">
            {days.map((d, i) => (
              <div key={i} className={cn('min-h-28 p-2 border-r border-b transition-colors', d.isCurrentMonth ? '' : 'opacity-40 bg-[var(--bg-elevated)]')}
                style={{ borderColor: 'var(--border-color)', ...(d.isToday ? { background: 'rgba(99,102,241,0.05)' } : {}) }}>
                <div className="flex justify-end mb-1">
                  <span className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium', d.isToday ? 'gradient-brand text-white' : '')}
                    style={{ color: d.isToday ? '#fff' : 'var(--text-primary)' }}>
                    {d.day > 0 && d.day <= daysInMonth ? d.day : d.day <= 0 ? d.day + 30 : d.day - 31}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {d.events.map(e => (
                    <motion.div key={e.id} whileHover={{ scale: 1.02 }} className="px-2 py-1.5 rounded-lg text-[10px] leading-tight cursor-pointer"
                      style={{
                        background: e.type === 'live' ? 'rgba(99,102,241,0.1)' : e.type === 'deadline' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                        border: `1px solid ${e.type === 'live' ? 'rgba(99,102,241,0.3)' : e.type === 'deadline' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                        color: e.type === 'live' ? 'var(--color-primary)' : e.type === 'deadline' ? 'var(--color-error)' : 'var(--color-success)',
                      }}>
                      <div className="font-semibold truncate mb-0.5">{e.title}</div>
                      <div className="flex items-center gap-1 opacity-80"><Clock size={9} /> {e.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionPage>
  )
}
