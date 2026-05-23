import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Star } from 'lucide-react'
import { type Course } from '@/data/mockCourses'
import { ProgressBar, Badge } from '@/components/shared/Badge'
import { staggerItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface CourseProgressCardProps {
  course: Course
  className?: string
}

export function CourseProgressCard({ course, className }: CourseProgressCardProps) {
  const progress = course.progress ?? 0

  return (
    <motion.div variants={staggerItem}
      className={cn('card p-4 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group', className)}>
      {/* Thumbnail */}
      <div className="relative h-28 rounded-xl overflow-hidden bg-[var(--bg-elevated)]">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <Link to={`/learn/${course.id}/l1`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Play size={14} style={{ color: 'var(--color-primary)' }} fill="var(--color-primary)" />
          </Link>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant={course.level === 'Beginner' ? 'success' : course.level === 'Advanced' ? 'error' : 'default'} size="sm">
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{course.title}</h3>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{course.instructor}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star size={12} fill="var(--color-warning)" style={{ color: 'var(--color-warning)' }} />
        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{course.rating}</span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {course.duration}</span>
      </div>

      {/* Progress */}
      {progress > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-muted)' }}>
            <span>Progress</span><span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}
    </motion.div>
  )
}
