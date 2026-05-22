import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useUserStore } from '@/store/userStore'
export function PublicHeader() {
  const { t } = useTranslation()
  const { user } = useUserStore()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navLinks = [
    { name: t('public.nav.home'), path: '/' },
    { name: t('public.nav.about'), path: '/about' },
    { name: t('public.nav.faqs'), path: '/faqs' },
    { name: t('public.nav.mockTestDetails'), path: '/mock-test-details' },
  ]
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  return (
    <>
      <header className="sticky top-3 z-40 px-2 sm:top-4 sm:px-4 md:px-6">
        <div className="mx-auto max-w-7xl rounded-full border bg-[var(--bg-surface)]/90 shadow-[0_14px_50px_rgba(15,35,74,0.12)] backdrop-blur-2xl" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex h-16 items-center justify-between gap-2 px-3 sm:h-18 sm:gap-4 sm:px-6">
            <Link to="/" className="flex min-w-0 shrink items-center gap-2 transition-opacity hover:opacity-90 sm:gap-3">
              <div className="gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md sm:h-11 sm:w-11">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="inline truncate text-sm font-extrabold tracking-tight sm:text-xl">{t('common.appName')}</span>
            </Link>
            <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex xl:gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold transition-all"
                  style={{
                    color: isActive(link.path) ? 'var(--color-primary)' : 'var(--text-secondary)',
                    background: isActive(link.path) ? 'rgba(59,130,246,0.08)' : 'transparent',
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activePublicTab"
                      className="pointer-events-none absolute inset-0 rounded-full border border-[rgba(59,130,246,0.18)]"
                    />
                  )}
                </Link>
              ))}
            </nav>
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <LanguageToggle />
              <ThemeToggle />
              {user ? (
                <Link
                  to="/dashboard"
                  className="gradient-brand inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
                >
                  {t('common.dashboard')} <ArrowRight size={13} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border px-4 py-2 text-xs font-bold transition-colors hover:bg-[var(--bg-elevated)]"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                  >
                    {t('common.signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    className="gradient-brand rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-md"
                  >
                    {t('common.signUpFree')}
                  </Link>
                </>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="shrink-0 rounded-full border bg-[var(--bg-elevated)] p-2"
                style={{ borderColor: 'var(--border-color)' }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-80 max-w-[90vw] flex-col gap-5 border-l bg-[var(--bg-surface)] p-5 shadow-2xl lg:hidden sm:p-6"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <div className="gradient-brand flex h-8 w-8 items-center justify-center rounded-lg">
                    <GraduationCap size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-extrabold">{t('common.appName')}</span>
                    <span className="block text-[10px] leading-4" style={{ color: 'var(--text-muted)' }}>
                      Learning Portal
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border bg-[var(--bg-elevated)] p-2"
                  style={{ borderColor: 'var(--border-color)' }}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold"
                    style={{
                      color: isActive(link.path) ? 'var(--color-primary)' : 'var(--text-secondary)',
                      background: isActive(link.path) ? 'var(--bg-elevated)' : 'transparent',
                    }}
                  >
                    <span>{link.name}</span>
                    {isActive(link.path) && <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center justify-between rounded-xl border p-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {t('common.language')}
                </span>
                <LanguageToggle />
              </div>
              <div className="mt-auto flex flex-col gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="gradient-brand inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-3.5 text-xs font-bold text-white shadow-md"
                  >
                    {t('public.nav.goToDashboard')} <ArrowRight size={13} />
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-xl border py-3 text-center text-xs font-bold hover:bg-[var(--bg-elevated)]"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      {t('common.signIn')}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="gradient-brand w-full rounded-xl py-3.5 text-center text-xs font-bold text-white shadow-md"
                    >
                      {t('common.signUpFree')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
