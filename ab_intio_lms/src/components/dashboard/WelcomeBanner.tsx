import { motion } from 'framer-motion'
import { Flame, BookOpen, Target } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { staggerContainer, staggerItem } from '@/animations/variants'

interface WelcomeBannerProps {
  streak?: number
  completedToday?: number
  goalHours?: number
}

export function WelcomeBanner({ streak = 7, completedToday = 2, goalHours = 3 }: WelcomeBannerProps) {
  const { user } = useUserStore()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.div
      variants={staggerContainer} initial="hidden" animate="visible"
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, #312e81 50%, var(--color-secondary) 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10 bg-white" />
      <div className="absolute right-20 -bottom-10 w-32 h-32 rounded-full opacity-10 bg-white" />

      <motion.div variants={staggerItem} className="relative z-10">
        <p className="text-indigo-200 text-sm mb-1">{greeting},</p>
        <h2 className="text-white text-2xl font-bold mb-4">{user.name.split(' ')[0]} 👋</h2>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-wrap gap-3 relative z-10">
        {[
          { icon: <Flame size={14} />, label: `${streak} day streak`, color: '#fbbf24' },
          { icon: <BookOpen size={14} />, label: `${completedToday} lessons today`, color: '#34d399' },
          { icon: <Target size={14} />, label: `${goalHours}h daily goal`, color: '#818cf8' },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span style={{ color: stat.color }}>{stat.icon}</span>
            <span className="text-white text-xs font-medium">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
