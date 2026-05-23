import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, X, CheckCircle2, Shield, TrendingUp, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const features = [
  { icon: Shield, label: 'Official Exam Syllabus' },
  { icon: TrendingUp, label: 'AI-Powered Analytics' },
  { icon: CheckCircle2, label: 'Real Exam Environment' },
  { icon: Clock, label: 'Live Timer & Scoring' },
]

const stats = [
  { number: '10K+', label: 'Active Students' },
  { number: '5K+', label: 'Practice MCQs' },
  { number: '92%', label: 'Success Rate' },
]

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative overflow-hidden px-4 md:px-8 pt-4 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(255,255,255,0.16) 0, transparent 26%),
            radial-gradient(circle at 86% 20%, rgba(245,158,11,0.18) 0, transparent 22%),
            radial-gradient(circle at 72% 82%, rgba(255,255,255,0.10) 0, transparent 24%),
            linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #1e40af 100%)
          `,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[14%] hidden h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm lg:block"
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] hidden h-12 w-12 rounded-full border border-amber-200/30 bg-amber-400/20 backdrop-blur-sm lg:block"
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[14%] bottom-[18%] hidden h-16 w-16 rounded-[1.25rem] border border-white/20 bg-white/10 backdrop-blur-sm lg:block"
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[2rem] border px-6 py-8 sm:px-10 lg:px-16 lg:py-12"
          style={{
            background: 'linear-gradient(180deg, rgba(37,99,235,0.98) 0%, rgba(29,78,216,0.98) 100%)',
            borderColor: 'rgba(255,255,255,0.16)',
            boxShadow: '0 30px 90px rgba(15,23,42,0.24)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              background: 'radial-gradient(circle at top left, rgba(255,255,255,0.10), transparent 30%)',
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.h1
                variants={fadeUp}
                className="text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.2rem]"
                style={{ color: '#ffffff' }}
              >
                Prepare Smarter.
                <br />
                <span style={{ color: '#f59e0b' }}>Pass Your Exam.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="max-w-lg text-[1.03rem] leading-[1.8]"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                Authentic FPSC, PPSC, SPSC, BPSC & KPPSC practice powered by the official
                government syllabus - with AI analytics, real-time scoring, and past paper archives.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      borderColor: 'rgba(255,255,255,0.18)',
                      color: '#ffffff',
                    }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.14)' }}
                    >
                      <Icon size={16} style={{ color: '#ffffff' }} />
                    </span>
                    {label}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#f59e0b', boxShadow: '0 12px 32px rgba(15,23,42,0.24)' }}
                >
                  Start Free Preparation
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-8 border-t pt-5"
                style={{ borderColor: 'rgba(255,255,255,0.16)' }}
              >
                {stats.map(({ number, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-black" style={{ color: '#f59e0b' }}>
                      {number}
                    </p>
                    <p className="text-xs font-medium" style={{ color: '#ffffff' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
            >
              <div
                className="relative overflow-hidden rounded-[1.75rem] border p-4"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.18)',
                  boxShadow: '0 28px 80px rgba(15,23,42,0.18)',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/12" style={{ aspectRatio: '16/9' }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setVideoOpen(true)}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                    >
                      <Play size={24} className="ml-1 fill-blue-700 text-blue-700" />
                    </button>
                  </div>
                  <p className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-100">
                    Official exam demo
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              >
                <X size={18} />
              </button>

              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  aspectRatio: '16/9',
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #1e40af 100%)',
                }}
              >
                <video
                  autoPlay
                  controls
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <Play size={48} className="opacity-40 text-white" />
                  <p className="text-sm font-medium text-white/90">Professional demo video coming soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
