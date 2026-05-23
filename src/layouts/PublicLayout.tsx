import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { PublicHeader } from './public/PublicHeader'
import { PublicFooter } from './public/PublicFooter'

export function PublicLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg-base)] font-sans" style={{ color: 'var(--text-primary)' }}>
      <ScrollToTop />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="pointer-events-none absolute left-[-8%] top-[-10%] h-[44%] w-[44%] rounded-full opacity-30 blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute right-[-10%] top-[10%] h-[36%] w-[36%] rounded-full opacity-25 blur-[170px]"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.3), transparent 70%)' }}
        />
      </div>

      <PublicHeader />

      <main className="z-10 flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  )
}
