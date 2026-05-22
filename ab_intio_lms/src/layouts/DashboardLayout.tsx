import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal'
import { Toaster } from 'sonner'
import { useUserStore } from '@/store/userStore'
import { useTranslation } from 'react-i18next'

export function DashboardLayout() {
  const { t, i18n } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const { user, fetchProfile } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()
  const isRTL = i18n.dir() === 'rtl' || i18n.language?.toLowerCase().startsWith('ur')
  const sidebarPlacement = isRTL ? 'right' : 'left'
  const mainOffsetClass = collapsed
    ? isRTL
      ? 'md:mr-[68px]'
      : 'md:ml-[68px]'
    : isRTL
      ? 'md:mr-[200px] lg:mr-[260px]'
      : 'md:ml-[200px] lg:ml-[260px]'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    let active = true
    async function checkSession() {
      const ok = await fetchProfile()
      if (active) {
        if (!ok) {
          navigate('/login')
        } else {
          setCheckingAuth(false)
        }
      }
    }
    checkSession()
    return () => {
      active = false
    }
  }, [fetchProfile, navigate])

  const handleToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileMenuOpen(v => !v)
    } else {
      setCollapsed(v => !v)
    }
  }

  if (checkingAuth || !user) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg-base)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="w-10 h-10 border-4 rounded-full"
          style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm font-semibold tracking-wider animate-pulse" style={{ color: 'var(--text-secondary)' }}>
          {t('dashboard.verifyingSession', 'VERIFYING SESSION...')}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(v => !v)}
          placement={sidebarPlacement}
        />
      </div>

      {/* Mobile off-canvas sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 z-50 md:hidden w-[260px] ${isRTL ? 'right-0' : 'left-0'}`}
            >
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileMenuOpen(false)}
                placement={sidebarPlacement}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top navbar */}
      <TopNavbar
        onSearchOpen={() => setSearchOpen(true)}
        sidebarCollapsed={collapsed}
        onToggle={handleToggle}
        sidebarPlacement={sidebarPlacement}
      />

      {/* Main content */}
      <main className={`transition-all duration-300 pt-16 min-h-screen ${mainOffsetClass}`}>
        <div className="px-4 md:px-6 py-6 pb-8 max-w-[1440px] mx-auto">
          <Outlet context={{ sidebarCollapsed: collapsed }} />
        </div>
      </main>

      <GlobalSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toaster position={isRTL ? 'bottom-left' : 'bottom-right'} richColors />
    </div>
  )
}
