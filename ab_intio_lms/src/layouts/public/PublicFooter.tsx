import { ArrowRight, BookOpen, GraduationCap, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/userStore'

export function PublicFooter() {
  const { t } = useTranslation()
  const { user } = useUserStore()

  return (
    <footer className="z-10 w-full border-t bg-[var(--bg-surface)] px-4 py-10 sm:px-6 md:py-12" style={{ borderColor: 'var(--border-color)' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="gradient-brand flex h-10 w-10 items-center justify-center rounded-full shadow-md">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="text-base font-extrabold">{t('common.appName')}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('public.footerDescription')}
          </p>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} {t('common.appName')}. {t('public.footerTagline')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
            {t('public.footerExploreTitle')}
          </h4>
          <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link to="/" className="transition-colors hover:text-[var(--text-primary)]">{t('public.nav.home')}</Link>
            <Link to="/about" className="transition-colors hover:text-[var(--text-primary)]">{t('public.nav.about')}</Link>
            <Link to="/faqs" className="transition-colors hover:text-[var(--text-primary)]">{t('public.nav.faqs')}</Link>
            <Link to="/mock-test-details" className="transition-colors hover:text-[var(--text-primary)]">{t('public.nav.mockTestDetails')}</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
            {t('public.footerLegalTitle')}
          </h4>
          <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link to="/terms" className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]">
              <ShieldCheck size={14} /> {t('public.footerTerms')}
            </Link>
            <Link to="/privacy-policy" className="flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]">
              <BookOpen size={14} /> {t('public.footerPrivacy')}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <h4 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
            {t('public.footerSupportTitle')}
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('public.footerSupportText')}
          </p>
          <div className="flex flex-col gap-2">
            {user ? (
              <Link
                to="/dashboard"
                className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
              >
                {t('common.dashboard')} <ArrowRight size={13} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-colors hover:bg-[var(--bg-elevated)]"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <Mail size={13} /> {t('common.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
                >
                  {t('common.signUpFree')} <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
