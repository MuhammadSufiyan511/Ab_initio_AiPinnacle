import { useState, useEffect, useRef } from 'react'
import { User, Palette, Bell, Shield, Accessibility, Camera, Save } from 'lucide-react'
import { MotionPage } from '@/animations/MotionWrapper'
import { PageHeader } from '@/components/shared/PageHeader'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useThemeStore } from '@/store/themeStore'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

type Section = 'Profile & Account' | 'Appearance' | 'Notifications' | 'Privacy' | 'Accessibility'

const SECTIONS: { key: Section; icon: React.ReactNode }[] = [
  { key: 'Profile & Account', icon: <User size={15} /> },
  // { key: 'Appearance',        icon: <Palette size={15} /> },
  // { key: 'Notifications',     icon: <Bell size={15} /> },
  // { key: 'Privacy',           icon: <Shield size={15} /> },
  // { key: 'Accessibility',     icon: <Accessibility size={15} /> },
]

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="relative flex-shrink-0 rounded-full transition-colors duration-300"
      style={{ width: 38, height: 22, background: enabled ? 'var(--color-primary)' : 'var(--border-color)' }}>
      <span className="absolute top-0.5 bg-white rounded-full shadow transition-transform duration-300"
        style={{ left: 2, width: 17, height: 17, transform: enabled ? 'translateX(17px)' : 'translateX(0)' }} />
    </button>
  )
}

function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>}
      </div>
      {children}
    </div>
  )
}

/**
 * SettingsPage handles global user settings including Profile Management, 
 * Theme Toggles, Notifications controls, Privacy settings, and Accessibility features.
 * Features an interactive profile image upload (Base64 conversion and Zustand sync).
 */
