import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal'
import { AIAssistantWidget } from '@/components/ai/AIAssistantWidget'
import { Toaster } from 'sonner'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      </div>

      {/* Top Navbar */}
      <TopNavbar onSearchOpen={() => setSearchOpen(true)} sidebarCollapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />

      {/* Main content */}
      <main
        className="transition-all duration-300 pt-16"
        style={{
          marginLeft: typeof window !== 'undefined' && window.innerWidth < 768
            ? 0
            : collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          minHeight: '100vh',
        }}
      >
        <div className="px-4 md:px-6 py-6 pb-24 md:pb-8 max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav />

      {/* Global overlays */}
      <GlobalSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* <AIAssistantWidget /> */}
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
