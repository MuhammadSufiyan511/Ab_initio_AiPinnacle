import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { fadeInUp } from '@/animations/variants'
import { useTranslation } from 'react-i18next'
import { authService } from '@/services/authService'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [step, setStep] = useState<'email' | 'otp' | 'password' | 'success'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      await authService.requestPasswordReset(email)
      toast.success('OTP has been sent to your email.')
      setStep('otp')
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }
    setStep('password')
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be 8+ characters with uppercase, lowercase, and a number')
      return
    }
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      await authService.resetPasswordWithOtp({ email, otp, newPassword })
      toast.success('Password reset successful!')
      setStep('success')
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {step === 'email' && (
          <motion.div key="email" variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.title')}</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('auth.forgot.subtitle')}</p>
            </div>

            <form onSubmit={handleRequestOtp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="forgot-email" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.login.email')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Mail size={15} /></span>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <button
                id="forgot-submit"
                type="submit"
                disabled={loading || !email}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><span>{t('auth.forgot.submit')}</span><ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>{t('auth.forgot.back')}</Link>
            </p>
          </motion.div>
        )}

        {step === 'otp' && (
          <motion.div key="otp" variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.otpTitle')}</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {t('auth.forgot.otpSent')} <strong>{email}</strong>. It expires in 10 minutes.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.otpLabel')}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none tracking-[6px] text-center font-mono"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>

            <button onClick={() => setStep('email')} className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
              {t('auth.forgot.differentEmail')}
            </button>
          </motion.div>
        )}

        {step === 'password' && (
          <motion.div key="password" variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Set New Password</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Enter your new password for <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.newPassword')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Lock size={15} /></span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.confirmPassword')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}><Lock size={15} /></span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t('auth.forgot.resetButton')
                )}
              </button>
            </form>

            <button onClick={() => setStep('otp')} className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
              Back to OTP
            </button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
              <CheckCircle2 size={36} style={{ color: 'var(--color-success)' }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('auth.forgot.successTitle')}</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {t('auth.forgot.successMessage')}
              </p>
            </div>
            <Link
              to="/login"
              className="gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Go to Sign In <ArrowRight size={15} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
