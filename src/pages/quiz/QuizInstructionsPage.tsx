import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FileText, Clock, AlertTriangle, ShieldCheck, ChevronRight, CheckSquare, Square, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'
import { mockQuizzes } from '@/data/mockQuizzes'
import { Badge } from '@/components/shared/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { useTranslation } from 'react-i18next'

export default function QuizInstructionsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const quiz = mockQuizzes.find(q => q.id === id) ?? mockQuizzes[0]
  
  const [declared, setDeclared] = useState(false)
  const isRTL = i18n.dir() === 'rtl' || i18n.language?.toLowerCase().startsWith('ur')

  const getCommissionName = (cat: string) => {
    return t(`dashboard.quiz.instructions.commissionNames.${cat}`, t('dashboard.quiz.instructions.commissionNames.default', 'Public Service Commission'))
  }

  return (
    <MotionPage className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Back to Test list */}
      <Link to="/test-preparations" className={`flex items-center gap-1.5 text-xs font-semibold hover:underline ${isRTL ? 'flex-row-reverse self-start' : ''}`} style={{ color: 'var(--text-muted)' }}>
        <ArrowLeft size={14} /> {t('dashboard.quiz.instructions.backToPreparations')}
      </Link>

      <PageHeader 
        title={`${quiz.category} ${t('dashboard.quiz.instructions.portalSuffix')}`} 
        subtitle={getCommissionName(quiz.category)} 
      />

      {/* Main card */}
      <div className="card p-6 lg:p-8 flex flex-col gap-6" style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))' }}>
        
        {/* Banner header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>{t('dashboard.quiz.instructions.officialGuidelines')}</span>
            <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{quiz.title}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.instructions.subjectPrefix')} {quiz.course}</p>
          </div>
          <Badge variant={
            quiz.category === 'FPSC' ? 'success' :
            quiz.category === 'PPSC' ? 'info' :
            quiz.category === 'SPSC' ? 'warning' : 'error'
          } size="md">
            {quiz.category} {t('dashboard.quiz.instructions.officialBadge')}
          </Badge>
        </div>

        {/* Compact Info Strip */}
        <div className="grid grid-cols-3 bg-[var(--bg-surface)] rounded-2xl border divide-x" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3 sm:p-4">
            <FileText size={18} className="text-indigo-500 mb-1" />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.instructions.info.questions')}</p>
            <p className="text-xs sm:text-sm font-black" style={{ color: 'var(--text-primary)' }}>{quiz.questions.length}</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3 sm:p-4">
            <Clock size={18} className="text-emerald-500 mb-1" />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.instructions.info.duration')}</p>
            <p className="text-xs sm:text-sm font-black" style={{ color: 'var(--text-primary)' }}>{Math.floor(quiz.duration / 60)} Min</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3 sm:p-4">
            <ShieldCheck size={18} className="text-amber-500 mb-1" />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{t('dashboard.quiz.instructions.info.passing')}</p>
            <p className="text-xs sm:text-sm font-black" style={{ color: 'var(--text-primary)' }}>{quiz.passingScore}%</p>
          </div>
        </div>

        {/* Rules & Warnings */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <AlertTriangle size={16} className="text-amber-500" /> {t('dashboard.quiz.instructions.rulesTitle')}
          </h3>
          <ul className={`text-xs leading-relaxed flex flex-col gap-2.5 list-disc ${isRTL ? 'pr-4' : 'pl-4'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ color: 'var(--text-secondary)' }}>
            <li><strong>{t('dashboard.quiz.instructions.rules.strictProctoringTitle')}:</strong> {t('dashboard.quiz.instructions.rules.strictProctoring')}</li>
            <li><strong>{t('dashboard.quiz.instructions.rules.timerPolicyTitle')}:</strong> {t('dashboard.quiz.instructions.rules.timerPolicy')}</li>
            <li><strong>{t('dashboard.quiz.instructions.rules.negativeMarkingTitle')}:</strong> {t('dashboard.quiz.instructions.rules.negativeMarking')}</li>
            <li><strong>{t('dashboard.quiz.instructions.rules.attemptsCounterTitle')}:</strong> {t('dashboard.quiz.instructions.rules.attemptsCounter', { attempts: quiz.attemptsAllowed })}</li>
            <li><strong>{t('dashboard.quiz.instructions.rules.calculatorsTitle')}:</strong> {t('dashboard.quiz.instructions.rules.calculators')}</li>
          </ul>
        </div>

        {/* Declaration Box */}
        <div className="p-3 sm:p-4 rounded-2xl border flex items-start gap-3 cursor-pointer select-none transition-all hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: declared ? 'var(--color-primary)' : 'var(--border-color)', background: 'var(--bg-surface)' }}
          onClick={() => setDeclared(!declared)}
        >
          <div className="mt-0.5 shrink-0" style={{ color: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}>
            {declared ? <CheckSquare size={18} /> : <Square size={18} />}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('dashboard.quiz.instructions.declarationTitle')}</p>
            <p className="text-[11px] mt-1 leading-normal" style={{ color: 'var(--text-muted)' }}>
              {t('dashboard.quiz.instructions.declarationBody')}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t flex sm:justify-end" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            disabled={!declared}
            onClick={() => navigate(`/test-preparations/${quiz.id}/take`)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          style={{ background: declared ? 'var(--color-primary)' : 'var(--text-muted)' }}
        >
            <span>{t('dashboard.quiz.instructions.confirmStart')}</span> <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </MotionPage>
  )
}
