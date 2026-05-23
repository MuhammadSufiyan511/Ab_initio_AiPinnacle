import { ArrowLeft } from 'lucide-react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MotionPage } from '@/animations/MotionWrapper'
import FPSCStartScreen from './components/FPSCStartScreen'
import FPSCActiveExamScreen from './components/FPSCActiveExamScreen'
import FPSCResultsScreen from './components/FPSCResultsScreen'
import { useFPSCExamPage } from './hooks/useFPSCExamPage'
import fpscLogo from '@/assets/fpsc.webp'
import ppscLogo from '@/assets/ppsc.webp'
import spscLogo from '@/assets/spsc.webp'
import bpscLogo from '@/assets/bpsc.webp'
import kppscLogo from '@/assets/kppsc.webp'

const logoMap: Record<string, string> = {
  fpsc: fpscLogo,
  ppsc: ppscLogo,
  spsc: spscLogo,
  bpsc: bpscLogo,
  kppsc: kppscLogo,
}

export default function FPSCExamPage() {
  const { testId } = useParams()
  const { t } = useTranslation()
  const { sidebarCollapsed } = useOutletContext<{ sidebarCollapsed: boolean }>() || { sidebarCollapsed: false }
  const examDbId = testId ?? 'fpsc-system-analyst'
  const {
    loading,
    activeTest,
    hasStarted,
    isFinished,
    examLogo,
    questions,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    timeLeft,
    sectionScores,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    handleLaunchExam,
    handleOptionClick,
    handleSkip,
    advanceToNext,
    handleSubmitExam,
    handleResetExam,
    handleStartNewTest,
  } = useFPSCExamPage({ examDbId })

  if (loading || !activeTest || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] font-sans" style={{ color: 'var(--text-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--color-primary)' }} />
          <p className="text-sm font-semibold tracking-wide">{t('dashboard.quiz.toasts.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full justify-center bg-[var(--bg-base)] p-3 font-sans sm:p-4 md:p-8">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        {(!hasStarted || isFinished) && (
          <Link to="/test-preparations" className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={14} /> {t('dashboard.quiz.active.backToPreparations')}
          </Link>
        )}

        {!hasStarted && !isFinished && (
          <div className="mb-4 border-b pb-6 text-center" style={{ borderColor: 'var(--border-color)' }}>
            {examLogo && logoMap[examLogo] ? (
              <img src={logoMap[examLogo]} alt={`${examLogo.toUpperCase()} Logo`} className="mx-auto mb-3 h-14 w-14 rounded-xl object-contain drop-shadow-sm sm:h-16 sm:w-16" />
            ) : (
              <div className="gradient-brand mb-3 mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">AB</div>
            )}
            <h1 className="mb-1 px-2 text-xl font-black sm:text-2xl md:text-3xl" style={{ color: 'var(--text-primary)' }}>{activeTest.title}</h1>
            <h2 className="mb-1 px-2 text-base font-bold text-blue-500 sm:text-lg md:text-xl">{activeTest.category} {activeTest.course}</h2>
            {activeTest.caseNo && <p className="text-[10px] font-medium sm:text-xs" style={{ color: 'var(--text-muted)' }}>{activeTest.caseNo} • {t('dashboard.quiz.toasts.officialFormat')}</p>}
          </div>
        )}

        {!hasStarted && !isFinished ? (
          <MotionPage>
            <FPSCStartScreen activeTest={activeTest} totalQuestions={totalQuestions} sidebarCollapsed={sidebarCollapsed} onLaunch={handleLaunchExam} />
          </MotionPage>
        ) : isFinished ? (
          <MotionPage>
            <FPSCResultsScreen
              activeTest={activeTest}
              totalQuestions={totalQuestions}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              skippedAnswers={skippedAnswers}
              sectionScores={sectionScores}
              timeLeft={timeLeft}
              onRetake={handleStartNewTest}
            />
          </MotionPage>
        ) : (
          <FPSCActiveExamScreen
            activeTest={activeTest}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            timeLeft={timeLeft}
            sectionScores={sectionScores}
            totalQuestions={totalQuestions}
            examLogo={examLogo && logoMap[examLogo] ? logoMap[examLogo] : null}
            sidebarCollapsed={sidebarCollapsed}
            onOptionClick={handleOptionClick}
            onSkip={handleSkip}
            onAdvance={advanceToNext}
            onEndExam={handleSubmitExam}
            onResetExam={handleResetExam}
          />
        )}
      </div>
    </div>
  )
}
