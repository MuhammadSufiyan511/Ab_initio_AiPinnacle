import { Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      {/* Left — Illustrated panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-10 w-[45%] flex-shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1060 0%, #0f1629 40%, #0a1628 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">Ab Initio LMS</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Learn without<br />
            <span className="gradient-text">limits.</span>
          </h2>
          <p className="text-[#94a3b8] text-lg leading-relaxed max-w-sm">
            Join thousands of learners on a next-generation platform built for the modern world.
          </p>

          {/* Stats */}
          <div className="mt-8 flex gap-8">
            {[{ label: 'Learners', value: '48K+' }, { label: 'Courses', value: '1,200+' }, { label: 'Instructors', value: '340+' }].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 glass rounded-2xl p-5">
          <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"Ab Initio transformed how I learn. The experience is unmatched."</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-xs text-white font-bold">MK</div>
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Maria K.</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Senior Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-8 py-5 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Ab Initio LMS</span>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="absolute top-4 right-4 hidden lg:block">
              <ThemeToggle />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
