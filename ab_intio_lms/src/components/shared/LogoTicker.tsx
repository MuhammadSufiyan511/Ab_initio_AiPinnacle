import React from 'react'
import { useTranslation } from 'react-i18next'

import fpsc from '@/assets/fpsc.webp'
import ppsc from '@/assets/ppsc.webp'
import spsc from '@/assets/spsc.webp'
import bpsc from '@/assets/bpsc.webp'
import kppsc from '@/assets/kppsc.webp'

const logos = [
  { src: fpsc, alt: 'Federal Public Service Commission' },
  { src: ppsc, alt: 'Punjab Public Service Commission' },
  { src: spsc, alt: 'Sindh Public Service Commission' },
  { src: bpsc, alt: 'Balochistan Public Service Commission' },
  { src: kppsc, alt: 'Khyber Pakhtunkhwa Public Service Commission' },
]

export function LogoTicker() {
  const { t } = useTranslation()

  return (
    <div className="w-full overflow-hidden py-12 border-y bg-[var(--bg-surface)] relative" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {t('public.logoTickerTagline')}
        </p>
      </div>
      
      {/* Gradient Fades for Smooth Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-surface), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-surface), transparent)' }} />

      <div className="relative w-full h-20 md:h-24 overflow-hidden">
        <div className="ticker-lane ticker-lane-a">
          <div className="ticker-group">
            {logos.map((logo, index) => (
              <img
                key={`lane-a-${index}`}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-16 md:h-20 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 drop-shadow-sm"
              />
            ))}
          </div>
        </div>
        <div className="ticker-lane ticker-lane-b">
          <div className="ticker-group">
            {logos.map((logo, index) => (
              <img
                key={`lane-b-${index}`}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-16 md:h-20 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 drop-shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
