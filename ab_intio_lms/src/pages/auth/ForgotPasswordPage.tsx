import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { fadeInUp } from '@/animations/variants'
import { useTranslation } from 'react-i18next'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 900)
  }

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.title')}</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('auth.forgot.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="forgot-email" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.login.email')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Mail size={15} /></span>
                  <input id="forgot-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              </div>

              <button id="forgot-submit" type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60">
                {loading
                  ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><span>{t('auth.forgot.submit')}</span><ArrowRight size={15} /></>
                }
              </button>
            </form>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>{t('auth.forgot.back')}</Link>
            </p>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
              <CheckCircle2 size={36} style={{ color: 'var(--color-success)' }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.inbox')}</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                We sent a password reset link to <strong>{email}</strong>. It expires in 15 minutes.
              </p>
            </div>
            <Link to="/login" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
              {t('auth.forgot.back')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
