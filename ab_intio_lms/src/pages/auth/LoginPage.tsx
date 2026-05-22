import * as React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { authService } from '@/services/authService'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error(t('auth.errors.invalidEmail'))
      return
    }

    setLoading(true)
    try {
      const data = await authService.login({ email, password })
      setUser({ ...data.user, role: 'student' })
      toast.success(`${t('auth.login.title')}, ${data.user.name}!`)
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.message || t('auth.errors.server'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
  const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
      <motion.div variants={fadeInUp}>
        <h1 style={{ color: 'var(--text-primary)' }} className="text-3xl font-black mb-1 text-slate-900 dark:text-white">
          {t('auth.login.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          {t('auth.login.subtitle')}
        </p>
      </motion.div>

      <motion.form variants={staggerItem} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.login.email')}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Mail size={15} /></span>
            <input id="login-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" className={` ${inputCls} pl-10`} style={inputStyle} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-password" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.login.password')}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Lock size={15} /></span>
            <input id="login-password" type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" className={`${inputCls} pl-10 pr-10`} style={inputStyle} />
            <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
            <input type="checkbox" className="rounded-md border-slate-300 dark:border-slate-700 bg-transparent text-blue-600 focus:ring-blue-500" />
            {t('auth.login.remember')}
          </label>
          <Link to="/forgot-password" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
            {t('auth.login.forgot')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-14 font-black gradient-brand rounded-2xl shadow-lg shadow-blue-500/20 text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <span>{t('auth.login.submit')}</span>
          <ArrowRight size={18} />
        </button>
      </motion.form>

      <motion.p variants={staggerItem} className="text-center text-sm text-slate-600 dark:text-slate-400">
        {t('auth.login.noAccount')}{' '}
        <Link to="/signup" className="font-black text-blue-600 hover:text-blue-700 transition-colors underline-offset-4 hover:underline">
          {t('auth.login.createFree')}
        </Link>
      </motion.p>
    </motion.div>
  )
}