export default function SettingsPage() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const { user, updateProfile } = useUserStore()

  // Local state for profile inputs
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [bio, setBio] = useState(user?.bio || t('dashboard.settings.defaultBio'))

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      if (user.bio) setBio(user.bio)
    }
  }, [user])

  // Options states
  const [notifs, setNotifs] = useState({ Assignments: true, Messages: true, Grades: true, System: false })
  const [privacy, setPrivacy] = useState({ publicProfile: true, showActivity: false })
  const [a11y, setA11y] = useState({ highContrast: false, reducedMotion: false, largeText: false })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Interactive profile image uploader converting file to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024) {
        toast.error(t('dashboard.settings.errors.avatarTooLarge'))
        return
      }
      const reader = new FileReader()
      reader.onloadend = async () => {
        const success = await updateProfile({ name, email, bio, avatar: reader.result as string })
        if (success) {
          toast.success(t('dashboard.settings.success.avatarUpdated'))
        } else {
          toast.error(t('dashboard.settings.errors.avatarUpdateFailed'))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = async () => {
    const success = await updateProfile({ name, email, bio, avatar: user?.avatar })
    if (success) {
      toast.success(t('dashboard.settings.success.settingsUpdated'))
    } else {
      toast.error(t('dashboard.settings.errors.settingsUpdateFailed'))
    }
  }

  return (
    <MotionPage className="flex flex-col gap-6 max-w-full">
      <PageHeader title={t('dashboard.settings.title')} subtitle={t('dashboard.settings.subtitle')} />

      <div className="flex flex-col gap-8 items-start w-full">
        {/* Dynamic Panel Content */}
        <div className="w-full card p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{t('dashboard.settings.profileTitle')}</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('dashboard.settings.profileSubtitle')}</p>
              </div>

              {/* Avatar Uploader Block */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
	                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
	                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)' }}>
	                    {user?.avatar ? (
	                      <img src={user.avatar} alt={t('dashboard.settings.alt.avatar')} className="w-full h-full object-cover" />
	                    ) : (
                      <span className="text-3xl font-black" style={{ color: 'var(--text-muted)' }}>
                        {(name || 'S').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={20} />
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>
	                <div className="text-center sm:text-left">
	                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t('dashboard.settings.profilePicture')}</h4>
	                  <p className="text-xs mt-1 mb-3" style={{ color: 'var(--text-muted)' }}>{t('dashboard.settings.profilePictureHint')}</p>
	                  <button onClick={() => fileInputRef.current?.click()} className="px-3.5 py-1.5 rounded-lg border text-xs font-semibold hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
	                    {t('dashboard.settings.choosePhoto')}
	                  </button>
	                </div>
	              </div>

              {/* Field Rows */}
              <div className="flex flex-col gap-4">
                <Row label={t('dashboard.settings.fullName')} desc={t('dashboard.settings.fullNameDesc')}>
                  <input value={name} onChange={e => setName(e.target.value)} className="px-3 py-2 rounded-lg border text-sm outline-none w-full sm:w-80"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                </Row>
                <Row label={t('dashboard.settings.email')} desc={t('dashboard.settings.emailDesc')}>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="px-3 py-2 rounded-lg border text-sm outline-none w-full sm:w-80"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                </Row>
                <Row label={t('dashboard.settings.bio')} desc={t('dashboard.settings.bioDesc')}>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="px-3 py-2 rounded-lg border text-sm outline-none w-full sm:w-80 resize-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                </Row>
              </div>

              <div className="pt-4">
                <button onClick={handleSaveChanges} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <Save size={16} /> {t('dashboard.settings.saveChanges')}
                </button>
              </div>
            </div>

          {/* 
          {active === 'Appearance' && (
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Appearance & Theme</h3>
              <Row label="Dark/Light Mode Toggle" desc={`Manage default interface palette (Currently ${theme} mode`}>
                <ThemeToggle />
              </Row>
              <Row label="Custom Accent Theme" desc="Choose a custom highlight color for your sidebar and actions">
                <div className="flex gap-2.5">
                  {['#6366f1','#10b981','#8b5cf6','#f59e0b','#ef4444'].map(c => (
                    <button key={c} className="w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform"
                      style={{ background: c, borderColor: c === '#6366f1' ? '#fff' : 'transparent' }} />
                  ))}
                </div>
              </Row>
            </div>
          )}

          {active === 'Notifications' && (
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Notifications Preferences</h3>
              {(Object.keys(notifs) as (keyof typeof notifs)[]).map(k => (
                <Row key={k} label={`${k} Notifications`} desc={`Receive alerts when new ${k.toLowerCase()} events trigger`}>
                  <Toggle enabled={notifs[k]} onChange={() => setNotifs(n => ({ ...n, [k]: !n[k] }))} />
                </Row>
              ))}
            </div>
          )}

          {active === 'Privacy' && (
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Privacy & Safety</h3>
              <Row label="Public Profile Visibility" desc="Allow peers to discover your profile achievements">
                <Toggle enabled={privacy.publicProfile} onChange={() => setPrivacy(p => ({ ...p, publicProfile: !p.publicProfile }))} />
              </Row>
              <Row label="Display Real-Time Activities" desc="Show currently playing lessons or tests to friends">
                <Toggle enabled={privacy.showActivity} onChange={() => setPrivacy(p => ({ ...p, showActivity: !p.showActivity }))} />
              </Row>
            </div>
          )}

          {active === 'Accessibility' && (
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Accessibility Settings</h3>
              {(Object.keys(a11y) as (keyof typeof a11y)[]).map(k => {
                const labels = { highContrast: ['High Contrast Theme', 'Enhanced color ratio specifications'], reducedMotion: ['Reduced Motion Mode', 'Minimize page-slide and transition animations'], largeText: ['Large Fonts', 'Scale base dashboard typography up by 20%'] }
                return (
                  <Row key={k} label={labels[k][0]} desc={labels[k][1]}>
                    <Toggle enabled={a11y[k]} onChange={() => setA11y(a => ({ ...a, [k]: !a[k] }))} />
                  </Row>
                )
              })}
            </div>
          )}
          */}
        </div>
      </div>
    </MotionPage>
  )
}
