import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface InputFieldProps {
  id: string; label: string; type: string; value: string
  onChange: (v: string) => void; icon: React.ReactNode
  suffix?: React.ReactNode; placeholder?: string
}

function InputField({ id, label, type, value, onChange, icon, suffix, placeholder }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>{icon}</span>
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all border"
          style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-color)')} />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</span>}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Welcome back</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sign in to continue your learning journey</p>
      </motion.div>

      {/* Social buttons */}
      <motion.div variants={staggerItem} className="grid grid-cols-2 gap-3">
        {['Google', 'GitHub'].map(provider => (
          <button key={provider} className={cn('flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-[var(--bg-elevated)]')}
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <span className="text-base">{provider === 'Google' ? '🔵' : '⚫'}</span> {provider}
          </button>
        ))}
      </motion.div>

      <motion.div variants={staggerItem} className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or continue with email</span>
        <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
      </motion.div>

      <motion.form variants={staggerItem} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField id="login-email" label="Email address" type="email" value={email} onChange={setEmail}
          icon={<Mail size={15} />} placeholder="you@example.com" />
        <InputField id="login-password" label="Password" type={showPw ? 'text' : 'password'}
          value={password} onChange={setPassword} icon={<Lock size={15} />} placeholder="••••••••"
          suffix={
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ color: 'var(--text-muted)' }}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
            <input type="checkbox" className="rounded" /> Remember me
          </label>
          <Link to="/forgot-password" className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>Forgot password?</Link>
        </div>

        <button id="login-submit" type="submit" disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white gradient-brand transition-opacity hover:opacity-90 disabled:opacity-60 mt-1">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight size={15} /></>}
        </button>
      </motion.form>

      <motion.p variants={staggerItem} className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Create one free</Link>
      </motion.p>
    </motion.div>
  )
}
