import * as React from 'react'
import { useState } from 'react'
import { authService } from '@/services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const STEPS = ['Info', 'Account']

export default function SignupPage() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error(t('auth.errors.invalidEmail', 'Invalid email address format.'))
      return
    }

    if (step < 1) { 
      setStep(s => s + 1)
      return 
    }
    
    setLoading(true)
    try {
      const data = await authService.signup({ name, email, password })
      setUser({ ...data.user, role: 'student' })
      toast.success(`${t('auth.signup.createAccount')}! ${data.user.name}`)
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.message || t('auth.errors.registrationFailed', 'Registration failed. Please check details.'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
  const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t('auth.signup.title')}</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('auth.signup.subtitle')}</p>
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
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.signup.fullName')}</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><User size={15} /></span>
                  <input className={` ${inputCls} pl-10`} style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" required type="text" id="signup-name" /></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.signup.email')}</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Mail size={15} /></span>
                  <input className={`${inputCls} pl-10`} style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required type="email" id="signup-email" /></div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.signup.password')}</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Lock size={15} /></span>
                  <input className={`${inputCls} pl-10`} style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} type="password" id="signup-password" placeholder="Min 8 characters" required minLength={8} /></div>
              </div>
              <div className="flex gap-1 mt-1">{[1, 2, 3, 4].map(i => <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: password.length >= i * 2 ? 'var(--color-success)' : 'var(--bg-elevated)' }} />)}</div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>By signing up you agree to our <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>Terms of Service</a></p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-2">
          {step > 0 && <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm border transition-colors hover:bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><ArrowLeft size={14} /> Back</button>}
          <button id="signup-next" type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60">
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>{step === 1 ? t('auth.signup.createAccount') : t('auth.signup.continue')} <ArrowRight size={14} /></>}
          </button>
        </div>
      </form>

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        {t('auth.signup.already')} <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>{t('auth.signup.signIn')}</Link>
      </p>
    </motion.div>
  )
}
