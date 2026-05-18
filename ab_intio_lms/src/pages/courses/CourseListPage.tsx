import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, Users, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'

/**
 * CourseListPage Component:
 * - Renders a beautiful visual search and category catalog for student learning.
 * - Features dynamic text matching, categories filtering, and clean course details cards.
 * - Seamlessly displays current course progress meters and navigation entries.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge, ProgressBar } from '@/components/shared/Badge'
import { CardSkeleton } from '@/components/shared/EmptyState'
import { mockCourses, CATEGORIES, type Course } from '@/data/mockCourses'
import { formatCount } from '@/lib/utils'
import { staggerItem } from '@/animations/variants'

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div variants={staggerItem}
      className="card flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden bg-[var(--bg-elevated)]">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 right-2">
          <Badge variant={course.level === 'Beginner' ? 'success' : course.level === 'Advanced' ? 'error' : 'default'} size="sm">{course.level}</Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{course.category}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{course.title}</h3>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>by {course.instructor}</p>

        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1"><Star size={11} fill="var(--color-warning)" style={{ color: 'var(--color-warning)' }} />{course.rating}</span>
          <span className="flex items-center gap-1"><Users size={11} />{formatCount(course.students)}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
        </div>

        {course.progress !== undefined && <ProgressBar value={course.progress} showLabel />}

        <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>${course.price}</span>
          <Link to={`/courses/${course.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg gradient-brand text-white hover:opacity-90 transition-opacity">
            View Course
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function CourseListPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [loading] = useState(false)

  const filtered = mockCourses.filter(c =>
    (activeCategory === 'All' || c.category === activeCategory) &&
    c.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="Course Catalog" subtitle={`${filtered.length} courses available`} />

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input id="course-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button key={cat} id={`cat-${cat.replace(/\//g, '-')}`} onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
            style={activeCategory === cat
              ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' }
              : { background: 'transparent', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
            }>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <MotionList key={activeCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(c => <MotionItem key={c.id}><CourseCard course={c} /></MotionItem>)}
          </MotionList>
        </AnimatePresence>
      )}
    </MotionPage>
  )
}
