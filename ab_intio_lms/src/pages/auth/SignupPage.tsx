import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, GraduationCap, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/animations/variants'

const STEPS = ['Role', 'Info', 'Account']
type Role = 'student' | 'instructor'

export default function SignupPage() {
  const [step, setStep]       = useState(0)
  const [role, setRole]       = useState<Role>('student')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) { setStep(s => s + 1); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
  const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Create your account</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Start your learning journey today — free forever</p>
      </motion.div>

      {/* Progress bar */}
      <div className="flex gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col gap-1">
            <div className="h-1 rounded-full transition-all duration-500 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div className="h-full rounded-full transition-all duration-500 gradient-brand" style={{ width: i <= step ? '100%' : '0%' }} />
            </div>
            <span className="text-[10px]" style={{ color: i <= step ? 'var(--color-primary)' : 'var(--text-muted)' }}>{s}</span>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-3">
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>I want to join as a…</p>
              {([
                { value: 'student', label: 'Student', desc: 'Access courses and learn at my pace', icon: <GraduationCap size={20} /> },
                { value: 'instructor', label: 'Instructor', desc: 'Create and sell my own courses', icon: <BookOpen size={20} /> },
              ] as const).map(opt => (
                <button key={opt.value} type="button" onClick={() => setRole(opt.value)}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
                  style={{ borderColor: role === opt.value ? 'var(--color-primary)' : 'var(--border-color)', background: role === opt.value ? 'rgba(99,102,241,0.07)' : 'var(--input-bg)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--color-primary)' }}>{opt.icon}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Full name</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><User size={15} /></span>
                  <input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" required type="text" id="signup-name" /></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email address</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Mail size={15} /></span>
                  <input className={`${inputCls} pl-10`} style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required type="email" id="signup-email" /></div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Create password</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Lock size={15} /></span>
                  <input className={`${inputCls} pl-10`} style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} type="password" id="signup-password" placeholder="Min 8 characters" required minLength={8} /></div>
              </div>
              <div className="flex gap-1 mt-1">{[1,2,3,4].map(i => <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: password.length >= i * 2 ? 'var(--color-success)' : 'var(--bg-elevated)' }} />)}</div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>By signing up you agree to our <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>Terms of Service</a></p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-2">
          {step > 0 && <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm border transition-colors hover:bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><ArrowLeft size={14} /> Back</button>}
          <button id="signup-next" type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60">
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>{step === 2 ? 'Create Account' : 'Continue'} <ArrowRight size={14} /></>}
          </button>
        </div>
      </form>

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
      </p>
    </motion.div>
  )
}
