import { useState, useEffect } from 'react'
import { Camera, Edit2, Save, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'

/**
 * ProfilePage Component:
 * - Details the current logged-in user profile, credentials, and achievements.
 * - Displays a dynamic showcase card containing name, email, role, and custom biography description.
 * - Summarizes user skill tags, gamification achievements (Streaks, Bookworms), and recently earned certificates.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge, Avatar } from '@/components/shared/Badge'
import { mockCertificates } from '@/data/mockQuizzes'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'

const SKILLS = ['React', 'TypeScript', 'Python', 'Machine Learning', 'UI/UX Design', 'CSS', 'Node.js']
const ACHIEVEMENTS = [
  { icon: '🔥', label: 'Hot Streak', desc: '7-day learning streak' },
  { icon: '📚', label: 'Bookworm', desc: 'Completed 50 lessons' },
  { icon: '⚡', label: 'Speed Learner', desc: 'Finished a course in < 7 days' },
]

export default function ProfilePage() {
  const { user, setUser, updateProfile } = useUserStore()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState('Passionate learner & aspiring full-stack developer. Building the future one line at a time.')

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  const save = () => {
    if (user) {
      setUser({ ...user, name })
      updateProfile({ name })
    }
    setEditing(false)
    toast.success('Profile updated!')
  }

  return (
    <MotionPage className="max-w-3xl mx-auto flex flex-col gap-6">
      <PageHeader title="My Profile"
        actions={editing
          ? <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><X size={12} /> Cancel</button>
              <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-brand text-white text-xs"><Save size={12} /> Save</button>
            </div>
          : <button id="edit-profile" onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><Edit2 size={12} /> Edit Profile</button>
        }
      />

      {/* Profile card */}
      <div className="card p-6 flex flex-col sm:flex-row items-start gap-5">
        <div className="relative flex-shrink-0">
          <Avatar name={user?.name || ''} src={user?.avatar || ''} size="xl" />
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gradient-brand flex items-center justify-center border-2 border-[var(--card-bg)]">
            <Camera size={12} className="text-white" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {editing
            ? <input value={name} onChange={e => setName(e.target.value)} className="text-xl font-bold border-b-2 bg-transparent outline-none pb-1" style={{ borderColor: 'var(--color-primary)', color: 'var(--text-primary)' }} />
            : <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{user?.name || ''}</h2>
          }
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email || ''}</p>
          <Badge variant="default" className="w-fit capitalize">{user?.role || 'student'}</Badge>
          {editing
            ? <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} className="text-sm bg-transparent border rounded-lg p-2 resize-none outline-none mt-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }} />
            : <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{bio}</p>
          }
        </div>
      </div>

      {/* Skills */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map(a => (
            <motion.div key={a.label} whileHover={{ y: -2 }} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center" style={{ background: 'var(--bg-elevated)' }}>
              <span className="text-3xl">{a.icon}</span>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{a.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates preview */}
      <div className="card p-5">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {mockCertificates.map(c => (
            <div key={c.id} className="p-3 rounded-xl border text-center" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-2xl">{c.badge}</span>
              <p className="text-xs font-medium mt-1.5 leading-snug" style={{ color: 'var(--text-primary)' }}>{c.title}</p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{c.issueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
