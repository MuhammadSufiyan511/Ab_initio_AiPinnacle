import React from 'react'

import fpscLogo from '@/assets/fpsc.webp'
import ppscLogo from '@/assets/ppsc.webp'
import spscLogo from '@/assets/spsc.webp'
import bpscLogo from '@/assets/bpsc.webp'
import kppscLogo from '@/assets/kppsc.webp'

const LOGOS = [
  { src: fpscLogo, alt: 'Federal Public Service Commission FPSC' },
  { src: ppscLogo, alt: 'Punjab Public Service Commission PPSC' },
  { src: spscLogo, alt: 'Sindh Public Service Commission SPSC' },
  { src: bpscLogo, alt: 'Balochistan Public Service Commission BPSC' },
  { src: kppscLogo, alt: 'Khyber Pakhtunkhwa Public Service Commission KPPSC' },
]

export function TrustedAuthoritiesCarousel() {
  return (
    <section
      className="w-full bg-white dark:bg-[#0d1017] border-y border-slate-200/60 dark:border-white/5 py-5 overflow-hidden relative"
      aria-label="Testing Authorities"
    >
      <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-white dark:from-[#0d1017] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-white dark:from-[#0d1017] to-transparent z-10 pointer-events-none" />

      <div className="ticker-viewport">
        {/* Primary track */}
        <div className="ticker-track ticker-track-primary">
          {LOGOS.map((logo, i) => (
            <div key={`p-${i}`} className="ticker-item">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Secondary track */}
        <div className="ticker-track ticker-track-secondary" aria-hidden="true">
          {LOGOS.map((logo, i) => (
            <div key={`s-${i}`} className="ticker-item">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
