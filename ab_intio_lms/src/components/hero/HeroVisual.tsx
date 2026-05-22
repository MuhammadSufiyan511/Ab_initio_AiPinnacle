import { memo } from 'react'
import { motion } from 'framer-motion'

import fpsc from '@/assets/fpsc.webp'
import ppsc from '@/assets/ppsc.webp'
import spsc from '@/assets/spsc.webp'
import bpsc from '@/assets/bpsc.webp'
import kppsc from '@/assets/kppsc.webp'

const commissionLogos = [
  { src: fpsc, alt: 'FPSC' },
  { src: ppsc, alt: 'PPSC' },
  { src: spsc, alt: 'SPSC' },
  { src: bpsc, alt: 'BPSC' },
  { src: kppsc, alt: 'KPPSC' },
]

interface HeroVisualProps {
  videoTitle: string
  videoSubtitle: string
}

function HeroVisualComponent({ videoTitle, videoSubtitle }: HeroVisualProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-none"
    >
      {/* Commission Logos */}
      <div className="mb-5 flex items-center justify-center gap-3 sm:gap-4">
        {commissionLogos.map((logo) => (
          <motion.img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-10 w-10 rounded-xl border object-contain p-1 shadow-sm sm:h-12 sm:w-12 bg-white/80 dark:bg-white/10 dark:border-white/10"
            style={{ borderColor: 'var(--border-color)' }}
          />
        ))}
      </div>

      {/* Video Card */}
      <div className="relative aspect-[16/10] w-full max-h-[420px] overflow-hidden rounded-2xl shadow-2xl sm:aspect-[16/9] sm:max-h-[500px] lg:max-h-[620px]">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-amber-500">
          <div className="text-center text-white">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-4"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </motion.div>
            <p className="text-lg font-semibold">{videoTitle}</p>
            <p className="mt-2 text-sm text-white/80">{videoSubtitle}</p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/20" />
      </div>

      <motion.div
        className="absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-amber-400/10 blur-3xl lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full bg-blue-400/10 blur-3xl lg:block"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export const HeroVisual = memo(HeroVisualComponent)

