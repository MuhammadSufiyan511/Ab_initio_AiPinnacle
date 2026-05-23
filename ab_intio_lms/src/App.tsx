import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/store/themeStore'
import { router } from '@/routes'
import i18n from '@/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1, refetchOnWindowFocus: false },
  },
})

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  const { t } = useTranslation()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    document.title = t('common.appName')
  }, [theme, t])

  useEffect(() => {
    const applyDirection = (lng: string) => {
      const isUrdu = lng?.toLowerCase().startsWith('ur')
      document.documentElement.lang = isUrdu ? 'ur' : 'en'
      document.documentElement.dir = isUrdu ? 'rtl' : 'ltr'
      document.body.dir = isUrdu ? 'rtl' : 'ltr'
    }

    applyDirection(i18n.language)
    i18n.on('languageChanged', applyDirection)
    return () => {
      i18n.off('languageChanged', applyDirection)
    }
  }, [])

  return <>{children}</>
}

export default function App() {
  const { t } = useTranslation()
  const [languageKey, setLanguageKey] = useState(i18n.language)
  const [isLanguageChanging, setIsLanguageChanging] = useState(false)

  useEffect(() => {
    let languageChangeTimeout: number | undefined

    const applyDirection = (lng: string) => {
      const isUrdu = lng?.toLowerCase().startsWith('ur')
      document.documentElement.lang = isUrdu ? 'ur' : 'en'
      document.documentElement.dir = isUrdu ? 'rtl' : 'ltr'
      document.body.dir = isUrdu ? 'rtl' : 'ltr'
    }

    const handleLanguageChange = (lng: string) => {
      setLanguageKey(lng)
      if (languageChangeTimeout) window.clearTimeout(languageChangeTimeout)
      languageChangeTimeout = window.setTimeout(() => setIsLanguageChanging(false), 2000)
    }

    const handleLanguageChangeStart = (event: Event) => {
      const nextLanguage = (event as CustomEvent<{ nextLanguage?: string }>).detail?.nextLanguage
      if (nextLanguage) {
        applyDirection(nextLanguage)
      }
      setIsLanguageChanging(true)
      if (languageChangeTimeout) window.clearTimeout(languageChangeTimeout)
      languageChangeTimeout = window.setTimeout(() => setIsLanguageChanging(false), 2000)
    }

    const handleLanguageChangeEnd = () => {
      setIsLanguageChanging(false)
    }

    i18n.on('languageChanged', handleLanguageChange)
    window.addEventListener('app:language-change-start', handleLanguageChangeStart as EventListener)
    window.addEventListener('app:language-change-end', handleLanguageChangeEnd as EventListener)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
      window.removeEventListener('app:language-change-start', handleLanguageChangeStart as EventListener)
      window.removeEventListener('app:language-change-end', handleLanguageChangeEnd as EventListener)
      if (languageChangeTimeout) window.clearTimeout(languageChangeTimeout)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeApplier>
        <div key={languageKey} className="relative">
          <RouterProvider router={router} />
          {isLanguageChanging && (
            <div className="fixed inset-3 z-[9999] rounded-[1.75rem] border bg-[var(--bg-overlay)] backdrop-blur-md flex items-center justify-center shadow-2xl" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex flex-col items-center gap-4 px-8 py-7 text-center">
                <div
                  className="h-11 w-11 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}
                />
                <div className="space-y-1">
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {t('common.languageSwitching.title')}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t('common.languageSwitching.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ThemeApplier>
    </QueryClientProvider>
  )
}
