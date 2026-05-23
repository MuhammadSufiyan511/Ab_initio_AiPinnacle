import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface HeroContentProps {
  title1: string
  title2: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  satisfactionValue: string
  satisfactionLabel: string
  studentsValue: string
  studentsLabel: string
  supportValue: string
  supportLabel: string
}

function HeroContentComponent({
  title1,
  title2,
  subtitle,
  primaryCta,
  secondaryCta,
  satisfactionValue,
  satisfactionLabel,
  studentsValue,
  studentsLabel,
  supportValue,
  supportLabel,
}: HeroContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto w-full max-w-xl space-y-6 sm:space-y-8 xl:max-w-none"
    >
      <div className="space-y-4 sm:space-y-5">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl"
          style={{ fontFamily: '"Poppins", system-ui, sans-serif', color: 'var(--text-primary)' }}
        >
          {title1}
          <span className="block bg-gradient-to-r from-blue-400 via-blue-600 to-amber-500 bg-clip-text text-transparent">
            {title2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl font-sans text-base leading-relaxed sm:text-lg md:text-xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4"
      >
        <Link
          to="/signup"
          className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 px-6 text-base font-semibold text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 sm:w-auto sm:px-8"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-white/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative z-10 inline-flex items-center">
            {primaryCta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/login"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl border-2 px-6 text-base font-semibold transition-all duration-200 hover:bg-blue-50 dark:hover:bg-white/5 sm:w-auto sm:px-8"
          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        >
          {secondaryCta}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap gap-x-6 gap-y-4 pt-6 sm:gap-x-8 sm:pt-8"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div className="min-w-[120px]">
          <p className="text-2xl font-bold text-blue-600 sm:text-3xl" style={{ fontFamily: '"Poppins", system-ui, sans-serif' }}>
            {satisfactionValue}
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{satisfactionLabel}</p>
        </div>
        <div className="min-w-[120px]">
          <p className="text-2xl font-bold text-blue-600 sm:text-3xl" style={{ fontFamily: '"Poppins", system-ui, sans-serif' }}>
            {studentsValue}
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{studentsLabel}</p>
        </div>
        <div className="min-w-[120px]">
          <p className="text-2xl font-bold text-blue-600 sm:text-3xl" style={{ fontFamily: '"Poppins", system-ui, sans-serif' }}>
            {supportValue}
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{supportLabel}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const HeroContent = memo(HeroContentComponent)
