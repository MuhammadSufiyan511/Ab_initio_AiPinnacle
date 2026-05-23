import { useState } from 'react'
import { Download, Share2, X, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionPage, MotionList, MotionItem } from '@/animations/MotionWrapper'

/**
 * CertificatesPage Component:
 * - Lists earned course credentials inside card modules featuring gradient background profiles.
 * - Selecting a certificate launches a premium overlay modal detailing complete credentials info.
 * - Simulates file downloads and public sharing link copying to the clipboard with system alerts.
 */
import { PageHeader } from '@/components/shared/PageHeader'
import { mockCertificates } from '@/data/mockQuizzes'
import { toast } from 'sonner'

interface CertPreviewProps {
  cert: typeof mockCertificates[0]
  onClose: () => void
}

function CertificatePreview({ cert, onClose }: CertPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={onClose} />
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg z-10">
        {/* Certificate design */}
        <div className="rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1060 50%, #0a1628 100%)', border: '2px solid rgba(99,102,241,0.4)' }}>
          <div className="absolute top-4 left-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }} />
          <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }} />

          <span className="text-5xl">{cert.badge}</span>
          <p className="text-indigo-300 text-xs tracking-[0.3em] mt-4 mb-2">CERTIFICATE OF COMPLETION</p>
          <div className="w-20 h-px mx-auto mb-4" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }} />
          <p className="text-white/60 text-xs mb-1">This is to certify that</p>
          <p className="text-white text-2xl font-bold mb-1">Alex Johnson</p>
          <p className="text-white/60 text-xs mb-3">has successfully completed</p>
          <p className="text-indigo-300 text-lg font-semibold mb-5">{cert.title}</p>
          <div className="flex justify-between items-end">
            <div className="text-left">
              <p className="text-white/40 text-[10px]">INSTRUCTOR</p>
              <p className="text-white/70 text-xs">{cert.instructor}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px]">ISSUED</p>
              <p className="text-white/70 text-xs">{cert.issueDate}</p>
            </div>
          </div>
          <p className="text-white/30 text-[10px] mt-4">ID: {cert.credentialId}</p>
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={onClose} className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
            <X size={14} className="text-white" />
          </button>
          <button onClick={() => { toast.success('Certificate downloaded!'); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold">
            <Download size={14} /> Download PDF
          </button>
          <button onClick={() => { navigator.clipboard.writeText(`https://abinitio.edu/cert/${cert.credentialId}`); toast.success('Link copied!') }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm hover:bg-white/20 transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default function CertificatesPage() {
  const [selected, setSelected] = useState<typeof mockCertificates[0] | null>(null)

  return (
    <MotionPage className="flex flex-col gap-6">
      <PageHeader title="My Certificates" subtitle={`${mockCertificates.length} certificates earned`} />

      <MotionList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCertificates.map(cert => (
          <MotionItem key={cert.id}>
            <motion.div whileHover={{ y: -4 }} onClick={() => setSelected(cert)}
              className="card p-5 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3"
              style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
              <div className="flex items-start justify-between">
                <span className="text-3xl">{cert.badge}</span>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{cert.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>by {cert.instructor}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{cert.issueDate}</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--color-primary)' }}>{cert.credentialId}</span>
              </div>
            </motion.div>
          </MotionItem>
        ))}
      </MotionList>

      <AnimatePresence>
        {selected && <CertificatePreview cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </MotionPage>
  )
}
