import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
type SupportedLanguage = 'en' | 'ur'
type Namespace = 'common' | 'public' | 'auth' | 'dashboard'

const namespaceLoaders: Record<SupportedLanguage, Record<Namespace, () => Promise<{ default: Record<string, unknown> }>>> = {
  en: {
    common: () => import('@/locales/en/common'),
    public: () => import('@/locales/en/public'),
    auth: () => import('@/locales/en/auth'),
    dashboard: () => import('@/locales/en/dashboard'),
  },
  ur: {
    common: () => import('@/locales/ur/common'),
    public: () => import('@/locales/ur/public'),
    auth: () => import('@/locales/ur/auth'),
    dashboard: () => import('@/locales/ur/dashboard'),
  },
}

const loadedNamespaces: Record<SupportedLanguage, Set<Namespace>> = {
  en: new Set<Namespace>(),
  ur: new Set<Namespace>(),
}

function normalizeLanguage(input: string | null | undefined): SupportedLanguage {
  return input?.toLowerCase().startsWith('ur') ? 'ur' : 'en'
}

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('i18nextLng')
  if (saved) return normalizeLanguage(saved)
  return normalizeLanguage(window.navigator.language)
}

export async function ensureLanguageResources(language: string): Promise<void> {
  const lng = normalizeLanguage(language)
  const loaders = namespaceLoaders[lng]
  const nsList: Namespace[] = ['common', 'public', 'auth', 'dashboard']

  for (const ns of nsList) {
    if (loadedNamespaces[lng].has(ns)) continue
    const module = await loaders[ns]()
    i18n.addResourceBundle(lng, 'translation', { [ns]: module.default }, true, true)
    loadedNamespaces[lng].add(ns)
  }
}

export async function initI18n(): Promise<void> {
  const initialLanguage = detectInitialLanguage()

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {},
      lng: initialLanguage,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ur'],
      interpolation: { escapeValue: true },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
      },
    })

  await ensureLanguageResources(initialLanguage)
  await i18n.changeLanguage(initialLanguage)
}

export default i18n
