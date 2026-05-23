import { motion } from 'framer-motion'
import { Flame, BookOpen, Target, Play, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import { staggerContainer, staggerItem } from '@/animations/variants'
import { useTranslation } from 'react-i18next'

interface WelcomeBannerProps {
  streak?: number
  completedToday?: number
  goalHours?: number
}

export function WelcomeBanner({ streak = 7, completedToday = 2, goalHours = 3 }: WelcomeBannerProps) {
  const { t } = useTranslation()
  const { user } = useUserStore()
  const hour = new Date().getHours()
  const greetingKey = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const greeting = t(`dashboard.banner.greeting.${greetingKey}`)

  return (
    <motion.div
      variants={staggerContainer} initial="hidden" animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      {/* Left side: Test Preparations CTA */}
      <motion.div variants={staggerItem} className="rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center border shadow-sm group" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/20">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>{t('dashboard.banner.skillValidation')}</span>
          </div>
          <div>
            <h3 className="text-xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>{t('dashboard.banner.title')}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('dashboard.banner.desc')}
            </p>
          </div>
          <Link to="/test-preparations" className="mt-2 w-fit px-6 py-3 rounded-xl text-sm font-bold text-white gradient-brand shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5">
            {t('dashboard.banner.cta')} <Play size={14} className="fill-current" />
          </Link>
        </div>
      </motion.div>

      {/* Right side: Welcome Content */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm flex flex-col justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, #312e81 50%, var(--color-secondary) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="absolute right-20 -bottom-10 w-32 h-32 rounded-full opacity-10 bg-white pointer-events-none" />

        <div className="relative z-10">
          <p className="text-indigo-200 text-sm mb-1">{greeting},</p>
          <h2 className="text-white text-3xl font-bold mb-6">{(user?.name || t('dashboard.topbar.studentFallback')).split(' ')[0]} 👋</h2>
        </div>

        <div className="flex flex-col gap-3 relative z-10 text-white/95 mt-auto">
          <h4 className="text-xs font-black uppercase tracking-widest text-indigo-200">{t('dashboard.banner.guidelinesTitle')}</h4>
          <ul className="flex flex-col gap-2 text-[11px] leading-normal text-indigo-100">
            <li className="flex items-start gap-1.5">
              <span className="text-indigo-300 font-bold">•</span>
              <span><strong>{t('dashboard.banner.guideline1')}</strong> </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-indigo-300 font-bold">•</span>
              <span><strong>{t('dashboard.banner.guideline2')}</strong> </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-indigo-300 font-bold">•</span>
              <span><strong>{t('dashboard.banner.guideline3')}</strong> </span>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
